import React from "react"
import Link from "next/link"
import Image from "next/image"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "./firebase/firebase.config"

export default function ProductItem({ product, addToCart, loaderProp }) {
    const productRef = doc(db, "paintings", `${product.fsid}`)

    async function addToCartStockUpdate() {
        if(product.stock > 0) {
            await updateDoc(productRef, {
                stock: product.stock - 1
            })    
        } 
        // else if(product.stock <= 0 ) {
        //     await updateDoc(productRef, {
        //         stock: 100
        //     })    
        // }
    }

    return(
        <div className="painting-container">
            <div className="painting-image">
                <div className="painting-image-container">
                    <Link href={`/products/${product.route}`}>
                        <Image
                            src={product.img}
                            alt={product.title}
                            sizes="(max-width: 19rem, max-height: 15rem),
                            (max-width: 14rem, max-height: 9rem) 50vw,
                            "
                            loader={loaderProp}
                            className="product-item-image"
                        />  
                    </Link>
                </div>
            </div>
                <div className="painting-text">
                    <div className="painting-titling">
                        <h1 className="painting-title">
                            {product.title}
                        </h1>
                        <h2 className="painting-artist">{product.artist}</h2>
                    </div>
                    <div className="painting-action">
                        <span className="painting-price">{product.price}</span>
                        {product.stock > 0 ? (
                        <small className="painting-stock">{product.stock + " Available"}</small>
                        ) : (
                        <small className="out-of-stock">Out Of Stock</small>
                        )}
                        <div className="painting-buttons">
                            <button
                                className="add-to-cart"
                                onClick={() => {
                                    addToCartStockUpdate()
                                    addToCart({
                                        id: product.id,
                                        title: product.title,
                                        img: product.img,
                                        link: product.link,
                                        description: product.description,
                                        medium: product.medium,
                                        artist: product.artist,
                                        quantity: 1,
                                        stock: product.stock,
                                        price: product.price,
                                        route: product.route,
                                        fsid: product.fsid
                                    })
                                }}
                            >
                                Add to Cart
                            </button>
                            <Link href={`/products/${product.route}`}>
                                <button
                                    className="more-info"
                                >
                                    More Info
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}