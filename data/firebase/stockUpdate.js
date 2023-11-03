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

export async function removeFromCartStockUpdate(product) {
  const stockRef = doc(db, "paintings", `${product.fsid}`);
  const { cart } = useProductContext();
  const productInCart = cart.filter((item) => item.id == product.id);
  const originalStock = productInCart[0].stock;
  await updateDoc(stockRef, {
    stock: originalStock
  });
};
