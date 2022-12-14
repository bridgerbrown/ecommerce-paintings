import React from "react";
import { useProductContext } from "../components/context/ProductContext";
import ProductItem from "../components/ProductItem"

export default function ProductList() {
    const { products, addToCart } = useProductContext()

    return(
        <>
        <div className="title-container">
            <h4 className="page-title">Products</h4>
        </div>
        <br />
        <div className="container">
            <div className="painting-list">
                {products && products.length ? (
                    products.map((product, index) => (
                        <ProductItem
                            product={product}
                            key={index}
                            addToCart={addToCart}
                        />
                    ))
                ) : (
                    <div className="loading-container">
                        <span className="loading">
                            Loading...
                        </span>
                    </div>
                )}
            </div>
        </div>
    </>
    )
}