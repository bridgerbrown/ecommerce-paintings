import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar"
import Details from "../../../components/Details";
import { useProductContext } from "../../../components/context/ProductContext";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../../components/firebase/firebase.config"

export default function ProductTwo({paintings}) {
    const { addToCart, setProducts } = useProductContext()

    useEffect(() => {(
        setProducts(paintings)
    )}, [paintings])

    const product = paintings.filter(item => item.fsid === '7PvHe9DyvGfjkGTxLbYC')[0]

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
    console.log(paintings)
    return {
        props: {
            paintings: paintings,
        }
    }
}