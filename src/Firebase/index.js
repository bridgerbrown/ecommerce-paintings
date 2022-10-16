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

export const paintingsData = paintings

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