'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";

export const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firebasedb = getFirestore(app);


export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null); // type User from firebase/auth 

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setLoggedInUser(user);
                setIsUserLoggedIn(true);
            }
            else {
                setIsUserLoggedIn(false);
            }
        })
    })

    const signUpUserWithEmailAndPassword = async ({ name, age, height, gender, email, password }: signUpParams) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            // TODO : call the function that stores the user to the db when new user is created
            return {
                success: true,
                message: "user Created successfully",
                userCredentials: userCredentials.user
            }
        } catch (error) {
            console.log('Error while creating the user', error);
        }
    }

    const signInUserWithEmailAndPassword = async ({ email, password }: signInParams) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(firebaseAuth, email, password);
            return {
                success: true,
                message: "user Logged in successfully",
                userCredentials: userCredentials.user
            }
        } catch (error) {
            console.log('Error while signing in the user', error);
        }
    }

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
    const getReportByReportId = async (reportId : string) => {
        try {
            const docRef = doc(firebasedb,"reports",reportId);
            const docSnapShot = await getDoc(docRef);

            if (docSnapShot.exists()) {
                console.log("Document data:", docSnapShot.data());
                return {
                    success : true,
                    message : "got report successfully",
                    report : docSnapShot.data()
                }
              } else {
                console.log("No such document!");
              }

        } catch (error) {
            console.log('Error while getting the report ' , error);
            return {
                success : false,
                message : "Failed to fetch report",
            }
            
        }
    }

    return (
        <FirebaseContext.Provider value={{ signUpUserWithEmailAndPassword, signInUserWithEmailAndPassword,addReportToDb,getReportByReportId, isUserLoggedIn, loggedInUser }}>
            {children}
        </FirebaseContext.Provider>
    )
}