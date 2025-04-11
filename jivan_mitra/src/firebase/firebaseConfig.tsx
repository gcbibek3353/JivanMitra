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
  browserSessionPersistence,
} from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "sonner";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

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
setPersistence(auth, browserSessionPersistence);

const firebasedb = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// --- Context Types ---

//TODO : need to update interface whenever new function is added to the context
interface FirebaseContextType {
  isUserLoggedIn: boolean;
  loggedInUser: User | null;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  deleteInfoRecord: (id: string) => Promise<void>;
  fetchAllInfoRecords: (userId: string) => Promise<any[]>;
  addInfoRecord: (record: any, userId: string) => Promise<any>;
  updateInfoRecord: (record: any) => Promise<void>;
  logOut: () => Promise<void>;
  authloading: boolean;
}

// --- Create Context ---
const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context)
    throw new Error("useFirebase must be used within a FirebaseProvider");
  return context;
};

// --- Provider ---
export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // type User from firebase/auth
  const [authloading, setAuthloading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
      setAuthloading(false);
    });
  });

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      toast.success(
        `Signed in as ${result.user.displayName || result.user.email}`
      );
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
  const InfocollectionName = "medications";

  const fetchAllInfoRecords = async (userId: string) => {
    const q = query(
      collection(firebasedb, InfocollectionName),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const addInfoRecord = async (record: any, userId: string) => {
    const docRef = await addDoc(collection(firebasedb, InfocollectionName), {
      ...record,
      userId,
    });
    return { ...record, userId, id: docRef.id };
  };

  const updateInfoRecord = async (record: any) => {
    const docRef = doc(firebasedb, InfocollectionName, record.id);
    await updateDoc(docRef, {
      sickness: record.sickness,
      medications: record.medications,
    });
  };

  const deleteInfoRecord = async (id: string) => {
    await deleteDoc(doc(firebasedb, InfocollectionName, id));
  };

  return (
    <FirebaseContext.Provider
      value={{
        isUserLoggedIn,
        loggedInUser,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        signInWithGithub,
        deleteInfoRecord,
        addInfoRecord,
        updateInfoRecord,
        fetchAllInfoRecords,
        logOut,
        authloading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
