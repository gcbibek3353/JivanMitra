'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Apple,
  Dumbbell,
  LogOut,
} from 'lucide-react';
import { useFirebase } from '@/firebase/firebaseConfig';

function SidebarNav() {
  const { loggedInUser, logOut } = useFirebase();
  // console.log(loggedInUser)
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navItems = [
    { icon: Stethoscope, label: 'Consult', color: 'text-emerald-600', path: '/consult' },
    { icon: Apple, label: 'Nutrition Guide', color: 'text-purple-600', path: '/nutrition' },
    { icon: Dumbbell, label: 'Workout Guide', color: 'text-blue-600', path: '/workout' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-md bg-white shadow-lg 
        hover:bg-gray-50 transition-all duration-150 ease-linear hover:scale-105"
        aria-label="Toggle navigation menu"
      >
        {isSidebarOpen ? (
          <X className="w-7 h-7 transition-transform" />
        ) : (
          <Menu className="w-7 h-7 transition-transform" />
        )}
      </button>

      {/* Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-150"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 ${
          isSidebarCollapsed ? 'w-24' : 'w-72'
        } bg-white shadow-lg transform-gpu ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-all duration-150 ease-linear flex flex-col`}
      >
        {/* Header Section */}
        <div className="p-5 border-b flex items-center justify-between">
          <h1
            className={`text-2xl font-bold text-gray-800 truncate transition-all ${
              isSidebarCollapsed ? 'max-w-0' : 'max-w-[160px]'
            } duration-150 overflow-hidden mx-auto`}
          >
            JivanMitra
          </h1>
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all 
            duration-150 ease-linear hidden lg:block hover:scale-105"
            aria-label="Toggle sidebar collapse"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-6 h-6" />
            ) : (
              <ChevronLeft className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center ${
                    isSidebarCollapsed ? 'justify-center' : 'space-x-4'
                  } px-5 py-4 hover:bg-gray-100 rounded-lg transition-all duration-150 ease-linear`}
                >
                  <item.icon className={`${item.color} w-6 h-6 min-w-[24px]`} />
                  <span
                    className={`font-semibold text-[15px] ${
                      isSidebarCollapsed
                        ? 'max-w-0 opacity-0'
                        : 'max-w-[200px] opacity-100 ml-2'
                    } transition-all duration-150 ease-linear overflow-hidden `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="border-t p-4">
          <div
            className={`flex items-center ${
              isSidebarCollapsed ? 'justify-center' : 'space-x-4'
            } mb-4 transition-all duration-150`}
          >
            {loggedInUser?.photoURL ? (
              <img
                src={loggedInUser.photoURL}
                alt="User avatar"
                className="w-12 h-12 rounded-full object-cover transition-all duration-150"
              />
            ) : (
              <button
                className="w-12 h-12 rounded-full bg-white text-blue-600 font-bold text-lg flex items-center justify-center border border-blue-200 shadow-sm hover:shadow-md hover:ring-2 hover:ring-blue-400/50 transition-all duration-200"
                aria-label="User"
                title={loggedInUser?.email || 'User'}
              >
                {loggedInUser?.email?.split('@')[0]?.charAt(0).toUpperCase()}
              </button>

            )}
            <div
              className={`${
                isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'
              } transition-all duration-150 ease-linear overflow-hidden`}
            >
              
              <p className="text-sm text-gray-500 truncate">{loggedInUser?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isSidebarCollapsed ? 'justify-center' : 'space-x-3'
            } px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg 
            transition-all duration-150 ease-linear`}
            aria-label="Logout"
          >
            <LogOut className="w-6 h-6 min-w-[24px]" />
            <span
              className={`${
                isSidebarCollapsed ? 'max-w-0 opacity-0' : 'max-w-[100px] opacity-100'
              } transition-all duration-150 ease-linear overflow-hidden`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </div>
  );
}

export default SidebarNav;