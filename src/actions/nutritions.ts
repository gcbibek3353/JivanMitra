// 'use server'

import { google } from "@/lib/google-ai-config";
import { generateObject } from "ai";
import { z } from "zod"

const foodItemSchema = z.object({
    name: z.string(),
    quantity: z.string(),
    calories: z.number(),
    protein_g: z.number(),
    carbs_g: z.number(),
    fats_g: z.number(),
});

const mealSchema = z.object({
    name: z.string(), // e.g. "Breakfast"
    time: z.string(), // e.g. "08:00 AM"
    calories: z.number(),
    foods: z.array(foodItemSchema),
});

const nutritionPlanSchema = z.object({
    total_calories_per_day: z.number(),

    macronutrients: z.object({
        protein_g: z.number(),
        carbs_g: z.number(),
        fats_g: z.number(),
    }),

    micronutrients: z.object({
        vitamin_a_mcg: z.number(),
        vitamin_c_mg: z.number(),
        calcium_mg: z.number(),
        iron_mg: z.number(),
        magnesium_mg: z.number(),
        potassium_mg: z.number(),
        sodium_mg: z.number(),
        // Add more micronutrients as needed
    }),

    water_intake_liters: z.number(),

    meals: z.array(mealSchema),

    notes: z.string().optional(),
});

export type Nutrition = z.infer<typeof nutritionPlanSchema>;

export const getNutritions = async (userInfo: UserInfoParams) => {
    //  Get height , weight , age , gender , (past interactions with AI_doctor) and request gemini to suggest a perfect Nutrient/diet
    try {
        // console.log(`control inside getNutritions`); 
        const googleModel = google('gemini-2.0-flash-001', {
            structuredOutputs: false,
        });
        const { object } = await generateObject({
            model: googleModel,
            schema: nutritionPlanSchema,
            prompt:
                `
    You are a certified nutritionist. Based on the following user information, create a personalized daily nutrition and diet plan that fits their needs and supports their overall health:
    
    - Age: ${userInfo.age}
    - Height: ${userInfo.height} cm
    - Weight: ${userInfo.weight} kg
    - Gender: ${userInfo.gender}
    - Health Summary: ${userInfo.summary}
    
    Ensure the nutrition plan is well-balanced, health-conscious, and tailored to the individual's background and physical profile. Provide detailed suggestions including total calories, macronutrients, micronutrients, meal breakdowns, food recommendations, water intake, and any relevant notes or advice.
      `
        });
        console.log(object);

        return {
            success: true,
            message: "nutritions generated successfully",
            nutrition : object,
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "failed to get the nutritions",
            nutrition : ""
        }

    }

}