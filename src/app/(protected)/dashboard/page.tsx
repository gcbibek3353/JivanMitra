'use client';

import { useFirebase } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { loggedInUser, logOut } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!loggedInUser) {
      router.push('/sign-in');
    }
  }, [loggedInUser, router]);

  const handleLogout = async () => {
    await logOut();
    router.push('/sign-in');
  };

  if (!loggedInUser) return null; // Avoid flickering for a brief moment

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="mb-6 text-gray-700">Logged in as <span className="font-semibold">{loggedInUser.email}</span></p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
