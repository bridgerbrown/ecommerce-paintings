import React, { useEffect, useState } from "react";
import { useProductContext } from "../data/context/ProductContext";
import ProductItem from "../components/ProductItem"
import Navbar from "../components/Navbar/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase/firebase.config"
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import fetchPaintingData from "../data/fetchPaintingData";
import paintingsMetadata from "../data/paintingsMetadata.json";

export default function ProductList({ paintingsData, productsStock, apiFetchDuration }) {
  const { setProducts, setStock } = useProductContext()

  useEffect(() => {
    setProducts(paintingsData);
    setStock(productsStock);
  }, [paintingsData])

  console.log(apiFetchDuration)

  return (
    <div className="App">
      <Navbar />
      <PageTitle title={"Products"} apiFetchDuration={apiFetchDuration} />     
      <div className="container">
        <div className="painting-list">
          { 
            paintingsData && paintingsData.length ?
              paintingsData.map((painting, index) => (
                <ProductItem
                  painting={painting}
                  id={index}
                  key={index}
                  productsStock={productsStock[index].stock}
                />
              ))
            : (
            <div className="loading-container">
                <span 
                  className="loading"
                  data-testid="productList-loading" 
                >
                    Loading API data...
                </span>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  )
};

export async function getServerSideProps() {
  const startTime = new Date();

  const paintingsData = [];
  for (const painting of paintingsMetadata) {
    try {
      const response = await fetchPaintingData(painting.id);
      paintingsData.push(response);
    } catch (err) {
      console.error("Error at gssp fetchPaintingData" + err);
    }
  };

  const endTime = new Date();
  const duration = endTime - startTime;

  const productsStock = [];
  const stockRef = collection(db, 'paintings');
  const snapshot = await getDocs(stockRef);
  snapshot.forEach((doc) => {
    productsStock.push({ ...doc.data() })
    })
  return {
    props: {
      paintingsData: paintingsData,
      productsStock: productsStock, 
      apiFetchDuration: duration,
    }
  };
};
