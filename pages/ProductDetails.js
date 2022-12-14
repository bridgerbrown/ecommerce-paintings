import React from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../components/context/ProductContext";

export default function ProductDetails() {
    const { products, addToCart } = useProductContext()
    const { title } = useParams()

    return(
    <div>
    {
    products.filter((product) => product.title === title)
    .map((product, index) => (
        <div className="info-container" key={index}>
            <div className="info-image">
                <img 
                    src={product.img}
                    alt={product.shortDesc}
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
                                price: product.price
                            })
                        }
                    >
                        Add to Cart
                    </button>
                    <a href={product.link} target="_blank" rel="noopener noreferrer">Source</a>
                </div>
            </div>
        </div>
        ))
    }
    </div>
    )
}