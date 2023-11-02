import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../pages/index";
import { ProductProvider } from "../data/context/ProductContext";
import { mockProducts } from "./mockProducts";

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
  mockRouter.push('/');
};

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    mockRouterSetup();
  });
});

describe('Navbar component', () => {
  it('should render', () => {
    const { getByTestId } = render(
      <ProductProvider>
        <Navbar />
      </ProductProvider>
    );
    const navbarLogo = getByTestId("navbar-logo");
    expect(navbarLogo.alt).toBe("paint palette icon");
  });
});

describe('ProductList page', () => {
  beforeEach(() => {
    mockRouterSetup();
  });

  it('should render ProductItem components for each product', async () => {
    const renderedComponent = render(
      <ProductProvider>
        <ProductList paintings={mockProducts} />
      </ProductProvider>
    );

    await act( async () => {
      await new Promise(resolve => setTimeout(resolve, 1700));
    });

    const { getAllByTestId } = renderedComponent;
    const productItems = getAllByTestId(/^productItem-\d+$/);
    expect(productItems.length).toBe(mockProducts.length);
  });


  describe('ProductItem functionality', () => {
    let renderedComponent;

    beforeEach(async () => {
      renderedComponent = render(
        <ProductProvider>
          <ProductList paintings={mockProducts} />
        </ProductProvider>
      );
      await act( async () => {
        await new Promise(resolve => setTimeout(resolve, 1700));
      });
    });


    it('should render first product', async () => {
      const { getByTestId } = renderedComponent;
      const firstProduct = getByTestId('productItem-0');
      const title = mockProducts[0].title;

      expect(firstProduct).toHaveTextContent(title);
    });


    it('should add product to cart in ProductContext', async () => {
      const { getByTestId } = renderedComponent;

      const addToCartButton = getByTestId('productItem-0-addToCart');
      expect(addToCartButton).toBeInTheDocument();

      await act( async () => {
        fireEvent.click(addToCartButton);
      });
      
      await waitFor(() => {
        const navbarCartNumber = getByTestId("navbar-cart-number");
        expect(navbarCartNumber.textContent).toBe("Cart (1)");
      });
    });


    it('should deduct from stock when adding to cart', async () => {
      const { getByTestId } = renderedComponent;

      const addToCartButton = getByTestId('productItem-1-addToCart');
      expect(addToCartButton).toBeInTheDocument();

      await act( async () => {
        fireEvent.click(addToCartButton);
      });
      
      await waitFor(() => {
        const productItemStock = getByTestId("productItem-1-stock");
        expect(productItemStock.textContent).toBe("44 Available");
      });
    });
  });
});
