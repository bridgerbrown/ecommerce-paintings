import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import { useProductContext } from "../data/context/ProductContext";
import Navbar from "../components/Navbar/Navbar";
import ProductList from "../pages";

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/ProductContext', () => ({
  useProductContext: () => ({
    cart: [],
    setCart: jest.fn(),
    products: [],
    setProducts: jest.fn(),
    total: 0,
    setTotal: jest.fn(),
    numberOfItems: 0,
    setNumberOfItems: jest.fn(),
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

describe('ProductItem components', () => {
  let renderedComponent;

  const mockProducts = [
    {
      artist: "Vincent van Gogh",
      date: 1887,
      description: "In 1886 Vincent...",
      fsid: 0,
      height: 493,
      id: 0,
      img: "https://www.artic.edu",
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
      img: "https://www.artic.edu",
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
      img: "https://www.artic.edu",
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

  beforeEach(() => {
    mockRouterSetup();
  });

  it('should render ProductItem components for each product', async () => {
    const { getAllByTestId } = render(<ProductList paintings={mockProducts} />);
    const productItems = getAllByTestId(/^product-\d+$/);
    expect(productItems.length).toBe(mockProducts.length);
  })
})
