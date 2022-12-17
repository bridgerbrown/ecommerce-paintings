import React, { useEffect } from "react";
import { useProductContext } from "../../components/context/ProductContext";
import { useRouter } from 'next/router'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, docs } from "firebase/firestore";
import { firebaseConfig } from "./../../components/firebase/firebase.config"
import Navbar from './../../components/Navbar'

export default function ProductDetails({ products }) {
    const { setProducts, addToCart } = useProductContext()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        setProducts(products)
    }, [products])

    return(
    <div className="App">
        <Navbar />
        {useEffect(() => {
            return (
            products.filter((product) => product.id === id )
            .map((product, index) => (
                <div className="info-container" key={index}>
                    <div className="info-image">
                        <img 
                            src={product.img}
                            alt={product.shortDesc}
                        />
                    </div>
                    <div className="info">
                        <div className="info-text">
                            <h1 className="info-title">
                                {product.title}
                            </h1>
                            <h2 className="info-artist">{product.artist}</h2>
                            <h4>{product.date}</h4>
                            <h4>{product.medium}</h4>
                            <h4>{product.place}</h4>
                            <p>{product.description}</p>
                            <div className="info-stock-price">
                                <h2 className="info-price">{product.price}</h2>
                                {product.stock > 0 ? (
                                <small className="info-stock">{product.stock + " Available"}</small>
                                ) : (
                                <small className="out-of-stock">Out Of Stock</small>
                                )}
                            </div>
                        </div>
                        <div className="info-buttons">
                            <button
                                className="add-to-cart"
                                onClick={() => 
                                    addToCart({
                                        id: product.id,
                                        title: product.title,
                                        img: product.img,
                                        link: product.link,
                                        description: product.description,
                                        medium: product.medium,
                                        artist: product.artist,
                                        quantity: 1,
                                        stock: product.stock,
                                        price: product.price
                                    })
                                }
                            >
                                Add to Cart
                            </button>
                            <a href={product.link} target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                </div>
                ))
                )
            }, [])
        }
    </div>
    )
}

export async function getStaticProps() {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const paintingsRef = collection(db, 'paintings');
    const snapshot = await getDocs(paintingsRef);
    const paintings = [];
    snapshot.docs.forEach((doc) => {
      paintings.push({ ...doc.data(), id: doc.id })
    });
    return {
      props: {
        products: paintings
      }
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '1'} },
            { params: { id: '2'} },
            { params: { id: '3'} },
            { params: { id: '4'} },
            { params: { id: '5'} },
            { params: { id: '6'} },
            { params: { id: '7'} },
            { params: { id: '8'} },
            { params: { id: '9'} },
            { params: { id: '10'} },
            { params: { id: '11'} },
            { params: { id: '12'} },    
        ],
        fallback: true,
    }
}