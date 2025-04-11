"use client";
import Agent from "@/components/Agent";
import { useFirebase } from "@/firebase/firebaseConfig";
import React, { useEffect } from "react";

const testConsult = () => {
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
    //   console.log(summ);
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
<<<<<<< HEAD
        type="query"
=======
>>>>>>> 0902d1df66d7ba59cc9a96e241a82334f9126aa3
      />
      consult page
    </div>
  );
};

export default testConsult;
