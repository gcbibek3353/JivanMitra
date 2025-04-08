'use client';

import { useFirebase } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { user, logOut } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  const handleLogout = async () => {
    await logOut();
    router.push('/sign-in');
  };

  if (!user) return null; // Avoid flickering for a brief moment

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="mb-6 text-gray-700">Logged in as <span className="font-semibold">{user.email}</span></p>
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
