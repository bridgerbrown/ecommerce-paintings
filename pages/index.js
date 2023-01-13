import React, { useEffect, useState } from "react";
import { useProductContext } from "../components/context/ProductContext";
import ProductItem from "../components/ProductItem"
import Navbar from "../components/Navbar/Navbar";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../components/firebase/firebase.config"
import Image from "next/image";
import Footer from "../components/Footer";

export default function ProductList({ paintings }) {
    const { addToCart, setProducts, loaderProp } = useProductContext()

    useEffect(() => {(
        setProducts(paintings)
    )}, [paintings])

    return(
        <>
        <div className="App">
            <Navbar />
            <div className="title-container">
                <Image
                    src="/bdgbg.jpg"
                    width={2000}
                    height={400}
                    className="bgimg"
                    alt='painting page title background'
                />
                <h4 className="page-title">Products</h4>
            </div>
            <br />
            <div className="container">
                <div className="painting-list">
                    {paintings && paintings.length ? (
                        paintings.map((product, index) => (
                            <ProductItem
                                product={product}
                                key={index}
                                addToCart={addToCart}
                                loaderProp={loaderProp}
                            />
                        ))
                    ) : (
                        <div className="loading-container">
                            <span className="loading">
                                Loading...
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
    const paintingsRef = collection(db, 'paintings')
    const paintings = []
    const snapshot = await getDocs(paintingsRef)
    snapshot.forEach((doc) => {
        paintings.push({ ...doc.data() })
        })
    console.log(paintings)
    return {
        props: {
            paintings: paintings
        }
    }
}