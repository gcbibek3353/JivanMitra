'use client'

import { getNutritions, Nutrition } from "@/actions/nutritions";
import { useEffect, useState } from "react";

const CreateDietPage = () => {
  const [diets, setDiets] = useState<Nutrition[] | null>(null);

  const fetchDiets = async () => {
    // logic to fetch all the generated diets and set the diets state
  }

  useEffect(() => {
    fetchDiets();
  }, [])

  const dietGenerator = async () => {
    // logic to generate a new diet using the AI model 
    // logic to add it to db

    try {
      const res = await getNutritions({
        age: '20',
        height: '120',
        weight: '60',
        gender: 'male',
        summary: `John is a 45-year-old male who stands 5 feet 10 inches tall and weighs 210 pounds, giving him a BMI of 30.1, which classifies him as obese. His blood pressure is elevated at 145/95 mmHg, indicating Stage 1 Hypertension. His resting heart rate is 88 bpm. His fasting blood sugar level is 130 mg/dL, placing him in the prediabetic range
Cholesterol levels are also a concern: total cholesterol is 240 mg/dL (high), LDL is 160 mg/dL (high), and HDL is 35 mg/dL (low). He leads a mostly sedentary lifestyle with little to no exercise, and his diet consists largely of processed foods and saturated fats. John is a smoker and occasionally consumes alcohol. He also has a family history of heart disease and mild asthma.`});
console.log(res);
console.log(`control here`);


    } catch (error) {
      console.log('failed to generate the diet');
      console.error(error);
    }
  }

// const dietGenerator = async () => {
//   try {
//     const res = await fetch("/api/generate-nutrition", {
//       method: "POST",
//       body: JSON.stringify({
//         age: '20',
//         height: '120',
//         weight: '60',
//         gender: 'male',
//         summary: `John is a 45-year-old male who stands 5 feet 10 inches tall and weighs 210 pounds, giving him a BMI of 30.1, which classifies him as obese. His blood pressure is elevated at 145/95 mmHg, indicating Stage 1 Hypertension. His resting heart rate is 88 bpm. His fasting blood sugar level is 130 mg/dL, placing him in the prediabetic range
//         // Cholesterol levels are also a concern: total cholesterol is 240 mg/dL (high), LDL is 160 mg/dL (high), and HDL is 35 mg/dL (low). He leads a mostly sedentary lifestyle with little to no exercise, and his diet consists largely of processed foods and saturated fats. John is a smoker and occasionally consumes alcohol. He also has a family history of heart disease and mild asthma.`
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.error('Failed to generate the diet:', error);
//   }
// };


  return (
    <div>CreateDietPage

      <button onClick={dietGenerator}>Generate a Healthy Diet</button>

      {/* show all the diets plan in a pleasant way */}
    </div>
  )
}

export default CreateDietPage