import React, { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useProductContext } from "./context/ProductContext"

export default function ProductItem({ product, addToCart }) {
    const { loaderProp } = useProductContext()
    
    return(
        <div className="painting-container">
            <div className="painting-image-container" >
                    <Link href={`/products/${product.fields.title.stringValue}`}>
                        <Image
                            src={product.fields.img.stringValue}
                            alt={product.fields.title.stringValue}
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
                            {product.fields.title.stringValue}
                        </h1>
                        <h2 className="painting-artist">{product.fields.artist.stringValue}</h2>
                    </div>
                    <div className="painting-action">
                        <span className="painting-price">{product.fields.price.stringValue}</span>
                        {product.fields.stock.integerValue > 0 ? (
                        <small className="painting-stock">{product.fields.stock.integerValue + " Available"}</small>
                        ) : (
                        <small className="out-of-stock">Out Of Stock</small>
                        )}
                        <div className="painting-buttons">
                            <button
                                className="add-to-cart"
                                onClick={() => 
                                    addToCart({
                                        id: product.fields.id.integerValue,
                                        title: product.fields.title.stringValue,
                                        img: product.fields.img.stringValue,
                                        link: product.fields.link.stringValue,
                                        description: product.fields.description.stringValue,
                                        medium: product.fields.medium.stringValue,
                                        artist: product.fields.artist.stringValue,
                                        quantity: 1,

                                        width: product.fields.width.integerValue,
                                        height: product.fields.height.integerValue,
                                        stock: product.fields.stock.integerValue,
                                        fsid: product.fields.fsid.stringValue,
                                        date: product.fields.date.stringValue,
                                        place: product.fields.place.stringValue,
                                    })
                                }
                            >
                                Add to Cart
                            </button>
                            <Link href={`/products/${product.fields.route.stringValue}`}>
                                <button className="more-info">
                                    More Info
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}