import React from "react";
import CartItem from "../components/CartItem"
import { useProductContext } from "../components/context/ProductContext";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";

export default function Cart() {
    const { cart, numberOfItems, total, removeFromCart, checkout } = useProductContext()
   function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function multipleItemCheck() {
        if (numberOfItems) {
            if (numberOfItems === 1) {
                return " item"
            } else {
                return " items"
            }
        } else {
            return 0
        }
    }
    
   return(
    <>
    <div className="App">
        <Navbar />
        <div className="title-container">
            <Image
                src="/rpgbg.jpg"
                width={2000}
                height={400}
                className="bgimg"
                alt='painting page title background'
            />
            <h4 className="page-title">Cart</h4>
        </div>
        <div className="cart-container">
            <div className="cartitems">
                <div className="cartitem-list">
                    <div className="cart-categories">
                        <p>Product</p>
                        <p className="category-price">Price</p>
                    </div>
                {cart && cart.length ? (
                    cart.map((product, index) => (
                            <CartItem
                                product={product}
                                key={index}
                                removeFromCart={removeFromCart}
                            />
                        ))
                ) : (
                    <div className="column">
                        <div className="title has-text-grey-light">No item in cart!</div>
                    </div>
                )}
                </div>
            </div>
            <div className="total-container">
                <h3 className="total-text">Total ({numberOfItems + multipleItemCheck()}):</h3>
                <h3 className="total-amount" id="total-amount">${numberWithCommas(total)}</h3>
                <button
                    className="checkout-button"
                    onClick={checkout}
                >
                    Checkout
                </button>
            </div>
        </div>
        <Footer />
    </div>
       </>
   ) 
}
