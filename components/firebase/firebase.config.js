import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth"
import { firebaseConfig } from "./firebase-config-keys";



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth()
