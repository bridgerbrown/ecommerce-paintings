import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import Navbar from "../components/Navbar/Navbar";
import { ProductProvider, useProductContext } from "../data/context/ProductContext";
import { mockProductContext } from "./MockProductContext";
import Cart from "../pages/cart";


jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/ProductContext', () => ({
  useProductContext: () => ({
    cart: [
      {
        id: 0,
        title: "Self-Portrait",
        img: "/AIC.jpg",
        link: "https://www.artic.edu",
        description: "In 1886 Vincent...",
        medium: "Oil on artist's board",
        artist: "Vincent van Gogh",
        quantity: 1,
        price: "$72,000,000",
        route: "vincent-van-gogh/self-portrait",
        fsid: 0,
        stock: 1,
        width: 388,
        height: 388,
      },
    ],
    products: [
      {
        artist: "Vincent van Gogh",
        date: 1887,
        description: "In 1886 Vincent...",
        fsid: 0,
        height: 493,
        id: 0,
        img: "/AIC.jpg",
        img_full: "https://www.artic.edu",
        link: "https://www.artic.edu",
        medium: "Oil on artist's board",
        place: "Paris",
        price: "$72,000,000",
        route: "vincent-van-gogh/self-portrait",
        stock: 1,
        title: "Self-Portrait",
        width: 388,
        height: 388,
      },
    ],
    total: 72000000,
    numberOfItems: 1,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    checkout: jest.fn(),
    loaderProp: jest.fn(),
  })
}));

jest.mock('../data/context/AuthUserContext', () => ({
  useAuth: () => ({
    user: {
      email: "example@gmail.com",
      uid: 0,
    },
    setUser: jest.fn(),
    loading: true,
    setLoading: jest.fn(),
  }),
}));

const mockRouterSetup = () => {
  mockRouter.push('/cart');
};

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    mockRouterSetup();
  });
});

describe('Navbar component', () => {
  it('should render', () => {
    const { getByTestId } = render(
        <Navbar />
    );
    const navbarLogo = getByTestId("navbar-logo");
    expect(navbarLogo.alt).toBe("paint palette icon");
  });
});

describe('ProductList page', () => {
  beforeEach(async () => {
    mockRouterSetup();
  });

  describe('Checkout functionality', () => {
    it('should checkout item, clearing cart', async () => {
      const { getByTestId } = render(
          <Cart />
      );

      const addedCartItem = getByTestId("product-0-cart-item");
      expect(addedCartItem).toBeInTheDocument();
      const cartTotalAmount = getByTestId("cart-total-amount");
      expect(cartTotalAmount.textContent).toBe("$72,000,000");

      const checkoutButton = getByTestId("checkout-button");
      expect(checkoutButton).toBeInTheDocument();

      act(() => {
        fireEvent.click(checkoutButton);
      });

      await waitFor(() => {
        const navbarCartNumber = getByTestId("navbar-cart-number");
        expect(navbarCartNumber.textContent).toBe("Cart (0)");
      });
    });
  });
});
