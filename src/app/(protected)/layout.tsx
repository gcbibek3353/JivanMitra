"use client";
import { useFirebase } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const { loggedInUser } = useFirebase();
  const router = useRouter();

  // useEffect(() => {
  //   if (!loggedInUser) {
  //     router.push('/sign-in');
  //   }
  // }, [loggedInUser, router]);

  if (!loggedInUser) return null;

  return <div>{children}</div>;
};

export default layout;
