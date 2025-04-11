"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Pill } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFirebase } from "@/firebase/firebaseConfig";

type InfoRecord = {
  id: string;
  sickness: string;
  medications: { name: string }[];
  status?: "Active" | "Managed" | "Recovered";
  daysSince?: number;
};

export default function SicknessDetails() {
  const firebase = useFirebase();
  const [sicknessData, setSicknessData] = useState<InfoRecord[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (!firebase.loggedInUser?.uid) return;
      const data = await firebase.fetchAllInfoRecords(firebase.loggedInUser.uid);
      setSicknessData(data);
      console.log("Fetched Data:", data);
    };

    loadData();
  }, [firebase]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Health Conditions</CardTitle>
        <CardDescription>
          Current health conditions and status
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {sicknessData.map((record, index) => (
            <motion.div
              key={record.id || `record-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-lg border p-4 hover:shadow-md transition bg-white dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6 text-rose-500" />
                  <span className="text-muted-foreground font-medium">Sickness:</span>
                  <span className="font-semibold">{record.sickness}</span>
                </div>

                {record.status && (
                  <Badge
                    variant={record.status === "Active" ? "destructive" : "outline"}
                    className={
                      record.status === "Managed"
                        ? "bg-amber-100 text-amber-600 hover:bg-amber-100 hover:text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                        : record.status === "Recovered"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : ""
                    }
                  >
                    {record.status}
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-2">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <Pill className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium h-6 w-6">Medications:</span>
                </div>
                <div className="font-medium h-6 w-6">
                  {record.medications?.length > 0
                    ? record.medications.map((med) => med.name)
                    : "None"}
                </div>
              </div>
            </motion.div>
          ))}

          {sicknessData.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No health records found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
