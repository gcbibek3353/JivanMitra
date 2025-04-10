import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function NutrientsIntake() {
  // Sample data - in a real app, this would come from an API or state
  const nutrientsData = [
    { id: 1, name: "Protein", consumed: 60, target: 80, unit: "g" },
    { id: 2, name: "Carbs", consumed: 180, target: 250, unit: "g" },
    { id: 3, name: "Fats", consumed: 45, target: 65, unit: "g" },
    { id: 4, name: "Fiber", consumed: 18, target: 25, unit: "g" },
    { id: 5, name: "Vitamin C", consumed: 65, target: 90, unit: "mg" },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Nutrients Intake</CardTitle>
        <CardDescription>Daily nutrition tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nutrientsData.map((nutrient) => {
            const percentage = (nutrient.consumed / nutrient.target) * 100;
            return (
              <div key={nutrient.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{nutrient.name}</span>
                  <span>
                    {nutrient.consumed}/{nutrient.target} {nutrient.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress
                    value={percentage}
                    className="h-2"
                    // Different colors for different nutrients
                    indicatorClassName={
                      nutrient.name === "Protein"
                        ? "bg-rose-500"
                        : nutrient.name === "Carbs"
                        ? "bg-amber-500"
                        : nutrient.name === "Fats"
                        ? "bg-sky-500"
                        : nutrient.name === "Fiber"
                        ? "bg-emerald-500"
                        : "bg-violet-500"
                    }
                  />
                  <span className="text-xs font-medium">
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
