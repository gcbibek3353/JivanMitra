'use client'

import { FirebaseProvider } from '@/firebase/firebaseConfig'
import React, { ReactNode } from 'react'
import { Toaster } from "sonner";

const Provider = ({ children }: { children: ReactNode }) => {
  // TODO : use firebase provider , theme provider , toast Provider ... here
  return (
    <div>
      <FirebaseProvider>
        {children}
        <Toaster />
      </FirebaseProvider>
    </div>
  )
}

export default Provider