import React from 'react'
import { createContext, useContext, useState } from 'react'
import { addToCartStockUpdate, removeFromCartStockUpdate } from '../firebase/stockUpdate';

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
    // addToCartStockUpdate(product, stock[product.id].stock);
  };

  const removeFromCart = (product) => {
      let newCart = cart;
      setCart(newCart.filter((item) => item.id !== product.id))

      let indexProd = products.findIndex((prod) => {
        return prod.id === product.id;
      });

      let updatedProducts = products;

      let correctNumber = updatedProducts[indexProd].price.replace(/,/g,'').replace(/\$/g,'')

      let newTotal = total - (correctNumber * product.quantity)

      updatedProducts[indexProd].stock =
        updatedProducts[indexProd].stock + parseInt(product.quantity);

      setProducts(updatedProducts)
      setNumberOfItems(0)

      console.log(newTotal)
      setTotal(newTotal)
    // removeFromCartStockUpdate(product);
  };

  const loaderProp =({ src }) => {
    return src;
  }


  return (
    <ProductContext.Provider
      value={{
        cart: cart,
        setCart: setCart,
        setProducts: setProducts,
        stock: stock,
        setStock: setStock,
        total: total,
        numberOfItems: numberOfItems,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        loaderProp: loaderProp
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
    return useContext(ProductContext)
}
