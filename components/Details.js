import React from "react";
import Image from "next/image";
import { useProductContext } from "./context/ProductContext";

export default function Details({ product, addToCart }) {
    const { loaderProp } = useProductContext()
    const conditionsString = [
        route,
        img,
        description,
        title,
        artist,
        price,
        medium,
        link,
        fsid,
        date,
        place
    ]

    function convertApi(property) {
        if (conditionsString.indexOf(property) === -1 ) {
            return `product.fields.${property}.integerValue`
        } else {
            return `product.fields.${property}.stringValue`
        }
    }

    return (
        <div className="info-container">
            <div className="info-image">
                <Image
                    src={convertApi(img)}
                    alt={convertApi(title)}
                    sizes="(max-width: 40vw)"
                    loader={loaderProp}
                />
            </div>
            <div className="info">
                <div className="info-text">
                    <h1 className="info-title">
                        {convertApi(title)}
                    </h1>
                    <h2 className="info-artist">{convertApi(artist)}</h2>
                    <h4>{convertApi(date)}</h4>
                    <h4>{convertApi(medium)}</h4>
                    <h4>{convertApi(place)}</h4>
                    <p>{convertApi(description)}</p>
                    <div className="info-stock-price">
                        <h2 className="info-price">{convertApi(price)}</h2>
                        {convertApi(stock) > 0 ? (
                        <small className="info-stock">{convertApi(stock) + " Available"}</small>
                        ) : (
                        <small className="out-of-stock">Out Of Stock</small>
                        )}
                    </div>
                </div>
                <div className="info-buttons">
                    <button
                        className="add-to-cart"
                        onClick={() => 
                            addToCart({
                                id: convertApi(id),
                                title: convertApi(title),
                                img: convertApi(img),
                                link: convertApi(link),
                                description: convertApi(description),
                                medium: convertApi(medium),
                                artist: convertApi(artist),
                                quantity: 1,
                                price: convertApi(price),
                                width: convertApi(width),
                                height: convertApi(height),
                                stock: convertApi(stock),
                                fsid: convertApi(fsid),
                                date: convertApi(date),
                                place: convertApi(place),
                            })
                        }
                    >
                        Add to Cart
                    </button>
                    <a href={convertApi(link)} target="_blank" rel="noopener noreferrer">Source</a>
                </div>
            </div>
        </div>
    )
}