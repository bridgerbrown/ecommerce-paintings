import React, { useEffect, useState } from "react";
import { useProductContext } from "../data/context/ProductContext";
import ProductItem from "../components/ProductItem"
import Navbar from "../components/Navbar/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase/firebase.config"
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";
import fetchPaintingData from "../data/fetchPaintingData";
import paintingIds from "../data/paintingIds.json";

export default function ProductList({ paintingsData, paintingsStocks }) {
  const { addToCart, setProducts, loaderProp } = useProductContext()
  const [loading, setLoading] = useState(true);

  console.log(paintingsData, paintingsStocks);

  useEffect(() => {
  }, [paintingsData])

  return(
    <>
      <div className="App">
          <Navbar />
          <PageTitle title={"Products"} />     
          <div className="container">
              <div className="painting-list">
                  { !loading ? (
                      paintingsData && paintingsData.length ?
                        paintingsData.map((product, index) => (
                            <ProductItem
                                product={product}
                                key={index}
                                addToCart={addToCart}
                                loaderProp={loaderProp}
                            />
                        ))
                        :
                        <span></span>
                  ) : (
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
  </>
  )
}

export async function getServerSideProps() {
  const paintingsData = [];
  for (const painting of paintingIds) {
    try {
      const response = await fetchPaintingData(painting.id);
      paintingsData.push(response);
    } catch (err) {
      console.error("Error at gssp fetchPaintingData" + err);
    }
  };

  const paintingsStocks = [];
  const paintingsRef = collection(db, 'paintings');
  const snapshot = await getDocs(paintingsRef);
  snapshot.forEach((doc) => {
    paintingsStocks.push({ ...doc.data() })
    })
  return {
    props: {
      paintingsData: paintingsData,
      paintingsStocks: paintingsStocks
    }
  };
};
