'use server'

import { google } from "@ai-sdk/google"
import { generateObject } from "ai";
import { z } from "zod"

const exerciseSchema = z.object({
    name: z.string(),
    type: z.string(),
    duration_minutes: z.number(),
    sets: z.number().optional(),
    reps: z.number().optional(),
    notes: z.string().optional(),
});

const workoutDaySchema = z.object({
    day: z.string(),
    focus: z.string(),
    exercises: z.array(exerciseSchema),
});

const workoutPlanSchema = z.object({
    weekly_schedule: z.array(workoutDaySchema),
    daily_duration_minutes: z.number(),
    total_weekly_minutes: z.number(),
    notes: z.string().optional(),
});

export type WorkOut = z.infer<typeof workoutPlanSchema>;

const getWorkoutPlan = async (userInfo: UserInfoParams) => {
    try {
        const googleModel = google('gemini-2.0-flash-001', {
            structuredOutputs: false,
        });

        const { object } = await generateObject({
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

        console.log(object);

        return {
            success: true,
            message: "Workout plan generated successfully",
            workoutId: "" // TODO: Store in DB and return ID
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
