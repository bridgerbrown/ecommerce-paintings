import React, { useEffect } from "react";
import { useProductContext } from "../../components/context/ProductContext";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../../components/firebase/firebase.config"
import Navbar from './../../components/Navbar'

export default function ProductDetails({ products, id }) {
    const { setProducts, addToCart, loaderProp } = useProductContext()

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
                        <Image
                            src={product.img}
                            alt={product.shortDesc}
                            sizes="(max-width: 40vw)"
                            loader={loaderProp}
                            loaderProp={loaderProp}
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
                                        price: product.price,
                                        width: product.width,
                                        height: product.height,
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

export async function getServerSideProps(context) {
    const id = context.params.id
    const paintingsRef = collection(db, 'paintings')
    const paintings = []
    const snapshot = await getDocs(paintingsRef)
    snapshot.filter((doc) => {
        paintings.push({ ...doc.data() })
        })
    paintings.filter((product) => product.id === id)
    return {
        props: {
            painting: paintings,
            id: id,
        }
    }
}
