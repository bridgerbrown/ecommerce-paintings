import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import ProductPage from "../pages/products/[artist]/[painting]";
import { mockProducts } from "./mockProducts";
import { mockProductContext } from "./MockProductContext";
import { ProductContext } from "../data/context/ProductContext";

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
  mockRouter.push(`/products/${mockProducts[0].artist}/${mockProducts[0].title}`);
};

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    mockRouterSetup();
  });
});

describe('Product Details page', () => {
  let renderedComponent;

  beforeEach(async () => {
    mockRouterSetup();
    renderedComponent = render(
      <ProductContext.Provider value={mockProductContext}>
        <ProductPage paintings={mockProducts} />
      </ProductContext.Provider>
    );
  });

  it('should display the products image', () => {
    const { getByTestId } = renderedComponent;
    const detailsImage = getByTestId("details-image");
    expect(detailsImage.alt).toBe(mockProducts[0].shortDesc);
  });

  it('should display the products title', () => {
    const { getByTestId } = renderedComponent;
    const detailsTitle = getByTestId("details-title");
    expect(detailsTitle.textContent).toBe(mockProducts[0].title);
  });

  it('should display the products artist', () => {
    const { getByTestId } = renderedComponent;
    const detailsArtist = getByTestId("details-artist");
    expect(detailsArtist.textContent).toBe(mockProducts[0].artist);
  });

  it('should display the products date', () => {
    const { getByTestId } = renderedComponent;
    const detailsDate = getByTestId("details-date");
    expect(detailsDate.textContent).toBe(mockProducts[0].date.toString());
  });

  it('should display the products medium', () => {
    const { getByTestId } = renderedComponent;
    const detailsMedium = getByTestId("details-medium");
    expect(detailsMedium.textContent).toBe(mockProducts[0].medium);
  });

  it('should display the products place', () => {
    const { getByTestId } = renderedComponent;
    const detailsPlace = getByTestId("details-place");
    expect(detailsPlace.textContent).toBe(mockProducts[0].place);
  });

  it('should display the products description', () => {
    const { getByTestId } = renderedComponent;
    const detailsDescription = getByTestId("details-description");
    expect(detailsDescription.textContent).toBe(mockProducts[0].description);
  });

  it('should display the products price', () => {
    const { getByTestId } = renderedComponent;
    const detailsPrice = getByTestId("details-price");
    expect(detailsPrice.textContent).toBe(mockProducts[0].price);
  });

  it('should display the products stock', () => {
    const { getByTestId } = renderedComponent;
    const detailsStock = getByTestId("details-stock");
    expect(detailsStock.textContent).toBe(mockProducts[0].stock.toString() + " Available");
  });
});
