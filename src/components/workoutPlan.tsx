import { Dumbbell, Flame } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function WorkoutPlan() {
  // Sample data - in a real app, this would come from an API or state
  const workoutData = {
    todayPlan: "30 min cardio, 15 min stretching",
    caloriesBurned: 320,
    caloriesGoal: 500,
    status: "In Progress",
    exercises: [
      { id: 1, name: "Running", duration: 30, completed: true },
      { id: 2, name: "Stretching", duration: 15, completed: false },
    ],
  };

  const progressPercentage =
    (workoutData.caloriesBurned / workoutData.caloriesGoal) * 100;

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Workout Plan</CardTitle>
            <CardDescription>Today's exercise routine</CardDescription>
          </div>
          <Badge
            variant={
              workoutData.status === "Completed"
                ? "outline"
                : workoutData.status === "In Progress"
                ? "secondary"
                : "outline"
            }
            className={
              workoutData.status === "Completed"
                ? "bg-green-100 text-green-600 hover:bg-green-100 hover:text-green-600 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                : ""
            }
          >
            {workoutData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-1.5">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <p className="font-medium">{workoutData.todayPlan}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-orange-500" />
            <p>
              {workoutData.caloriesBurned} / {workoutData.caloriesGoal} calories
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5 text-sm">
            <span>Calories Burned</span>
            <span className="font-medium">
              {workoutData.caloriesBurned} / {workoutData.caloriesGoal}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Exercises</h3>
          <div className="space-y-2">
            {workoutData.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      exercise.completed
                        ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-900/20"
                    }`}
                  >
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{exercise.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {exercise.duration} minutes
                    </p>
                  </div>
                </div>
                <Badge
                  variant={exercise.completed ? "outline" : "outline"}
                  className={
                    exercise.completed
                      ? "bg-green-100 text-green-600 hover:bg-green-100 hover:text-green-600 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/20 dark:hover:text-green-400"
                      : ""
                  }
                >
                  {exercise.completed ? "Completed" : "Pending"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
