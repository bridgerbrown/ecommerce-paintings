import React from "react";
import Navbar from "../../Navbar";
import Details from "../../Details";
import { useProductContext } from "../../context/ProductContext";
import getDocument from '../../firebase/getDocument'

export default function ProductSix() {
    const { addToCart } = useProductContext()
    const { document, isLoading } = getDocument(`ac87R2ZvPJggVDrgOZHn`)

    return (
    <div className="App">
        <Navbar />
        <Details 
            product={document} 
            addToCart={addToCart} 
            isLoading={isLoading}
        />
    </div>
    )
}