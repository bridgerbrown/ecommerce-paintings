import './App.css';
import React, { Component } from 'react';
import { Route, Routes, Link, BrowserRouter as Router } from "react-router-dom"
import axios from 'axios'
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Context from "./Context"
import { paintingData, signInUser } from './Firebase';

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

    const products = paintingData

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

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.title]) {
      cart[cartItem.title].amount += cartItem.amount;
    } else {
      cart[cartItem.title] = cartItem;
    }
    if (cart[cartItem.title].amount > cart[cartItem.title].product.stock) {
      cart[cartItem.title].amount = cart[cartItem.title].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };


  removeFromCart = cartItemId => {
    let cart = this.state.cart
    delete cart[cartItemId]
    localStorage.setItem("cart", JSON.stringify(cart))
    this.setState({ cart })
  }

  clearCart = () => {
    let cart = {}
    localStorage.removeItem("cart")
    this.setState({ cart })
  }

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login")
      return
    }

    const cart = this.state.cart

    const products = this.state.products.map(p => {
      if (cart[p.title]) {
        p.stock = p.stock - cart[p.title].amount

        axios.put(
          `http://localhost:3001/products/${p.id}`,
          { ...p },
        )
      }
      return p
    })

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
      checkout: this.checkout
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
          <b className='navbar-item is-size-4'>ecommerce</b>
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
              <Link to="/products" className='navbar-item'>
                Products
              </Link>
              <Link to="/cart" className='navbar-item'>
                Cart
                <span
                  className='tag is-primary'
                  style={{ marginLeft: "5px" }}
                >
                  { Object.keys(this.state.cart).length }
                </span>
              </Link>
              {!this.state.user ? (
                <Link to="/login" className='navbar-item'>
                  Login
                </Link>
              ) : (
                <Link to="/" onClick={this.logout} className="navbar-item">
                  Logout
                </Link>
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
