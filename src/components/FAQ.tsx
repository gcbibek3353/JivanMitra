import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is JivanMitra and how does it work?",
    answer: "JivanMitra is an AI-powered health assistant that talks with you, understands your health history, and provides personalized symptom analysis, diet plans, and workout suggestions—all through a simple voice-based interface."
  },
  {
    question: "Is JivanMitra a replacement for a doctor?",
    answer: "No. JivanMitra is designed for early assistance and lifestyle guidance. It helps you understand your symptoms and suggests next steps—but it's not a substitute for professional medical diagnosis."
  },
  {
    question: "What kind of questions can I ask JivanMitra?",
    answer: "You can talk about symptoms you're experiencing, your health goals, daily routines, or ask for a diet or fitness plan tailored to your conditions and lifestyle."
  },
  {
    question: "How does JivanMitra personalize my health reports?",
    answer: "We analyze the health information you provide during sign-up (or later), including any medical history, age, and goals, to tailor advice and plans that are just right for you."
  },
  {
    question: "Can I use JivanMitra in my native language?",
    answer: "Currently, JivanMitra supports English, but we're working on adding support for regional languages soon to make it more accessible for everyone."
  },
  {
    question: "How accurate is the health advice given?",
    answer: "JivanMitra uses state-of-the-art AI models like Gemini Pro to provide evidence-based guidance. While it aims to be helpful, we always recommend following up with a healthcare professional for serious concerns."
  },
  {
    question: "Is JivanMitra free to use?",
    answer: "Yes! The core features including consultation, diet/workout plans, and reports are completely free. Premium features may be added in the future."
  }
];

const FAQ = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="text-left text-lg font-medium py-4 hover:text-health-blue transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4 pt-1">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQ;
