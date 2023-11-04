import React from 'react'
import { createContext, useContext, useState } from 'react'

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState();
  const [total, setTotal] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const addToCart = (product) => {
    let newCart = [];
    const correctNumber = product.price.replace(/,/g,'').replace(/\$/g,'');
    const newTotal = Number(total) + Number(correctNumber);

    if (stock[product.id].stock > 0) {
      let productCartIndex = cart.findIndex((item) => {
        return item.id === product.id;
      });

      if (productCartIndex === -1) {
        setCart(cart.concat([{...product, quantity: 1}]));
      } else {
        newCart = cart;
        newCart[productCartIndex].quantity += 1;
        setCart(newCart);
      }

      stock[product.id].stock--;
      setTotal(newTotal);
      setNumberOfItems(numberOfItems + 1);
    }
  };

  const removeFromCart = (product) => {
    let newCart = cart;
    const cartIndex = cart.findIndex((item) => item.id === product.id);
    setCart(newCart.filter((item) => item.id !== product.id));
    setNumberOfItems(numberOfItems - cart[cartIndex].quantity);

    const correctNumber = product.price.replace(/,/g,'').replace(/\$/g,'');
    const newTotal = total - (correctNumber * product.quantity);
    setTotal(newTotal);
  };

  return (
    <ProductContext.Provider
      value={{
        cart: cart,
        setCart: setCart,
        setProducts: setProducts,
        stock: stock,
        setStock: setStock,
        total: total,
        setTotal: setTotal,
        numberOfItems: numberOfItems,
        setNumberOfItems: setNumberOfItems,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
    return useContext(ProductContext)
}
