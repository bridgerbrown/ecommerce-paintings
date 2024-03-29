import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem"
import { useProductContext } from "../data/context/ProductContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase/firebase.config"

export default function Cart({ productsStock }) {
  const { cart, numberOfItems, total, removeFromCart, setNumberOfItems, setCart, setTotal } = useProductContext()
  const [checkedOut, setCheckedOut] = useState(false);

  function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

  function multipleItemCheck() {
    return numberOfItems ? numberOfItems === 1 ? " item" : " items" : 0;
  };

  useEffect(() => {
  }, [checkedOut]);
    
  function cartCheckout() {
    setCart([]);
    setTotal(0);
    setNumberOfItems(0);
    setCheckedOut(true);
    alert("Successfuly ordered!");
  }

  return(
    <div className="App">
      <Navbar />
      <PageTitle title={"Cart"} /> 
      <div className="cart-container">
        <div className="cartitems">
          <div className="cartitem-list">
            <div className="cart-categories">
              <p>Product</p>
              <p className="category-price">Price</p>
            </div>
          { cart && cart.length ? (
            cart.map((product, index) =>
              <CartItem
                product={product}
                key={index}
                removeFromCart={removeFromCart}
                productsStock={productsStock[index].stock}
              />
            )) 
            : 
            <div className="column">
              <div className="title has-text-grey-light">No item in cart!</div>
            </div>
          }
          </div>
        </div>
        <div className="total-container">
          <h3 
            className="total-text"
          >
            Total ({numberOfItems + multipleItemCheck()}):
          </h3>
          <h3 
            className="total-amount" 
            id="total-amount"
            data-testid="cart-total-amount"
          >
            ${numberWithCommas(total)}
          </h3>
          <button
            className="checkout-button"
            onClick={cartCheckout}
            data-testid="checkout-button"
          >
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </div>
)};

export async function getServerSideProps() {
  const productsStock = [];
  const stockRef = collection(db, 'paintings');
  const snapshot = await getDocs(stockRef);
  snapshot.forEach((doc) => {
    productsStock.push({ ...doc.data() })
    })
  return {
    props: {
      productsStock: productsStock, 
    }
  };
};
