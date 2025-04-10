"use client";

import { PillsTracker } from "@/components/pillsTracker";
import { SicknessDetails } from "@/components/sicknessDetails";
import { WorkoutPlan } from "@/components/workoutPlan";
import { NutrientsIntake } from "@/components/nutrientsIntake";

const Dashboard = () => {
  return (
    <div className="space-y-6 ml-10 w-full mx-10 my-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Health Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-2 lg:col-span-2">
          <PillsTracker />
        </div>
        <div className="col-span-2 lg:col-span-2">
          <SicknessDetails />
        </div>
        <div className="col-span-2 lg:col-span-2">
          <WorkoutPlan />
        </div>
        <div className="col-span-2 lg:col-span-2">
          <NutrientsIntake />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
