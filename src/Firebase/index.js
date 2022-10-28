import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
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

export function authChange(username) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.displayName = username
      console.log("signed in")
    }
    else {
      console.log("signed out")
    }
  })
}


export const updateItem = (item) => {
  const itemRef = doc(db, "paintings", item)
  updateDoc(itemRef, {
    stock: item.stock
  })
}