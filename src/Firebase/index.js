import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, updateDoc, doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase.config"

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const paintingsRef = collection(db, 'paintings')

let paintings = []
onSnapshot(paintingsRef, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      paintings.push({ ...doc.data(), id: doc.id })
    })
    console.log(paintings)
    return paintings
  })

export const paintingsData = paintings

export const auth = getAuth()
  export const signInUser = signInAnonymously(auth)

export const updateItem = (item) => {
  const itemRef = doc(db, "paintings", item)
  updateDoc(itemRef, {
    stock: item.stock
  })
}