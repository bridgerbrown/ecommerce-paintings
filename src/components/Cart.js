import React from "react";
import withContext from "../withContext";
import CartItem from "./CartItem"

const Cart = props => {
   const { cart } = props.context

   function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function multipleItemCheck() {
        if (props.context.numberOfItems) {
            if (props.context.numberOfItems === 1) {
                return " item"
            } else {
                return " items"
            }
        } else {
            return 0
        }
    }


   console.log(cart)
   return(
    <>
    <div className="title-container">
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
            <h3>Total ({props.context.numberOfItems + multipleItemCheck()}): ${numberWithCommas(props.context.total)}</h3>
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