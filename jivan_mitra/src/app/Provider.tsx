"use client";

import { FirebaseProvider } from "@/firebase/firebaseConfig";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <FirebaseProvider>
        {children}
        <Toaster />
      </FirebaseProvider>
    </div>
  );
};

export default Provider;
