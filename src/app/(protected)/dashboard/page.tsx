'use client';


import { useFirebase } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SidebarNav from './Navbar';
import { FaSpinner } from 'react-icons/fa'; // Create this component or use a simple div

const Dashboard = () => {
  const { user, authloading } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!authloading && !user) {
      router.push('/sign-in');
    }
  }, [user, authloading, router]);

  if (authloading) {
    return <FaSpinner />; // Or <div>Loading...</div>
  }

  return (
    <div>
      <SidebarNav />
      {/* Your dashboard content */}
    </div>
  );
};

export default Dashboard;