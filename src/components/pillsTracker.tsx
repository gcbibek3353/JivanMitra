"use client";

import { useEffect, useState } from "react";
import { Check, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { format } from "date-fns";
import { useFirebase } from "@/firebase/firebaseConfig";

export function PillsTracker() {
  const [pills, setPills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchPills = async () => {
      const data = await firebase.getOrCreateDailyTracking(
        firebase.loggedInUser?.uid as string
      );
      // console.log("_____", data);
      setPills(data.pills);
      setLoading(false);
    };

    fetchPills();
  }, [firebase.loggedInUser?.uid as string]);

  const handleToggle = async (index: number, current: boolean) => {
    const date = format(new Date(), "yyyy-MM-dd");
    const updatedPills = await firebase.updatePillStatus(
      firebase.loggedInUser?.uid as string,
      date,
      index,
      !current
    );
    if (updatedPills) setPills([...updatedPills]);
  };

  const totalToday = pills.length;
  const taken = pills.filter((pill) => pill.taken).length;
  const remaining = totalToday - taken;
  const progressPercentage = totalToday > 0 ? (taken / totalToday) * 100 : 0;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Pills Tracker</CardTitle>
        <CardDescription>
          {taken} of {totalToday} pills taken today
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading...</p>
        ) : (
          <>
            <div className="mb-4">
              <Progress value={progressPercentage} className="h-2" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Taken
                </span>
                <span className="text-2xl font-bold">{taken}</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Remaining
                </span>
                <span className="text-2xl font-bold">{remaining}</span>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Today's Schedule</h3>
              <div className="space-y-2">
                {pills.map((pill, index) => {
                  const status = pill.taken ? "taken" : "upcoming";
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3 cursor-pointer"
                      onClick={() => handleToggle(index, pill.taken)}
                    >
                      <div className="flex items-center gap-3">
                        {status === "taken" ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20">
                            <Check className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20">
                            <Clock className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium">
                            {pill.medicineName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pill.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={status === "taken" ? "secondary" : "outline"}
                        className={
                          status === "taken"
                            ? "bg-green-100 text-green-600 hover:bg-green-100 hover:text-green-600 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                            : ""
                        }
                      >
                        {status === "taken" ? "Taken" : "Upcoming"}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
