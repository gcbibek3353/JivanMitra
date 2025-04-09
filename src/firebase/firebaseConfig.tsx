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
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";
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
    logOut: () => Promise<void>;
      authloading:boolean
    addReportToDb: ({ patientId, report }: addReportParams) => Promise<{
        success: boolean,
        message: string,
        reportId: string
    }>;
    getReportByReportId: (reportId: string) => Promise<{
        success: boolean,
        message: string,
        report: any
    }>;
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
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // type User from firebase/auth 
const[authloading,setAuthloading]=useState(true)
      
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedInUser(user);
                setIsUserLoggedIn(true);
              setAuthloading(false)
            }
            else {
                setIsUserLoggedIn(false);
            }
        })
    })

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

    const addReportToDb = async ({ patientId, report }: addReportParams) => {
        try {
            console.log(patientId);
            console.log(report);

            const reportRef = await addDoc(collection(firebasedb, "reports"), {
                patientId,
                report
            })
            return {
                success: true,
                message: "Report saved to database successfully",
                reportId: reportRef.id
            }
        } catch (error) {
            console.log("Error saving the report in DB", error);
            return {
                success: false,
                message: "FAiled to save report",
                reportId: ""
            }
        }

    }

    const getReportByReportId = async (reportId: string) => {
        try {
            const docRef = doc(firebasedb, "reports", reportId);
            const docSnapShot = await getDoc(docRef);

            if (docSnapShot.exists()) {
                console.log("Document data:", docSnapShot.data());
                return {
                    success: true,
                    message: "got report successfully",
                    report: docSnapShot.data()
                }
            } else {
                console.log("No such document!");
            }

        } catch (error) {
            console.log('Error while getting the report ', error);
            return {
                success: false,
                message: "Failed to fetch report",
            }

        }
    }

    return (
        <FirebaseContext.Provider value={{
            isUserLoggedIn,
            loggedInUser,
            signUpWithEmail,
            signInWithEmail,
            signInWithGoogle,
            signInWithGithub,
            logOut,
            addReportToDb,
            getReportByReportId,
              authloading
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}

