"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Pencil, Clock } from "lucide-react";
import { MedicationFormDialog } from "./medical-form-dialog";
import { useFirebase } from "@/firebase/firebaseConfig";

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

export function MedicationTracker() {
  const [records, setRecords] = useState<SicknessRecord[]>([]);

  const [open, setOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<SicknessRecord | null>(
    null
  );
  const firebase = useFirebase();

  useEffect(() => {
    const loadRecords = async () => {
      const data = await firebase.fetchAllInfoRecords();
      console.log(data);
      setRecords(data);
    };

    loadRecords();
  }, []);

  const handleAddRecord = async (record: Omit<SicknessRecord, "id">) => {
    const newRecord = await firebase.addInfoRecord(record);
    setRecords((prev) => [...prev, newRecord]);
    setOpen(false);
  };

  const handleEditRecord = async (record: SicknessRecord) => {
    await firebase.updateInfoRecord(record);
    setRecords((prev) => prev.map((r) => (r.id === record.id ? record : r)));
    setOpen(false);
    setCurrentRecord(null);
  };

  //   const handleDeleteRecord = async (id: string) => {
  //     await firebase.deleteInfoRecord(id);
  //     setRecords((prev) => prev.filter((r) => r.id !== id));
  //   };

  const openAddDialog = () => {
    setCurrentRecord(null);
    setOpen(true);
  };

  const openEditDialog = (record: SicknessRecord) => {
    setCurrentRecord(record);
    setOpen(true);
  };
  const formatTime = (time: string) => {
    try {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(Number.parseInt(hours, 10));
      date.setMinutes(Number.parseInt(minutes, 10));
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return time;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Sickness & Medication Schedule
        </h2>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Sickness & Medication
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Sickness/Condition</TableHead>
              <TableHead>Medications & Schedule</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium align-top">
                  {record.sickness}
                </TableCell>
                <TableCell>
                  <div className="space-y-4">
                    {record.medications.map((med, idx) => (
                      <div
                        key={idx}
                        className="border-l-4 border-slate-300 pl-4 py-1"
                      >
                        <div className="font-medium">{med.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {med.dosage} {med.dosage === 1 ? "pill" : "pills"} per
                          dose
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {med.times.map((time, timeIdx) => (
                            <div
                              key={timeIdx}
                              className="flex items-center bg-slate-100 rounded-full px-3 py-1 text-xs"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTime(time)}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(record)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {records.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-6 text-muted-foreground"
                >
                  No sickness or medication records added yet. Click "Add
                  Sickness & Medication" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <MedicationFormDialog
        open={open}
        setOpen={setOpen}
        onSubmit={currentRecord ? handleEditRecord : handleAddRecord}
        record={currentRecord}
      />
    </div>
  );
}
