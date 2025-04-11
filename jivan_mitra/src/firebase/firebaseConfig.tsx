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

// Add this type definition
type UserProfile = {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: "male" | "female" | "other";
};

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
  addReportToDb: ({ patientId, report }: addReportParams) => Promise<{
    success: boolean;
    message: string;
    reportId: string;
  }>;
  getReportByReportId: (reportId: string) => Promise<{
    success: boolean;
    message: string;
    report: any;
  }>;
  logOut: () => Promise<void>;
  authloading: boolean;
  fetchUserProfile: (userId: string) => Promise<any>;
  updateUserProfile: (userId: string, profile: UserProfile) => Promise<void>;
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

  const addReportToDb = async ({ patientId, report }: addReportParams) => {
    try {
      console.log(patientId);
      console.log(report);

      const reportRef = await addDoc(collection(firebasedb, "reports"), {
        patientId,
        report,
      });
      return {
        success: true,
        message: "Report saved to database successfully",
        reportId: reportRef.id,
      };
    } catch (error) {
      console.log("Error saving the report in DB", error);
      return {
        success: false,
        message: "FAiled to save report",
        reportId: "",
      };
    }
  };

  const getReportByReportId = async (reportId: string) => {
    try {
      const docRef = doc(firebasedb, "reports", reportId);
      const docSnapShot = await getDoc(docRef);

      if (docSnapShot.exists()) {
        return {
          success: true,
          message: "got report successfully",
          report: docSnapShot.data(),
        };
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error while getting the report ", error);
      return {
        success: false,
        message: "Failed to fetch report",
      };
    }
  };

  const profileCollectionName = "userProfiles";

  const fetchUserProfile = async (userId: string) => {
    try {
      const q = query(
        collection(firebasedb, profileCollectionName),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const profileDoc = querySnapshot.docs[0];
        return {
          id: profileDoc.id,
          ...profileDoc.data(),
        };
      }

      // Return default profile if none exists
      return {
        age: 0,
        weight: 0,
        height: 0,
        gender: "other",
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);

      toast.error("Failed to fetch user profile");
      return null;
    }
  };

  const updateUserProfile = async (userId: string, profile: UserProfile) => {
    try {
      // First check if profile exists
      const q = query(
        collection(firebasedb, profileCollectionName),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Update existing profile
        const profileDoc = querySnapshot.docs[0];
        await updateDoc(doc(firebasedb, profileCollectionName, profileDoc.id), {
          ...profile,
          updatedAt: new Date().toISOString(),
        });
      } else {
        // Create new profile
        await addDoc(collection(firebasedb, profileCollectionName), {
          userId,
          ...profile,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Failed to update profile");
    }
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
        addReportToDb,
        getReportByReportId,
        logOut,
        authloading,
        fetchUserProfile,
        updateUserProfile,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
