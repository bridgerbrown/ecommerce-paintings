import './App.css';
import React, { Component } from 'react';
import { Route, Routes, NavLink, BrowserRouter as Router } from "react-router-dom"
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import About from './components/About'
import ProductList from './components/ProductList';
import User from './components/User';
import Context from "./Context"
import { signInUser, paintingsData, auth, updateProducts, db, updateItem, authChange } from './Firebase';
import ProductItem from './components/ProductItem';
import ProductDetails from './components/ProductDetails'
import { getIdToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      usertoken: [],
      cart: [],
      products: [],
      total: 0,
      numberOfItems: 0,
      loaded: false,  
      value: ''
    }
    this.routerRef = React.createRef()
  }

  async componentDidMount() {
    let user = null
    let cart = []
    let total = 0
    let numberOfItems = 0
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    const products = paintingsData

    this.setState({ user, cart, total, numberOfItems })
    setTimeout(() => {
      this.setState({products: products})
    }, 2000);
  }

  login = async (username) => {
    signInAnonymously(auth)
    authChange(username)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user)
        this.setState({ usertoken: this.state.usertoken + token})
      }
    })
    this.setState({ user: username })
    console.log(this.state.usertoken)
  }

  logout = e => {
    e.preventDefault()
    this.setState({ user: null, usertoken: null })
  }

   addToCart = (product) => {
    setTimeout(() => {
      let newCart = [];
      let updatedProducts = [];

      /* Check Stock */
      let indexProd = this.state.products.findIndex((prod) => {
        return prod.id === product.id;
      });

      let correctNumber = product.price.replace(/,/g,'').replace(/\$/g,'')
      let newTotal = Number(this.state.total) + Number(correctNumber)

      if (this.state.products[indexProd].stock > 0) {
        let indexCart = this.state.cart.findIndex((item) => {
          return item.id === product.id;
        });

        /* Add product to cart */
        if (indexCart === -1) {
          /*New item */
          this.setState({
            cart: this.state.cart.concat([
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
          newCart = this.state.cart;
          newCart[indexCart].quantity = newCart[indexCart].quantity + 1;

          this.setState({
            cart: newCart,
            total: newTotal
          });
        }

        /* Update Stock */
        updatedProducts = this.state.products;

        updatedProducts[indexProd].stock--;

        this.setState({ products: updatedProducts, total: newTotal, numberOfItems: this.state.numberOfItems + 1 });
      }
    }, 100);
  };

  removeFromCart = (id, quantity) => {
    setTimeout(() => {
      let newCart = this.state.cart;

      /* Delete item */
      this.setState({ cart: newCart.filter((item) => item.id !== id) });

      let indexProd = this.state.products.findIndex((prod) => {
        return prod.id === id;
      });

      let updatedProducts = this.state.products;

      updatedProducts[indexProd].stock =
        updatedProducts[indexProd].stock + parseInt(quantity);

      this.setState({ products: updatedProducts });
    }, 100);
  };

  checkout = () => {
    const cart = this.state.cart;
    const products = this.state.products

    if (cart.length !== 0) {
          console.log("Successful items update");
          this.setState({ cart: [], total: 0, numberOfItems: 0 });
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
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ user: this.state.value })
  }

render() {
  return (
  <Context.Provider
    value={{
      ...this.state,
      removeFromCart: this.removeFromCart,
      addToCart: this.addToCart,
      login: this.login,
      checkout: this.checkout,
      checkbox: this.checkbox,
      handleSubmit: this.handleSubmit,
      handleChange: this.handleChange
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
              <NavLink to="/about" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                About
              </NavLink>
              <NavLink to="/user" className={({ isActive }) => 
                      (isActive ? "active-nav navbar-item" : "navbar-item")}>
                 {this.state.user}
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
            <Route exact path="/user" element={<User />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/add-product" element={<AddProduct />} />
            <Route exact path="/products" element={<ProductList />} />
            <Route path="/:title" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </Context.Provider>
    );
  }
}
