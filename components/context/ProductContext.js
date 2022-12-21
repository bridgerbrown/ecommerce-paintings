import React, { createContext, useContext, useEffect, useState } from 'react'
import getDocument from '../firebase/getDocument';
import "../firebase/firebase.config"
import useSWR, { mutate } from 'swr'

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [numberOfItems, setNumberOfItems] = useState(0)

  async function updateStock(url, { newStock }) {
    await fetch(url, {
      method: 'POST',
      fields: {
        stock: {
          integerValue: newStock
        }
      }
    })
  }

  const addToCart = (product) => {
    let newCart = [];
    let correctNumber = product.fields.price.stringValue.replace(/,/g,'').replace(/\$/g,'')
    let newTotal = Number(total) + Number(correctNumber)

    if (product.stock > 0) {
      let indexCart = cart.findIndex((item) => {
        return item.id === product.id;
      });

      if (indexCart === -1) {
        setCart(
          cart.concat([
            {
              id: product.fields.id.integerValue,
              title: product.fields.title.stringValue,
              img: product.fields.img.stringValue,
              link: product.fields.link.stringValue,
              description: product.fields.description.stringValue,
              medium: product.fields.medium.stringValue,
              artist: product.fields.artist.stringValue,
              quantity: 1,
              price: product.fields.price.stringValue,
              width: product.fields.width.integerValue,
              height: product.fields.height.integerValue,
              stock: product.fields.stock.integerValue,
              fsid: product.fields.fsid.stringValue,
              date: product.fields.date.stringValue,
              place: product.fields.place.stringValue,
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
      
      const fetcher = async () => {
        const response = await fetch(`https://firestore.googleapis.com/v1/projects/ecommerce-f2425/databases/(default)/documents/paintings/${product.fields.fsid.stringValue}`)
        const data = await response.json()
        return data
    }
      const { data, mutate } = useSWR('doc', fetcher)
      const lessStock = data.fields.stock.integerValue--
      mutate({ ...data, lessStock })

      setTotal(newTotal)
      setNumberOfItems(numberOfItems + 1)
    }
};

const removeFromCart = (id, quantity) => {
    let newCart = cart;
    setCart(newCart.filter((item) => item.id !== id))


};

const checkout = () => {
  if (cart.length !== 0) {
        console.log("Successful items update");
        setCart([])
        setTotal(0)
        setNumberOfItems(0)
        alert("Cart Ordered!!!");
  }
};

const loaderProp =({ src }) => {
  return src;
}

  return (
    <ProductContext.Provider
      value={{
        cart: cart,
        total: total,
        numberOfItems: numberOfItems,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        checkout: checkout,
        loaderProp: loaderProp,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
    return useContext(ProductContext)
}
