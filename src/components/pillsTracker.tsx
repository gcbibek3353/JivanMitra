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

export function PillsTracker() {
  // Sample data - in a real app, this would come from an API or state
  const pillsData = {
    totalToday: 6,
    remaining: 2,
    taken: 4,
    schedule: [
      { id: 1, name: "Vitamin C", time: "8:00 AM", status: "taken" },
      { id: 2, name: "Multivitamin", time: "8:00 AM", status: "taken" },
      { id: 3, name: "Omega-3", time: "12:00 PM", status: "taken" },
      { id: 4, name: "Calcium", time: "12:00 PM", status: "taken" },
      { id: 5, name: "Vitamin D", time: "6:00 PM", status: "upcoming" },
      { id: 6, name: "Magnesium", time: "9:00 PM", status: "upcoming" },
    ],
  };

  const progressPercentage = (pillsData.taken / pillsData.totalToday) * 100;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Pills Tracker</CardTitle>
        <CardDescription>
          {pillsData.taken} of {pillsData.totalToday} pills taken today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-3">
            <span className="text-sm font-medium text-muted-foreground">
              Taken
            </span>
            <span className="text-2xl font-bold">{pillsData.taken}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-3">
            <span className="text-sm font-medium text-muted-foreground">
              Remaining
            </span>
            <span className="text-2xl font-bold">{pillsData.remaining}</span>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Today's Schedule</h3>
          <div className="space-y-2">
            {pillsData.schedule.map((pill) => (
              <div
                key={pill.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  {pill.status === "taken" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : pill.status === "missed" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/20">
                      <X className="h-4 w-4" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/20">
                      <Clock className="h-4 w-4" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium">{pill.name}</p>
                    <p className="text-xs text-muted-foreground">{pill.time}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    pill.status === "taken"
                      ? "secondary"
                      : pill.status === "missed"
                      ? "destructive"
                      : "outline"
                  }
                  className={
                    pill.status === "taken"
                      ? "bg-green-100 text-green-600 hover:bg-green-100 hover:text-green-600 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                      : pill.status === "missed"
                      ? "bg-red-100 text-red-600 hover:bg-red-100 hover:text-red-600 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      : ""
                  }
                >
                  {pill.status === "taken"
                    ? "Taken"
                    : pill.status === "missed"
                    ? "Missed"
                    : "Upcoming"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
