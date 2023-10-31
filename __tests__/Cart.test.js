import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import mockRouter from "next-router-mock";
import { useProductContext } from "../data/context/ProductContext";

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/ProductContext.js', () => {
  useProductContext: () => ({

  });
});

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

  })
});

describe('ProductItem components' () => {
  it('should render all products', () => {

  })
})
