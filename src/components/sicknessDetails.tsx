import { Activity, AlertCircle, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SicknessDetails() {
  const sicknessData = [
    {
      id: 1,
      name: "Migraine",
      symptoms: ["Headache", "Nausea", "Light sensitivity"],
      daysSince: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Hypertension",
      symptoms: ["High blood pressure", "Headache"],
      daysSince: 120,
      status: "Managed",
    },
    {
      id: 3,
      name: "Seasonal Allergies",
      symptoms: ["Sneezing", "Congestion", "Itchy eyes"],
      daysSince: 15,
      status: "Active",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Health Conditions</CardTitle>
        <CardDescription>Current health conditions and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sicknessData.map((sickness) => (
            <div key={sickness.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-500" />
                  <h3 className="font-medium">{sickness.name}</h3>
                </div>
                <Badge
                  variant={
                    sickness.status === "Active" ? "destructive" : "outline"
                  }
                  className={
                    sickness.status === "Active"
                      ? ""
                      : sickness.status === "Managed"
                      ? "bg-amber-100 text-amber-600 hover:bg-amber-100 hover:text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/20 dark:hover:text-amber-400"
                      : ""
                  }
                >
                  {sickness.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Symptoms:</span>
                </div>
                <div>{sickness.symptoms.join(", ")}</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">Days since:</span>
                </div>
                <div>{sickness.daysSince} days</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
