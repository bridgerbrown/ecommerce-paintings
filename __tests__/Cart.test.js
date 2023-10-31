import React from "react";
import { render, fireEvent, waitFor, getByTestId, queryByTestId } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../pages/index";
import ProductItem from "../components/ProductItem";

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/ProductContext', () => ({
  useProductContext: () => ({
    cart: [],
    setProducts: jest.fn(),
    total: 0,
    numberOfItems: 0,
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    checkout: jest.fn(),
    loaderProp: jest.fn(),
  }),
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
  mockRouter.push('/');
};

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    mockRouterSetup();
  });
});

describe('Navbar component', () => {
  it('should render', () => {
    const { getByTestId } = render(<Navbar />);
    const navbarLogo = getByTestId("navbar-logo");
    expect(navbarLogo.alt).toBe("paint palette icon");
  });
});

describe('ProductList components', () => {
  beforeEach(() => {
    mockRouterSetup();
  });

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
    {
      artist: "Leonardo da Vinci",
      date: 1503,
      description: "Mona Lisa is a famous portrait...",
      fsid: 1,
      height: 770,
      id: 1,
      img: "/AIC.jpg",
      img_full: "https://www.artic.edu",
      link: "https://www.artic.edu",
      medium: "Oil on poplar wood",
      place: "Florence",
      price: "$860,000,000",
      route: "leonardo-da-vinci/mona-lisa",
      stock: 45,
      title: "Mona Lisa",
      width: 530,
    },
    {
      artist: "Pablo Picasso",
      date: 1937,
      description: "Guernica is a powerful anti-war mural...",
      fsid: 2,
      height: 349,
      id: 2,
      img: "/AIC.jpg",
      img_full: "https://www.artic.edu",
      link: "https://www.artic.edu",
      medium: "Oil on canvas",
      place: "Paris",
      price: "$200,000,000",
      route: "pablo-picasso/guernica",
      stock: 30,
      title: "Guernica",
      width: 776,
    },
  ];

  it('should render ProductItem components for each product', async () => {
    const renderedComponent = render(<ProductList paintings={mockProducts} />);

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
      renderedComponent = render(<ProductList paintings={mockProducts} />);
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

    it('should addToCart in ProductContext', async () => {
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
  });
});
