import React from 'react'
import { createContext, useContext, useState } from 'react'

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState()
  const [total, setTotal] = useState(0)
  const [numberOfItems, setNumberOfItems] = useState(0)

  const addToCart = (product) => {
      let newCart = [];
      let updatedProducts = [];
      let indexProd = products.findIndex((prod) => {
        return prod.id === product.id;
      });

      let correctNumber = product.price.replace(/,/g,'').replace(/\$/g,'')
      let newTotal = Number(total) + Number(correctNumber)

      if (products[indexProd].stock > 0) {
        let indexCart = cart.findIndex((item) => {
          return item.id === product.id;
        });

        if (indexCart === -1) {
          setCart(
            cart.concat([
              {
                id: product.id,
                title: product.title,
                img: product.img,
                link: product.link,
                description: product.description,
                medium: product.medium,
                artist: product.artist,
                quantity: 1,
                price: product.price,
                route: product.route,
                fsid: product.fsid,
                stock: product.stock,
              }
            ])
          )
          setTotal(newTotal)
        } else {
          newCart = cart;
          newCart[indexCart].quantity = newCart[indexCart].quantity + 1;
          setCart(newCart)
          setTotal(newTotal)
        }

        updatedProducts = products;
        updatedProducts[indexProd].stock--;
        setProducts(updatedProducts)
        setTotal(newTotal)
        setNumberOfItems(numberOfItems + 1)
      }
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
