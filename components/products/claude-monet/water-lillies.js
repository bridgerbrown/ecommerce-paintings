import React from "react";
import Navbar from "../../Navbar";
import Details from "../../Details";
import { useProductContext } from "../../context/ProductContext";
import getDocument from '../../firebase/getDocument'

export default function ProductOne() {
    const { addToCart } = useProductContext()
    const { document, isLoading } = getDocument(`17pdhqPmbOR4Df9WcBZR`)

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