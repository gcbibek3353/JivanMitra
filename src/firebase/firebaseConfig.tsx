"use client";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";

// Firebase config from .env
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth,browserSessionPersistence)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


// --- Context Types ---
interface FirebaseContextType {
  user: User | null;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logOut: () => Promise<void>;
  authloading:boolean
}

// --- Create Context ---
const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error("useFirebase must be used within a FirebaseProvider");
  return context;
};

// --- Provider ---
export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const[authloading,setAuthloading]=useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthloading(false)
    });
    
    return () => unsubscribe();
  }, []);

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      toast.success(`Signed up as ${result.user.email}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success(`Welcome back, ${result.user.email}`);
    } catch (error: any) {
      toast.error("Invalid email or password");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Signed in as ${result.user.displayName}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      toast.success(`Signed in as ${result.user.displayName || result.user.email}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out");
    } catch (error: any) {
      toast.error("Failed to logout");
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signInWithGithub,
        logOut,
        authloading
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
