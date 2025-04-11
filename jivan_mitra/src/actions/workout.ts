// 'use server'

import { google } from "@/lib/googleGeminiConfig"; 
import { generateObject } from "ai";
import { z } from "zod"

const exerciseSchema = z.object({
    name: z.string(),
    type: z.string(),
    duration_minutes: z.number(),
    sets: z.number().nullable().optional(),  // Allow null for cardio/flexibility
    reps: z.union([z.number(), z.string()]).nullable().optional(),  // Allow numbers or strings
    notes: z.string().optional(),
});

const workoutDaySchema = z.object({
    day: z.string(),
    focus: z.string(),
    exercises: z.array(exerciseSchema),
    notes: z.string().optional(),  // Added since some days have notes
});

const workoutPlanSchema = z.object({
    weekly_schedule: z.array(workoutDaySchema),
    daily_duration_minutes: z.number(),
    total_weekly_minutes: z.number(),
    notes: z.string().optional(),
});

export type WorkOut = z.infer<typeof workoutPlanSchema>;

export const getWorkoutPlan = async (userInfo: UserInfoParams) => {
    console.log(userInfo);
    try {
        const googleModel = google('gemini-2.0-flash-001', {
            structuredOutputs: false,
        });
        console.log(`control inside getWorkoutPlan`);
        const geminiRes = await generateObject({
            model: googleModel,
            schema: workoutPlanSchema,
            prompt: `
You are a certified fitness coach. Based on the user's information below, create a personalized 7-day workout plan that promotes overall fitness, considers their health history, and supports safe and effective progress.

User Info:
- Age: ${userInfo.age}
- Height: ${userInfo.height} cm
- Weight: ${userInfo.weight} kg
- Gender: ${userInfo.gender}
- Health Summary: ${userInfo.summary}

Provide a detailed weekly schedule including exercise types, duration, sets/reps (if applicable), and focus areas for each day. Ensure variety, rest where needed, and practical guidance for someone at their level. Respond only with a structured JSON object.
            `
        });

        console.log(geminiRes);
        console.log(geminiRes.object);

        return {
            success: true,
            message: "Workout plan generated successfully",
            workout : geminiRes.object,
        }

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to generate workout plan",
            workoutId: ""
        }
    }
}
