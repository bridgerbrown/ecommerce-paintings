import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useProductContext } from "./context/ProductContext"

export default function ProductItem({ product, addToCart }) {
    const { loaderProp, setInfoPage } = useProductContext()
    console.log(product.id)
    return(
        <div className="painting-container">
            <div className="painting-image-container" 
                onClick={() => setInfoPage(product.id)}>
                    <Link href="/product-info">
                        <Image
                            src={product.img}
                            alt={product.shortDesc}
                            sizes="(max-width: 19rem, max-height: 15rem),
                                    (max-width: 14rem, max-height: 9rem) 50vw,
                                    "
                            loader={loaderProp}
                            className="product-item-image"
                        />  
                    </Link>
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
                                onClick={() => 
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
                                        width: product.width,
                                        height: product.height,
                                    })
                                }
                            >
                                Add to Cart
                            </button>
                            <Link href="/product-info">
                                <button
                                    className="more-info"
                                    onClick={() => setInfoPage(product.id)}
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