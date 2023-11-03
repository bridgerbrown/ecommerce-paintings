import { updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase.config";

export default async function stockUpdate(product, productsStock) {
  const stockRef = doc(db, "paintings", `${product.fsid}`);
  if(productsStock > 0) {
    await updateDoc(stockRef, {
      stock: product.stock - 1
    }); 
  } else {
    await updateDoc(stockRef, {
      stock: 10
    });
  };
};
