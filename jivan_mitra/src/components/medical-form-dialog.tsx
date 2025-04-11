"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Clock, Pill, Pencil } from "lucide-react";

type MedicationSchedule = {
  name: string;
  dosage: number;
  times: string[];
};

type SicknessRecord = {
  id: string;
  sickness: string;
  medications: MedicationSchedule[];
};

type MedicationFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (record: SicknessRecord) => void;
  record: SicknessRecord | null;
};

export function MedicationFormDialog({
  open,
  setOpen,
  onSubmit,
  record,
}: MedicationFormDialogProps) {
  const [sickness, setSickness] = useState("");
  const [medications, setMedications] = useState<MedicationSchedule[]>([]);

  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState(1);
  const [newMedTimes, setNewMedTimes] = useState<string[]>([]);
  const [editingMedIndex, setEditingMedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (record) {
      setSickness(record.sickness);
      setMedications([...record.medications]);
    } else {
      resetForm();
    }
  }, [record, open]);

  const resetForm = () => {
    setSickness("");
    setMedications([]);
    resetMedicationForm();
  };

  const resetMedicationForm = () => {
    setNewMedName("");
    setNewMedDosage(1);
    setNewMedTimes([]);
    setEditingMedIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sickness.trim() || medications.length === 0) {
      return;
    }

    const medicalData: SicknessRecord = {
      id: record?.id || "",
      sickness: sickness.trim(),
      medications,
    };

    onSubmit(medicalData);
    resetForm();
  };

  const addMedication = () => {
    if (!newMedName.trim()) return;

    if (editingMedIndex !== null) {
      const updatedMedications = [...medications];
      updatedMedications[editingMedIndex] = {
        name: newMedName.trim(),
        dosage: newMedDosage,
        times: [...newMedTimes],
      };
      setMedications(updatedMedications);
    } else {
      setMedications([
        ...medications,
        {
          name: newMedName.trim(),
          dosage: newMedDosage,
          times: [...newMedTimes],
        },
      ]);
    }

    resetMedicationForm();
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const editMedication = (index: number) => {
    const med = medications[index];
    setNewMedName(med.name);
    setNewMedDosage(med.dosage);
    setNewMedTimes(med.times);
    setEditingMedIndex(index);
  };

  const addTimeToMedication = (medIndex: number, time: string) => {
    if (!time) return;

    const updatedMedications = [...medications];
    const med = updatedMedications[medIndex];

    if (!med.times.includes(time)) {
      med.times.push(time);
      med.times.sort();
      setMedications(updatedMedications);
    }
  };

  const removeTimeFromMedication = (medIndex: number, timeIndex: number) => {
    const updatedMedications = [...medications];
    const med = updatedMedications[medIndex];
    med.times = med.times.filter((_, i) => i !== timeIndex);
    setMedications(updatedMedications);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {record
              ? "Edit Sickness & Medication"
              : "Add New Sickness & Medication"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="sickness">Sickness/Condition</Label>
              <Input
                id="sickness"
                value={sickness}
                onChange={(e) => setSickness(e.target.value)}
                placeholder="Enter sickness or medical condition"
                required
              />
            </div>

            <div className="space-y-4">
              <Label>Medications</Label>

              <div className="border rounded-md p-4 bg-slate-50">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="medName">Medication Name</Label>
                    <Input
                      id="medName"
                      value={newMedName}
                      onChange={(e) => setNewMedName(e.target.value)}
                      placeholder="Enter medication name and strength"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="medDosage">Pills Per Dose</Label>
                      <Input
                        id="medDosage"
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={newMedDosage}
                        onChange={(e) =>
                          setNewMedDosage(Number(e.target.value))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Times to Take</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          type="time"
                          className="w-36"
                          onKeyDown={(e) => {
                            const time = e.currentTarget.value;
                            if (
                              e.key === "Enter" &&
                              time &&
                              !newMedTimes.includes(time)
                            ) {
                              setNewMedTimes((prev) => [...prev, time].sort());
                              e.currentTarget.value = "";
                            }
                          }}
                          onBlur={(e) => {
                            const time = e.target.value;
                            if (time && !newMedTimes.includes(time)) {
                              setNewMedTimes((prev) => [...prev, time].sort());
                              e.target.value = "";
                            }
                          }}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {newMedTimes.map((time, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-slate-100 rounded-full px-3 py-1 text-xs"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {time}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                setNewMedTimes((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              className="h-4 w-4 ml-1 text-destructive"
                            >
                              <X className="h-2 w-2" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={addMedication}
                    className="w-full mt-2"
                  >
                    {editingMedIndex !== null
                      ? "Update Medication"
                      : "Add Medication"}
                  </Button>
                </div>
              </div>

              <div className="space-y-3 mt-4">
                {medications.map((med, medIndex) => (
                  <div
                    key={medIndex}
                    className="border rounded-md p-3 relative"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium flex items-center">
                          <Pill className="h-4 w-4 mr-1" />
                          {med.name}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {med.dosage} {med.dosage === 1 ? "pill" : "pills"} per
                          dose
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => editMedication(medIndex)}
                          className="h-7 w-7"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMedication(medIndex)}
                          className="h-7 w-7 text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label className="text-xs">Reminder Times</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {med.times.map((time, timeIndex) => (
                          <div
                            key={timeIndex}
                            className="flex items-center bg-slate-100 rounded-full px-3 py-1 text-xs"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {time}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeTimeFromMedication(medIndex, timeIndex)
                              }
                              className="h-4 w-4 ml-1 text-destructive"
                            >
                              <X className="h-2 w-2" />
                            </Button>
                          </div>
                        ))}

                        <div className="flex items-center">
                          <Input
                            type="time"
                            className="h-6 w-24 text-xs"
                            onBlur={(e) => {
                              if (e.target.value) {
                                addTimeToMedication(medIndex, e.target.value);
                                e.target.value = "";
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && e.currentTarget.value) {
                                addTimeToMedication(
                                  medIndex,
                                  e.currentTarget.value
                                );
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {medications.length === 0 && (
                  <div className="text-sm text-muted-foreground italic py-2 text-center">
                    No medications added yet. Use the form above to add
                    medications.
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!sickness.trim() || medications.length === 0}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
