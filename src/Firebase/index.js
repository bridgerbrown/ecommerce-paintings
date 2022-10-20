import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
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

const auth = getAuth()
  export const signInUser = signInAnonymously(auth)

export const updateProducts = (db, products) => {
  let listPromises = products.map((prod, index) => {
    return updateProduct(db, prod);
  });

  return Promise.all(listPromises);
};

export const updateProduct = (db, item) => {
  return db.collection("paintings").doc(item.id).update({
    stock: item.stock,
  });
};