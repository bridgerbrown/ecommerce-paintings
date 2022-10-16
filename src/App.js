import './App.css';
import React, { Component } from 'react';
import { Route, Routes, NavLink, BrowserRouter as Router } from "react-router-dom"
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Context from "./Context"
import { signInUser, db, updateProducts, paintingsData } from './Firebase';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      cart: {},
      products: []
    }
    this.routerRef = React.createRef()
  }

  async componentDidMount() {
    let user = {}
    let cart = {}
    let products = paintingsData

    this.setState({ user, products: products, cart })
  }

  login = async (username) => {
    const res = await signInUser()
    .then((cred) => {
      console.log('user created', cred.user)
    })
    .catch((res) => {
      return { status: 401, message: 'Unauthorized'}
    })

    if(res.status === 200) {
      const user = {
        username
      }

      this.setState({ user })
      return true
    } else {
      return false
    }
  }

  logout = e => {
    e.preventDefault()
    this.setState({ user: null })
  }

  addToCart = (product) => {
    setTimeout(() => {
      let newCart = []
      let newStockProducts = []
  
      let indexProd = this.state.products.findIndex((prod) => {
        return prod.id === product.id
      })
  
      if (this.state.products[indexProd].stock > 0) {
        let indexCart = this.state.cart.findIndex((item) => {
          return item.id === product.id
        })
  
        if (indexCart === -1) {
          this.setState({
            cart: this.state.cart.concat([{
              id: product.id,
              name: product.name,
              quantity: 1,
              totalValue: product.price
            },
          ]),
          })
        } else {
          newCart = this.state.cart
  
          newCart[indexCart].quantity = newCart[indexCart].quantity + 1
          newCart[indexCart].totalValue = newCart[indexCart].totalValue + product.price
  
          this.setState({
            cart: newCart
          })
        }
  
        newStockProducts = this.state.products
        newStockProducts[indexProd].stock--
        this.setState({ products: newStockProducts })
      }
    }, 100)
  };


  removeFromCart = (id, quantity) => {
    setTimeout(() => {
      let newCart = this.state.cart

      this.setState({ cart: newCart.filter((item) => item.id !== id)})
      
      let indexProd = this.state.products.findIndex((prod) => {
        return prod.id === id
      })

      let updatedProducts = this.state.products

      updatedProducts[indexProd].stock = 
        updatedProducts[indexProd].stock + parseInt(quantity)

      this.setState({ products: updatedProducts })
    }, 100)
  }

  clearCart = () => {
    let cart = {}
    this.setState({ cart })
  }

  checkout = () => {
    const cart = this.state.cart
    const products = this.state.products

    if (cart.length !== 0) {
      updateProducts(db, products)
        .then(() => {
          console.log("Items Ordered")
          this.setState({ cart: [] })
          alert("Order Placed!")
        })
        .catch((error) => console.error(`Items not updated`, error))
    }

    this.setState({ products })
    this.clearCart()
  }

render() {
  return (
  <Context.Provider
    value={{
      ...this.state,
      removeFromCart: this.removeFromCart,
      addToCart: this.addToCart,
      login: this.login,
      clearCart: this.clearCart,
      checkout: this.checkout,
    }}
  >
    <Router ref={this.routerRef}>
      <div className='App'>
        <nav
          className='navbar container'
          role='navigation'
          aria-label='main navigation'
        >
        <div className='navbar-brand'>
          <b>eCommerce Paintings</b>
          <label
            role='button'
            class='navbar-burger burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={e => {
              e.preventDefault()
              this.setState({ showMenu: !this.state.showMenu })
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </label>
        </div>
            <div className={`navbar-menu ${
              this.state.showMenu ? "is-active" : ""
              }`}>
              <NavLink to="/products" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                Products
              </NavLink>
              <NavLink to="/cart" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                Cart
                <span
                  className='tag is-primary'
                  style={{ marginLeft: "5px" }}
                >
                  { Object.keys(this.state.cart).length }
                </span>
              </NavLink>
              {!this.state.user ? (
                <NavLink to="/login" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                  Login
                </NavLink>
              ) : (
                <NavLink to="/" onClick={this.logout} className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                  Logout
                </NavLink>
              )}
            </div>
          </nav>
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/add-product" element={<AddProduct />} />
            <Route exact path="/products" element={<ProductList />} />
          </Routes>
        </div>
      </Router>
    </Context.Provider>
    );
  }
}
