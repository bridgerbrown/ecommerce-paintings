import React, { useEffect } from "react";
import ProductItem from "./ProductItem"
import withContext from "../withContext";

const ProductList = props => {
    const { products } = props.context

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
                            addToCart={props.context.addToCart}
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

export default withContext(ProductList)