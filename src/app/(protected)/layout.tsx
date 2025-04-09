'use client'
import { useFirebase } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa';
import SidebarNav from './dashboard/Navbar';

const layout = ({ children }: { children: ReactNode }) => {
  const { loggedInUser, authloading } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!authloading && !loggedInUser) {
      router.push("/sign-in");
    }
  }, [loggedInUser, authloading, router]);

  if (authloading) {
    return <FaSpinner />; // Or <div>Loading...</div>
  }

  return (
    <div className='flex'>
       <SidebarNav />
      {children}
      </div>
  )
}

export default layout;
