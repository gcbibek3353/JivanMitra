"use client";
import Agent from "@/components/Agent";
import { useFirebase } from "@/firebase/firebaseConfig";
import React, { useEffect } from "react";

const ConsultPage = () => {
  const {fetchAllInfoRecords , loggedInUser} = useFirebase();
  const [records, setRecords] = React.useState<any[]>([]);
  useEffect(() => {
    const loadRecords = async () => {
      const data = await fetchAllInfoRecords();
      console.log(data);
      setRecords(data);
    };

    loadRecords();
  }, []);

  if (records.length === 0) return <div>No records found</div>;

  return (
    <div className="h-full w-full">
      <Agent
        patientName={loggedInUser?.displayName as string}
        patientId={loggedInUser?.uid}
        summary={records}
      />
    </div>
  );
};

export default ConsultPage;
