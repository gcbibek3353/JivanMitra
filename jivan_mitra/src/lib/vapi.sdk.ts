import Vapi from '@vapi-ai/web'

export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);

// const context = `
// You are a health assistant. Here's the user data:
// - Age: ${user.age}
// - Gender: ${user.gender}
// - Height: ${user.height} cm
// - Weight: ${user.weight} kg
// - Health condition: ${user.sickness}
// - Medications: ${user.medications.map(
//   (med) => `${med.name} (${med.dosage}) at ${med.times.join(", ")}`
// ).join("; ")}

// Answer questions considering the user's health context. If a question is out of scope, tell them to consult a doctor.
// `;

export const interviewer: any = {
    name: "Interviewer",
    firstMessage:
        "Hi there, I'm here to support you with any questions you have about your health or treatment — feel free to ask me anything, and I'll do my best to help.",
    transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en",
    },
    voice: {
        provider: "11labs",
        voiceId: "sarah",
        stability: 0.4,
        similarityBoost: 0.8,
        speed: 0.9,
        style: 0.5,
        useSpeakerBoost: true,
    },
    model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content: `You are a helpful, friendly, and knowledgeable health assistant. Use the following user information to guide your answers. Always prioritize safety and gently remind the user to consult a medical professional for serious concerns.

User Profile:
- Age: {{params.age}}
- Gender: {{ params.gender}}
- Height: {{ params.height}}
- Weight: {{ params.weight}}
- Known Condition: {{sickness}}
- Current Medication:
  - {{ medicationName }}: {{ dosage }} dose per day at {{ times }}

Guidelines:
- Provide answers tailored to the user's condition and medications.
- Avoid giving definitive diagnoses.
- Mention medication times if the user asks about when to take it.
- Be empathetic and supportive in your tone.
- If a question is out of scope or requires medical expertise, suggest the user speak to a healthcare provider.

Examples of valid answers:
- "You should take your radiotherapy dose around 6:23 PM, as scheduled."
- "With cancer treatment, light exercise can be beneficial, but always consult your doctor first."
- "It's important to maintain a balanced diet. Avoid anything that causes irritation, especially during radiotherapy."

Only provide relevant, safe, and helpful health advice.
`,
            },
        ],
    },
};

