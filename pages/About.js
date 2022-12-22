import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image"
import { useProductContext } from "../components/context/ProductContext";

export default function About() {
    const { loaderProp } = useProductContext()
    return(
        <>
        <div className="App">
            <Navbar />
            <div className="title-container">
                <h4 className="page-title">About</h4>
            </div>
            <div className="about-container">
                <div className="about-text">
                    <figure className="about-image">
                        <Image 
                            src="/AIC.png" 
                            alt="art institute of chicago logo" 
                            width={200}
                            height={200}
                            loader={loaderProp}
                            />
                    </figure>
                    <div className="about-info">
                        <p>
                        This project was made using React router, React context,
                        Firebase Firestore database, Firebase user authentication and 
                        the art database of the Art Institute of Chicago's public API. 
                        The ARTIC has an excellent collection of some of the most renowned pieces and collections which I narrowed
                        down to a few that stuck out to me and were public domain.
                        </p>
                        <a href="https://www.artic.edu/open-access/public-api">More Info</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
