import React, { useEffect } from 'react'
import { createContext, useContext, useState } from 'react'

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState()
  const [total, setTotal] = useState(0)
  const [numberOfItems, setNumberOfItems] = useState(0)
  const [loaded, setLoaded] = useState(false)


  const addToCart = (product) => {
  setTimeout(() => {
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
              price: product.price
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
  }, 100);
};

const removeFromCart = (id, quantity) => {
  setTimeout(() => {
    let newCart = cart;
    setCart(newCart.filter((item) => item.id !== id))

    let indexProd = products.findIndex((prod) => {
      return prod.id === id;
    });

    let updatedProducts = products;
    updatedProducts[indexProd].stock =
      updatedProducts[indexProd].stock + parseInt(quantity);

    setProducts(updatedProducts)
  }, 100);
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

const checkbox = () => {
  const totalAmount = document.getElementById("total-amount")
  const freeText = document.getElementById("free")
  const checkbtn = document.querySelector("input");
  checkbtn.addEventListener('click', function() {
      if (checkbtn.checked) {
          totalAmount.classList.add("crossout")
          freeText.style.display = "inherit"
      } else {
          totalAmount.classList.remove("crossout")
          freeText.style.display = "none"
      }
  })
}

  return (
    <ProductContext.Provider
      value={{
        cart: cart,
        setProducts: setProducts,
        total: total,
        numberOfItems: numberOfItems,
        loaded: loaded,
        setLoaded: setLoaded,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        checkout: checkout,
        checkbox: checkbox,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
    return useContext(ProductContext)
}
