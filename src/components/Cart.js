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
        <br />
        <div className="container">
            <div className="painting-list">
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
            <div className="column is-12 is-clearfix">
                <br />
                <div className="is-pulled-right">
                    <button
                        className="button is-success"
                        onClick={props.context.checkout}
                    >
                        Checkout
                    </button>
                </div>
            </div>
            </div>
        </div>
    </>
   ) 
}

export default withContext(Cart)