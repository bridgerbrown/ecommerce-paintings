import React from "react";
import Image from "next/image";
import { useProductContext } from "../data/context/ProductContext";
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../data/firebase/firebase.config";

export default function Details({product}) {
    const { loaderProp, addToCart } = useProductContext()
    const productRef = doc(db, "paintings", `${product.fsid}`)

    async function addToCartStockUpdate() {
        if(product.stock > 0) {
            await updateDoc(productRef, {
                stock: product.stock - 1
            })    
        } 
    }


    return (
        <div className="info-container">
            <div className="info-image-container">
                <Image
                    src={product.img_full}
                    alt={product.shortDesc}
                    width={product.width}
                    height={product.height}
                    loader={loaderProp}
                    className="info-image"
                />
            </div>
            <div className="info">
                <div className="info-text">
                    <h1 className="info-title">
                        {product.title}
                    </h1>
                    <h2 className="info-artist">{product.artist}</h2>
                    <h4>{product.date}</h4>
                    <h4>{product.medium}</h4>
                    <h4>{product.place}</h4>
                    <p>{product.description}</p>
                    <div className="info-stock-price">
                        <h2 className="info-price">{product.price}</h2>
                        {product.stock > 0 ? (
                        <small className="info-stock">{product.stock + " Available"}</small>
                        ) : (
                        <small className="out-of-stock">Out Of Stock</small>
                        )}
                    </div>
                </div>
                <div className="info-buttons">
                    <button
                        className="add-to-cart"
                        onClick={() => {
                            addToCartStockUpdate()
                            addToCart({
                                id: product.id,
                                title: product.title,
                                img: product.img,
                                img_full: product.img_full,
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
                    <a href={product.link} target="_blank" rel="noopener noreferrer">Source</a>
                </div>
            </div>
        </div>
    )
}
