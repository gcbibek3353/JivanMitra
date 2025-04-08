'use client'
import { useFirebase } from '@/firebase/firebaseConfig'
import React from 'react'

const SignInPage = () => {
  const firebase = useFirebase();
  console.log(firebase);

  return (
    <div>SignInPage will come here </div>
  )
}

export default SignInPage