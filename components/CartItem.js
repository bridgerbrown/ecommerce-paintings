import React from "react";
import { useProductContext } from "./context/ProductContext";
import Link from 'next/link'

export default function CartItem({ product, removeFromCart }) {
  return (
    <div className="cartitem-container">
        <div className="cartitem-image">
            <figure className="image">
                <img 
                    src={product.img}
                    alt={product.shortDesc}
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
                            onClick={() => 
                                removeFromCart(product.id)
                            }
                        >
                            Remove
                        </button>
                        <Link href={`/products/${product.title}`}>
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