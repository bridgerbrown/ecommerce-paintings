import React from "react";
import Navbar from "../../Navbar";
import Details from "../../Details";
import { useProductContext } from "../../context/ProductContext";
import getDocument from '../../firebase/getDocument'

export default function ProductFour() {
    const { addToCart } = useProductContext()
    const { document, isLoading } = getDocument(`N71IbYnia1DWOZiqYH1i`)

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