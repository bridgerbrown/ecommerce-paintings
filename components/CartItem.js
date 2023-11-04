import React from "react";
import Link from 'next/link'
import Image from "next/image";
import { removeFromCartStockUpdate } from "../data/firebase/stockUpdate";

export default function CartItem({ product, removeFromCart, productsStock }) {
  return (
    <div 
      className="cartitem-container"
      data-testid={`product-${product.id}-cart-item`}
    >
      <div className="cartitem-image">
        <figure className="image">
            <Image
              src={product.img}
              alt={product.shortDesc}
              width={product.width}
              height={product.height}
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
                  removeFromCart(product)
                  removeFromCartStockUpdate(product, productsStock)
                }}
              >
                Remove
              </button>
              <Link href={`/products/${product.artist}/${product.title}`}>
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
)};
