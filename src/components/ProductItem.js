import React from "react"
import { Link } from "react-router-dom"

const ProductItem = props => {
    const { product } = props
    return(
        <div className="painting-container">
            <div className="painting-image">
                <figure className="image">
                    <img 
                        src={product.img}
                        alt={product.shortDesc}
                    />
                </figure>
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
                                    props.addToCart({
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
                            <Link to={`/${product.title}`}>
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

export default ProductItem