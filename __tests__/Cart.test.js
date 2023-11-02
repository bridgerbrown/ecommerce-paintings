import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import Cart from "../pages/cart";
import { ProductContext } from "../data/context/ProductContext";
import { mockProductContext, mockEmptyCartProductContext } from "mockProductContext";

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

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
