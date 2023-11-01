import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import Cart from "../pages/cart";
import { ProductContext } from "../data/context/ProductContext";


jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockProductContext = {
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
  loaderProp: jest.fn(),
  setCart: jest.fn(),
  setTotal: jest.fn(),
  setNumberOfItems: jest.fn(),
};

const mockEmptyCartProductContext = {
  cart: [],
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
  total: 0,
  numberOfItems: 0,
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  loaderProp: jest.fn(),
  setCart: jest.fn(),
  setTotal: jest.fn(),
  setNumberOfItems: jest.fn(),
};

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

describe('ProductList page', () => {
  beforeEach(async () => {
    mockRouterSetup();
  });

  describe('Checkout functionality', () => {
    it('should checkout item, clearing cart', async () => {
      const { getByTestId, rerender } = render(
        <ProductContext.Provider value={mockProductContext}>
          <Cart />
        </ProductContext.Provider>
      );

      const addedCartItem = getByTestId("product-0-cart-item");
      expect(addedCartItem).toBeInTheDocument();
      const cartTotalAmount = getByTestId("cart-total-amount");
      expect(cartTotalAmount.textContent).toBe("$72,000,000");

      const checkoutButton = getByTestId("checkout-button");
      expect(checkoutButton).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(checkoutButton);
      });

      rerender(
        <ProductContext.Provider value={mockEmptyCartProductContext}>
          <Cart />
        </ProductContext.Provider>
      )

      await waitFor(() => {
        const cartTotalAmount = getByTestId("cart-total-amount");
        expect(cartTotalAmount.textContent).toBe("$0");
      });
    });
  });
});
