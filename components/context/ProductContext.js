import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export function AppWrapper({ children }) {
        const [user, setUser] = useState(null)
        const [usertoken, setUsertoken] = useState()
        const [cart, setCart] = useState()
        const [products, setProducts] = useState()
        const [total, setTotal] = useState(0)
        const [numberOfItems, setNumberOfItems] = useState(0)
        const [loaded, setLoaded] = useState(false)
        const [value, setValue] = useState()
        const [loggedIn, setLoggedIn] = useState(false)
    
    useEffect(() => {
        let handleSubmit = handleSubmit.bind()
        let handleChange = handleChange.bind()
    
        const products = paintingsData
    
        setTimeout(() => {
          setProducts(products)
        }, 2000);  
    }, [])
  
    login = async (username) => {
        signInAnonymously(auth)
        authChange(username)
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const token = await getIdToken(user)
            setState({ usertoken: state.usertoken + token})
          }
        })
        setState({ user: username, loggedIn: true })
        console.log(state.usertoken)
      }
    
      logout = e => {
        e.preventDefault()
        setState({ user: null, usertoken: null, loggedIn: false })
      }
    
       addToCart = (product) => {
        setTimeout(() => {
          let newCart = [];
          let updatedProducts = [];
    
          /* Check Stock */
          let indexProd = products.findIndex((prod) => {
            return prod.id === product.id;
          });
    
          let correctNumber = product.price.replace(/,/g,'').replace(/\$/g,'')
          let newTotal = Number(total) + Number(correctNumber)
    
          if (products[indexProd].stock > 0) {
            let indexCart = cart.findIndex((item) => {
              return item.id === product.id;
            });
    
            /* Add product to cart */
            if (indexCart === -1) {
              /*New item */
              setState({
                cart: cart.concat([
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
                  },
                ]),
                total: newTotal
              });
            } else {
              /* Existing item */
              newCart = cart;
              newCart[indexCart].quantity = newCart[indexCart].quantity + 1;
    
              setState({
                cart: newCart,
                total: newTotal
              });
            }
    
            /* Update Stock */
            updatedProducts = products;
    
            updatedProducts[indexProd].stock--;
    
            setState({ products: updatedProducts, total: newTotal, numberOfItems: numberOfItems + 1 });
          }
        }, 100);
      };
    
      removeFromCart = (id, quantity) => {
        setTimeout(() => {
          let newCart = cart;
    
          /* Delete item */
          setState({ cart: newCart.filter((item) => item.id !== id) });
    
          let indexProd = products.findIndex((prod) => {
            return prod.id === id;
          });
    
          let updatedProducts = products;
    
          updatedProducts[indexProd].stock =
            updatedProducts[indexProd].stock + parseInt(quantity);
    
          setState({ products: updatedProducts });
        }, 100);
      };
    
      checkout = () => {
        const cart = cart;
        const products = products
    
        if (cart.length !== 0) {
              console.log("Successful items update");
              setState({ cart: [], total: 0, numberOfItems: 0 });
              alert("Cart Ordered!!!");
        }
      };
    
      checkbox = () => {
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
    
      handleChange(event) {
        setState({value: event.target.value})
      }
    
      handleSubmit(event) {
        event.preventDefault()
        setState({ user: this.state.value })
      }
    return (
        <Context.Provider
        value={{
          login: login,
          handleSubmit: handleSubmit,
          handleChange: handleChange
        }}
      >
        {children}
      </Context.Provider>
    )
}

export function useAppContext() {
    return useContext(Context)
}