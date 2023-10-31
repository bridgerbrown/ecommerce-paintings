import React from "react";
import { useProductContext } from "../data/context/ProductContext";
import Link from 'next/link'
import Image from "next/image";
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../data/firebase/firebase.config"

export default function CartItem({ product, removeFromCart }) {
    const { loaderProp, cart } = useProductContext()
    const productRef = doc(db, "paintings", `${product.fsid}`)

    async function removeFromCartStockUpdate() {
        const productInCart = cart.filter((item) => item.id == product.id)
        console.log(productInCart)
        const originalStock = productInCart[0].stock
        console.log(originalStock)

        await updateDoc(productRef, {
            stock: originalStock
        })  
    }

    return (
    <div className="cartitem-container">
        <div className="cartitem-image">
            <figure className="image">
                <Image
                    src={product.img}
                    alt={product.shortDesc}
                    width={product.width}
                    height={product.height}
                    loader={loaderProp}
                />
            </figure>
        </div>
        <div className="cartitem-details">
            <div className="cartitem-right">
                <div className="cartitem-info">
                    <div className="cartitem-text">
                        <h1 className="cartitem-title">
                            {product.title}
                        </h1>
                        <h2 className="cartitem-artist">{product.artist}</h2>
                        <small>{`${product.quantity} in cart`}</small>
                    </div>
                    <div className="cartitem-buttons">
                        <button
                            className="remove-cart"
                            onClick={() => {
                                removeFromCartStockUpdate()
                                removeFromCart(product)
                                }
                            }
                        >
                            Remove
                        </button>
                        <Link href={`/products/${product.id}`}>
                        <button
                            className="more-info"
                        >
                            More Info
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
            <div className="cartitem-price">
                    <h3>{product.price}</h3>
            </div> 
        </div>
    </div>
  );
};
