"use client";
import Agent from "@/components/Agent";
import { useFirebase } from "@/firebase/firebaseConfig";
import React, { useEffect } from "react";

const ConsultPage = () => {
  const { fetchAllInfoRecords, loggedInUser } = useFirebase();
  const firebase = useFirebase();
  const [records, setRecords] = React.useState<any[]>([]);
  const [profile, setProfile] = React.useState<any[]>([]);
  const [summary, setSummary] = React.useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await firebase.fetchAllInfoRecords(
        firebase.loggedInUser?.uid as string
      );
      // console.log("dataaaa", data);
      const userProfile = await firebase.fetchUserProfile(
        firebase.loggedInUser?.uid as string
      ); // You'll need to implement this
      // console.log("userrrr", userProfile);
      setRecords(data);
      if (userProfile) {
        setProfile(userProfile);
      }

      const summ = {
        ...data,
        ...userProfile,
      };
      // console.log(summ);
      setSummary(summ);
    };

    loadData();
  }, []);

  //   if (records.length === 0) return <div>No records found</div>;

  return (
    <div className="h-full w-full">
      <Agent
        patientName={loggedInUser?.displayName as string}
        patientId={loggedInUser?.uid}
        summary={JSON.stringify(summary)}
      />
      temp page
    </div>
  );
};

export default ConsultPage;
