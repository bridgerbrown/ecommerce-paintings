import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image"
import { useProductContext } from "../components/context/ProductContext";
import Footer from "../components/Footer";

export default function About() {
    const { loaderProp } = useProductContext()
    return(
        <>
        <div className="App">
            <Navbar />
            <div className="title-container">
                <Image
                    src="/ahbg.jpg"
                    width={2000}
                    height={400}
                    className="bgimg"
                    alt='painting page title background'
                />
                <h4 className="page-title">About</h4>
            </div>
            <div className="about-container">
                <div className="about-main">
                    <Image 
                        src="/AIC.jpg" 
                        alt="art institute of chicago logo" 
                        width={200}
                        height={200}
                        loader={loaderProp}
                        className="about-image"
                    />
                    <div className="about-info">
                        <p>
                        This is a demo eCommerce project with features such as a database of dynamically 
                        updating products, cart functionality, and basic email user authentication. 
                        <br/>
                        <br/>
                        This project was made using <span>React</span>, <span>NextJS</span>, 
                        <span> Firestore</span> database, <span>Firebase</span> user authentication and 
                        the art database of the <span>Art Institute of Chicago's public API</span>. 
                        The ARTIC has an excellent collection of some of the most renowned pieces and collections which I narrowed
                        down to a few that stuck out to me and were public domain.
                        </p>
                    </div>
                </div>
                <div className="about-bottom">
                    <a href="https://github.com/bridgerbrown/ecommerce-basic" className="about-btn">GitHub</a>  
                    <a href="https://www.artic.edu/open-access/public-api" className="about-btn">ARTIC API</a>              
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}
