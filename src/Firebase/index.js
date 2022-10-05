import { getAuth, signInAnonymously } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { firebaseConfig } from "./firebase.config"
  
// init Firebase
const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);
export const auth = getAuth()

// get paintings
export const paintingsRef = collection(db, 'paintings')

// real time collection data

let paintings = []
onSnapshot(paintingsRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      paintings.push({ ...doc.data(), id: doc.id })
    })
    console.log(paintings)
    return paintings
  })

export const paintingData = paintings

// user sign in anonymously
export const signInUser = signInAnonymously(auth)