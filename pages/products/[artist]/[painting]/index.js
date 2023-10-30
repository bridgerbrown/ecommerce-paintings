import React, { useEffect } from "react";
import Navbar from "../../../../components/Navbar/Navbar"
import Details from "../../../../components/Details";
import { useProductContext } from "../../../../data/context/ProductContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../data/firebase/firebase.config"
import { useRouter } from "next/router";

export default function ProductPage({paintings}) {
    const router = useRouter();
    const { artist, painting } = router.query;
    const { addToCart, setProducts } = useProductContext()

    useEffect(() => {(
        setProducts(paintings)
    )}, [paintings])

    const product = paintings.filter(item => item.painting === painting)[0]

    return (
    <div className="App">
        <Navbar />
        <Details 
            product={product} 
            addToCart={addToCart}
        />
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
