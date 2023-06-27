import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar"
import Details from "../../../components/Details";
import { useProductContext } from "../../../components/context/ProductContext";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../../components/firebase/firebase.config"

export default function ProductNine({paintings}) {
    const { addToCart, setProducts } = useProductContext()

    useEffect(() => {(
        setProducts(paintings)
    )}, [paintings])

    const product = paintings.filter(item => item.fsid === 'nmQ02bO5PJ0J9BKh8cJU')[0]

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
