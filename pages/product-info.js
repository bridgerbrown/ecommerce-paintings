import React, { useEffect, useState } from "react";
import { useProductContext } from "../components/context/ProductContext";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../components/firebase/firebase.config"
import Navbar from "../components/Navbar";
import Details from "../components/Details";


export default function ProductDetails({ paintings }) {
    const { infoPage } = useProductContext()
    console.log(paintings)
    
    useEffect(() => {(
        paintings.filter((product) => product.id === infoPage)
    )}, [paintings])

    return (
    <div className="App">
        <Navbar />
        {paintings.map((product, index) => (
        <Details
            product={product}
            key={index}
        />))}
    </div>
    )
}

export async function getServerSideProps() {
    const paintingsRef = collection(db, 'paintings')
    const paintings = []
    const snapshot = await getDocs(paintingsRef)
    snapshot.forEach((doc) => {
        paintings.push({ ...doc.data() })
        })
    return {
        props: {
            paintings: paintings,
        }
    }
}