"use client";
import Agent from "@/components/Agent";
import { useFirebase } from "@/firebase/firebaseConfig";
import React, { useEffect } from "react";

const ConsultPage = () => {
  const firebase = useFirebase();
  const [records, setRecords] = React.useState<any[]>([]);
  useEffect(() => {
    const loadRecords = async () => {
      const data = await firebase.fetchAllInfoRecords();
      console.log(data);
      setRecords(data);
    };

    loadRecords();
  }, []);

  if (records.length === 0) return <div>No records found</div>;

  //   const tempSummary = `John is a 45-year-old male who stands 5 feet 10 inches tall and weighs 210 pounds, giving him a BMI of 30.1, which classifies him as obese. His blood pressure is elevated at 145/95 mmHg, indicating Stage 1 Hypertension. His resting heart rate is 88 bpm. His fasting blood sugar level is 130 mg/dL, placing him in the prediabetic range
  // Cholesterol levels are also a concern: total cholesterol is 240 mg/dL (high), LDL is 160 mg/dL (high), and HDL is 35 mg/dL (low). He leads a mostly sedentary lifestyle with little to no exercise, and his diet consists largely of processed foods and saturated fats. John is a smoker and occasionally consumes alcohol. He also has a family history of heart disease and mild asthma.`;
  return (
    <div className="h-full w-full">
      <Agent
        patientName={"Rajesh"}
        patientId="abcdbhaikodd"
        summary={records}
      />
      {/* This will contain the core logic of user interacting with AI */}
    </div>
  );
};

export default ConsultPage;
