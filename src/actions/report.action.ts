'use server'

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const reportSchema = z.object({
    symptoms: z.array(z.string()),
    causes: z.string(),
    precaution: z.string(),
    suggested_Diagnostic_tests: z.string(),
    symptoms_to_monitor: z.array(z.string()),
    medications: z.string(),
    next_step: z.string(),
});

export type Report = z.infer<typeof reportSchema>;

export const createReport = async (params: createReportParams) => {
    const { patientId, consultId, transcript } = params;

    try {
        const formattedTranscript = transcript.map((sentence: { role: string, content: string }) => (
            `- ${sentence.role} : ${sentence.content} \n`
        )).join('');
        const googleModel = google('gemini-2.0-flash-001', {
            structuredOutputs: false,
        })

        const { object } = await generateObject({
            model: googleModel,
            schema: reportSchema,
            prompt: `
            You are an AI medical analyst reviewing a transcript of a patient consultation with an AI doctor. Your task is to generate a structured health report based strictly on the transcript. Be medically analytical, clear, and do not generalize.
            Your response must follow this exact structure and format, matching the data types:
            {
            "symptoms": [/* List of distinct patient-reported symptoms (as strings) */],
            "causes": "/* Concise but medically detailed explanation of likely causes or differential diagnoses based on symptoms */",
            "precaution": "/* Practical, relevant precautions the patient should take immediately (e.g., lifestyle changes, isolation, hydration) */",
            "suggested_Diagnostic_tests": "/* List or description of recommended lab tests, scans, or screenings */",
            "symptoms_to_monitor": [/* List of symptoms to watch for worsening or new onset */],
            "medications": "/* Mention any prescribed or recommended medications, or state 'none recommended' */",
            "next_step": "/* Clear, medically justified action steps: referrals, tests, follow-ups, or urgent care if needed */"
            }
            Use clinical reasoning. Do not omit sections or use vague language. If information is missing or unclear in the transcript, clearly state that and explain the potential implications.

            Transcript:
            ${formattedTranscript}
            ` ,
            system:
                "You are a medical evaluation AI trained to assess patient conversations. Your role is to provide a structured, professional analysis of a patient's reported symptoms and dialogue with a virtual doctor. You must remain neutral, detailed, and focused on identifying risks, gaps, and strengths in the patient's health reporting and understanding. Use clinical reasoning and critical thinking in your evaluation"
        })

        console.log(object);

        // TODO : save this report to the db...
        // const report = addDoc(reportRef, {......})

        return {
            success: true,
            reportId: "randomforNow"
            // reportId : report.id
        }

    } catch (error) {
        console.error('Error creating the report', error);

        return {
            success: false,
            reportId: ""
        }
    }
}