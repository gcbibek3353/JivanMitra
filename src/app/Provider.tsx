'use client'

import { FirebaseProvider } from '@/firebase/firebaseConfig'
import React, { ReactNode } from 'react'

const Provider = ({children} : {children : ReactNode}) => {
    // TODO : use firebase provider , theme provider , toast Provider ... here
  return (
    <FirebaseProvider>
    <div>{children}</div>
    </FirebaseProvider>
  )
}

export default Provider