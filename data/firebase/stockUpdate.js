import { updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase.config";
import { useProductContext } from "../context/ProductContext";


export async function addToCartStockUpdate(product, productsStock) {
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

export async function removeFromCartStockUpdate(product, stock) {
  const stockRef = doc(db, "paintings", `${product.fsid}`);
  await updateDoc(stockRef, {
    stock: product.quantity + stock
  });
};
