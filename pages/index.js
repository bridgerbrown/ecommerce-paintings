import React, { useEffect } from "react";
import { useProductContext } from "../components/context/ProductContext";
import ProductItem from "../components/ProductItem"
import Navbar from "../components/Navbar";

export default function ProductList() {
    const { addToCart, products } = useProductContext()

    return(
        <>
        <div className="App">
            <Navbar />
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
        </div>
    </>
    )
}