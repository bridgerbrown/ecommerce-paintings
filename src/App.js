import './App.css';
import React, { Component } from 'react';
import { Route, Routes, NavLink, BrowserRouter as Router } from "react-router-dom"
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Context from "./Context"
import { signInUser, paintingsData, auth, updateProducts, db, updateItem } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      cart: [],
      products: [],
      total: 0,
      numberOfItems: 0
    }
    this.routerRef = React.createRef()
  }

  async componentDidMount() {
    let user = signInUser
    let cart = []
    let total = 0
    let numberOfItems = 0

    const products = paintingsData

    this.setState({ user, products: products, cart, total, numberOfItems })
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


render() {
  return (
  <Context.Provider
    value={{
      ...this.state,
      removeFromCart: this.removeFromCart,
      addToCart: this.addToCart,
      login: this.login,
      checkout: this.checkout,
      checkbox: this.checkbox
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
