import React from "react";
import Navbar from "../../Navbar";
import Details from "../../Details";
import { useProductContext } from "../../context/ProductContext";
import getDocument from '../../firebase/getDocument'

export default function ProductNine() {
    const { addToCart } = useProductContext()
    const { document, isLoading } = getDocument(`nmQ02bO5PJ0J9BKh8cJU`)

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