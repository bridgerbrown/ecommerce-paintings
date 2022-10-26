import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem"

const Cart = props => {
   const { cart } = props.context
   console.log(cart)
   return(
    <>
    <div className="title-container">
        <h4 className="page-title">Cart</h4>
    </div>
    <div className="cart-container">
        <div className="cartitems">
            <div className="cartitem-list">
            {cart && cart.length ? (
                cart.map((product, index) => (
                        <CartItem
                            product={product}
                            key={index}
                            removeFromCart={props.context.removeFromCart}
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
            <button
                className="button"
                onClick={props.context.checkout}
            >
                Checkout
            </button>
        </div>
    </div>
    </>
   ) 
}

export default withContext(Cart)