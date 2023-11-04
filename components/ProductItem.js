import React from "react";
import Link from "next/link";
import Image from "next/image";
import productData from "../data/product";
import { useProductContext } from "../data/context/ProductContext";
import { addToCartStockUpdate } from "../data/firebase/stockUpdate";

export default function ProductItem({ painting, id, productsStock }) {
  const product = productData(painting, id, productsStock);
  const { addToCart } = useProductContext();

  return(
    <div 
      className="painting-container"
      data-testid={`productItem-${product.id}`}
    >
      <div className="painting-image">
        <div className="painting-image-container">
          <Link href={`/products/${product.route}`}>
            <Image
                src={product.img}
                alt={product.title}
                sizes="(max-width: 19rem, max-height: 15rem),
                (max-width: 14rem, max-height: 9rem) 50vw,
                "
                width={product.width}
                height={product.height}
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
            { productsStock > 0 ? (
              <small 
                className="painting-stock"
                data-testid={`productItem-${product.id}-stock`}
              >
                {productsStock + " Available"}
              </small>
              ) : (
              <small className="out-of-stock">Out Of Stock</small>
            )}
            <div className="painting-buttons">
              <button
                className="add-to-cart"
                onClick={() => {
                  addToCart(product)
                  addToCartStockUpdate(product, productsStock);
                }}
                data-testid={`productItem-${product.id}-addToCart`}
                >
                  Add to Cart
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
    </div>
)};
