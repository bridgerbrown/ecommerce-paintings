import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../pages/index";
import { ProductProvider } from "../data/context/ProductContext";

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
  const mockProducts = [
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
      stock: 60,
      title: "Self-Portrait",
      width: 388,
    },
  ];

  beforeEach(async () => {
    mockRouterSetup();
  
    render(
      <ProductProvider>
        <ProductList paintings={mockProducts} />
      </ProductProvider>
    );
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 1700));
    });

    const addToCartButton = getByTestId('productItem-0-addToCart');
    expect(addToCartButton).toBeInTheDocument();

    fireEvent.click(addToCartButton);
    
    await waitFor(() => {
      const navbarCartNumber = getByTestId("navbar-cart-number");
      expect(navbarCartNumber.textContent).toBe("Cart (1)");
    });
    
    mockRouter.push("/cart");
  });
});

