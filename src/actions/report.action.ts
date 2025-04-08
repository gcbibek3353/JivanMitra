'use server'

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const reportSchema = z.object({
    causes: z.string(),
    detailedAnalysis: z.string(),
    precautions: z.string(),
    next_step: z.string()
})


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
            You are an AI medical analyst reviewing a transcript of a patient consultation with an AI doctor. Your task is to generate a detailed health report based on the patient's symptoms and the conversation. Be analytical, medically precise, and avoid vague interpretations. Highlight any potential causes, risks, or inconsistencies. Do not be lenient. If any symptoms are concerning or poorly described, clearly state that.

Transcript:
${formattedTranscript}

Please provide a structured health report using the following sections:

- **Causes**: Identify likely causes or underlying conditions based on the symptoms described. Be medically logical and include differential possibilities if applicable.

- **Detailed Analysis**: Provide a clinical breakdown of the patient's condition. Discuss the clarity of symptoms, alignment with medical patterns, any missing information, and potential red flags.

- **Precautions**: Offer clear, medically relevant precautions the patient should take immediately or in the near term. Include lifestyle, behavioral, or environmental precautions if needed.

- **Next Steps**: Outline a set of recommended actions. This might include lab tests, physical exams, specialist referrals, or emergency care—depending on the severity of the condition. Be firm if the situation demands urgency.

Make sure the tone is professional, clear, and based on clinical reasoning.

            ` ,
            system:
                "You are a medical evaluation AI trained to assess patient conversations. Your role is to provide a structured, professional analysis of a patient's reported symptoms and dialogue with a virtual doctor. You must remain neutral, detailed, and focused on identifying risks, gaps, and strengths in the patient's health reporting and understanding. Use clinical reasoning and critical thinking in your evaluation"
        })

        console.log(object);

        // TODO : save this report to the db...
            // const report = addDoc(reportRef, {......})

        return {
            success : true,
            reportId : "randomforNow"
            // reportId : report.id
        }

    } catch (error) {
        console.error('Error creating the report' , error);

        return {
            success: false,
            reportId: ""
        }
    }
}