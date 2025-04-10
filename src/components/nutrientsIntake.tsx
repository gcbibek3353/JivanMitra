import { Nutrition } from "@/actions/nutritions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useFirebase } from "@/firebase/firebaseConfig";
import { getRandomNumberUptoGivenNumber } from "@/lib/utils";
import { useEffect, useState } from "react";

  // Sample data - in a real app, this would come from an API or state
  const nutrientsData = [
    { id: 1, name: "Protein", consumed: 60, target: 80, unit: "g" },
    { id: 2, name: "Carbs", consumed: 180, target: 250, unit: "g" },
    { id: 3, name: "Fats", consumed: 45, target: 65, unit: "g" },
    { id: 4, name: "Water Intake", consumed: 18, target: 25, unit: "ltr" },
    { id: 5, name: "total calorie", consumed: 65, target: 90, unit: "g" },
  ];

export function NutrientsIntake() {
  const [actualNutritionsToShow, setActualNutritionsToShow] = useState<any>(nutrientsData);
  const [loading, setLoading] = useState<boolean>(false);
  const { getNutritionsByPatientId, loggedInUser } = useFirebase();

  const fetchNutrients = async () => {
    setLoading(true);
    try {
      if (!loggedInUser) return;
      const res = await getNutritionsByPatientId(loggedInUser?.uid as string);
      const curNutrition = res[0].nutrition;
      setActualNutritionsToShow([
        { id: 1, name: "Protein", consumed: getRandomNumberUptoGivenNumber(curNutrition.macronutrients.protein_g), target: curNutrition.macronutrients.protein_g, unit: "g" },
        { id: 2, name: "Carbs", consumed: getRandomNumberUptoGivenNumber(curNutrition.macronutrients.carbs_g), target: curNutrition.macronutrients.carbs_g, unit: "g" },
        { id: 3, name: "Fats", consumed: getRandomNumberUptoGivenNumber(curNutrition.macronutrients.fats_g), target: curNutrition.macronutrients.fats_g, unit: "g" },
        { id: 4, name: "Water Intake", consumed: getRandomNumberUptoGivenNumber(curNutrition.water_intake_liters), target: curNutrition.water_intake_liters, unit: "ltr" },
        { id: 5, name: "total calorie", consumed: getRandomNumberUptoGivenNumber(curNutrition.total_calories_per_day), target: curNutrition.total_calories_per_day, unit: "g" },
      ])
    } catch (error) {
      console.log('failed to get Nutrients data');
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNutrients();
  }, [loggedInUser])

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Nutrients Intake</CardTitle>
        <CardDescription>Daily nutrition tracking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actualNutritionsToShow.map((nutrient) => {
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

