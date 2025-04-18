"use client";

import { initializeApp } from "firebase/app";
import { format } from "date-fns";
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
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Nutrition } from "@/actions/nutritions";
import { WorkOut } from "@/actions/workout";

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
  getOrCreateDailyTracking: (userId: string) => Promise<void>;
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
  getReportByUserId : (userId: string) => Promise<{
    success: boolean;
    message: string;
    data: any[];
  }>;
  logOut: () => Promise<void>;
  authloading: boolean;
  fetchUserProfile: (userId: string) => Promise<any>;
  updatePillStatus: (
    userId: string,
    date: string,
    index: number,
    taken: boolean
  ) => Promise<any>;
  updateUserProfile: (userId: string, profile: UserProfile) => Promise<void>;
  addNutritionToDb: ({ patientId, nutrition }: addNutritionParams) => Promise<{
    success: boolean;
    message: string;
    nutritionId: string;
  }>;
  getNutritionsByPatientId: (patientId: string) => Promise<
    {
      patientId: string;
      nutrition: Nutrition;
    }[]
  >;
  addWorkoutToDb: ({ patientId, workout }: addWorkoutParams) => Promise<{
    success: boolean;
    message: string;
    workoutId: string;
  }>;
  getWorkoutsByPatientId: (patientId: string) => Promise<
    {
      patientId: string;
      workout: WorkOut;
    }[]
  >;
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
  const updatePillStatus = async (
    userId: string,
    date: string,
    index: number,
    taken: boolean
  ) => {
    const docRef = doc(firebasedb, `users/${userId}/dailyTracking/${date}`);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return;

    const data = snapshot.data();
    if (!data.pills || !data.pills[index]) return;

    data.pills[index].taken = taken;

    await updateDoc(docRef, {
      pills: data.pills,
    });

    return data.pills;
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
  const getOrCreateDailyTracking = async (userId: string) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const trackingDocRef = doc(
      firebasedb,
      `users/${userId}/dailyTracking/${today}`
    );
    const existingSnap = await getDoc(trackingDocRef);
    const existingData = existingSnap.exists() ? existingSnap.data() : null;

    const records = await fetchAllInfoRecords(userId);
    const todayDate = new Date();

    const existingTakenMap = new Map<string, boolean>();

    // Create a map of existing pills to preserve 'taken' status
    if (existingData?.pills) {
      for (const pill of existingData.pills) {
        const key = `${pill.medicineName}_${pill.dosage}_${pill.time}`;
        existingTakenMap.set(key, pill.taken);
      }
    }

    const pills: any[] = [];

    for (const record of records) {
      const { sickness, medications } = record as any;

      for (const med of medications) {
        const start = med.startDate ? new Date(med.startDate) : null;
        const end = med.endDate ? new Date(med.endDate) : null;

        const isWithinRange =
          (!start || todayDate >= start) && (!end || todayDate <= end);

        if (isWithinRange) {
          for (const time of med.times || []) {
            const key = `${med.name}_${med.dosage}_${time}`;
            pills.push({
              sickness,
              medicineName: med.name,
              dosage: med.dosage,
              time,
              taken: existingTakenMap.get(key) || false,
            });
          }
        }
      }
    }

    const dailyTracking = {
      date: today,
      pills,
    };

    await setDoc(trackingDocRef, dailyTracking); // Overwrite existing each time

    return dailyTracking;
  };

  const addInfoRecord = async (record: any, userId: string) => {
    // console.log("fff", record);
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
      // console.log(patientId);
      // console.log(report);

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

  const getReportByUserId = async (userId: string) => {
    try {
      const q = query(
        collection(firebasedb, "reports"),
        where("patientId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
  
      const reports: any[] = [];
      querySnapshot.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() });
      });
      // console.log(reports);
      
      return {
        success: true,
        message: "Reports fetched successfully",
        data: reports,
      };
    } catch (error) {
      console.log("Error while getting the reports ", error);
      return {
        success: false,
        message: "Failed to fetch report",
        error: error instanceof Error ? error.message : String(error),
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

  const addNutritionToDb = async ({
    patientId,
    nutrition,
  }: addNutritionParams) => {
    try {
      const nutritionRef = await addDoc(collection(firebasedb, "nutritions"), {
        patientId,
        nutrition,
      });
      return {
        success: true,
        message: "Nutrition saved to database successfully",
        nutritionId: nutritionRef.id,
      };
    } catch (error) {
      console.log("Error saving the nutrition in DB", error);
      return {
        success: false,
        message: "FAiled to save nutrition",
        nutritionId: "",
      };
    }
  };

  const getNutritionsByPatientId = async (patientId: string) => {
    try {
      // console.log(patientId);
      const nutritionsRef = collection(firebasedb, "nutritions");

      const q = query(nutritionsRef, where("patientId", "==", patientId));
      const querySnapshot = await getDocs(q);

      const nutritions = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      // console.log("Fetched nutritions:", nutritions);
      return nutritions;
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      return [];
    }
  };

  const addWorkoutToDb = async ({ patientId, workout }: addWorkoutParams) => {
    // console.log("Adding workout to DB", { patientId, workout });
    try {
      const workoutRef = await addDoc(collection(firebasedb, "workouts"), {
        patientId,
        workout,
      });
      return {
        success: true,
        message: "Workout saved to database successfully",
        workoutId: workoutRef.id,
      };
    } catch (error) {
      console.log("Error saving the workout in DB", error);
      return {
        success: false,
        message: "FAiled to save workout",
        nutritionId: "",
      };
    }
  };

  const getWorkoutsByPatientId = async (patientId: string) => {
    try {
      const workoutsRef = collection(firebasedb, "workouts");
      const q = query(workoutsRef, where("patientId", "==", patientId));
      const querySnapshot = await getDocs(q);

      const workouts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      return workouts;
    } catch (error) {
      console.error("Error fetching workouts data:", error);
      return [];
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        updatePillStatus,
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
        getOrCreateDailyTracking,
        getReportByReportId,
        logOut,
        authloading,
        fetchUserProfile,
        updateUserProfile,
        addNutritionToDb,
        getNutritionsByPatientId,
        addWorkoutToDb,
        getWorkoutsByPatientId,
        getReportByUserId
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
