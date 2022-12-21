import React, { useEffect, useState } from "react";
import { useProductContext } from "../components/context/ProductContext";
import ProductItem from "../components/ProductItem"
import Navbar from "../components/Navbar";
import getCollection from "../components/firebase/getCollection";


export default function ProductList() {
    const { addToCart, cart } = useProductContext()
    const { collection, isLoading, isError } = getCollection()

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
                    {!isLoading ? (
                            collection.documents.map((product, index) => (
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
