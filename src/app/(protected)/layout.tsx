'use client'
import { useFirebase } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa';

const layout = ({ children }: { children: ReactNode }) => {
  const { loggedInUser, authloading } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!authloading && !loggedInUser) {
      router.push('/sign-in');
    }
  }, [loggedInUser, authloading, router]);

  if (authloading) {
    return <FaSpinner />; // Or <div>Loading...</div>
  }

  return (
    <div>{children}</div>
  )
}

export default layout