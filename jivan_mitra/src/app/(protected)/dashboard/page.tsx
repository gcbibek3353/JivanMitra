"use client";

import { PillsTracker } from "@/components/pillsTracker";
import SicknessDetails from "@/components/SicknessDetail";

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="space-y-6 px-4 py-5 sm:px-6 md:px-10 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Health Dashboard
        </h1>
        <p className="text-sm text-muted-foreground" aria-label="Current Date">
          {currentDate}
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <PillsTracker />
        </div>
        <div className="col-span-1 md:col-span-2">
          <SicknessDetails />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
