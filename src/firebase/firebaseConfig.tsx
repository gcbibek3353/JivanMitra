'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";

export const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
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

    const signUpUserWithEmailAndPassword = async ({ name, email, password }: signUpParams) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            // call the function that stores the user to the db when new user is created
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
            // To persist sessions via cookies (e.g. for SSR or API protection), you'd need to implement Firebase Admin SDK on your backend, and manually set the session cookies.
            return {
                success: true,
                message: "user Logged in successfully",
                userCredentials: userCredentials.user
            }
        } catch (error) {
            console.log('Error while signing in the user', error);
        }
    }


    return (
        <FirebaseContext.Provider value={{ signUpUserWithEmailAndPassword, signInUserWithEmailAndPassword, isUserLoggedIn, loggedInUser }}>
            {children}
        </FirebaseContext.Provider>
    )
}