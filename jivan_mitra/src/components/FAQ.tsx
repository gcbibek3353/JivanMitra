import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What is JivanMitra?",
    answer: "JivanMitra is an AI-powered health assistant that provides personalized health guidance, fitness routines, and medical insights through a conversational interface. It combines cutting-edge AI with healthcare expertise to support your wellness journey."
  },
  {
    question: "Is my health data secure?",
    answer: "Absolutely. We use industry-leading encryption and follow strict HIPAA-compliant protocols to ensure your health data remains private and secure. Your information is never shared with third parties without your explicit consent."
  },
  {
    question: "How accurate is the AI health guidance?",
    answer: "JivanMitra's AI is trained on comprehensive medical knowledge and is continuously updated with the latest research. While it provides valuable health insights, it's designed to complement, not replace, professional medical advice. Always consult healthcare professionals for serious health concerns."
  },
  {
    question: "Do I need special equipment for the workout routines?",
    answer: "No. JivanMitra creates customized workout plans based on your goals, fitness level, and available resources. You can specify what equipment you have access to, and the AI will tailor exercises accordingly, including equipment-free options."
  },
  {
    question: "Is there a subscription fee?",
    answer: "JivanMitra offers both free and premium subscription options. The free tier provides basic health guidance and limited features, while premium subscriptions unlock the full range of personalized services, detailed analytics, and priority support."
  },
  {
    question: "Can JivanMitra help with specific health conditions?",
    answer: "JivanMitra can provide general information and lifestyle recommendations for managing various health conditions. However, it should be used as a supportive tool alongside professional medical care, especially for chronic or serious health conditions."
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
