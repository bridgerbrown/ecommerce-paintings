import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image"
import { useProductContext } from "../data/context/ProductContext";
import Footer from "../components/Footer";
import PageTitle from "../components/PageTitle";

export default function About() {
  const { loaderProp } = useProductContext()
  return(
    <div className="App">
      <Navbar />
      <PageTitle title={"About"} /> 
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
            This is a front-end eCommerce project that fetches painting data from a museum's public API
            and uses it to showcas demo products for user interaction. The website includes features such as
            real-time product stock updates from a Firestore database, shopping cart functionality, and basic email user 
            authentication through Firebase. To enhance loading times, the site hosts images locally.
            <br/>
            <br/>
            This project was made using <span>React</span>, a <span>RESTful API</span>, <span>NextJS</span>, <span>HTML</span>, <span>CSS</span>, the
            <span> Firestore</span> database, <span>Firebase</span> for user authentication, and 
            the art database from the <span>Art Institute of Chicago's public API</span>. 
            The ARTIC has an excellent collection of some of the most renowned art pieces, and I just selected 
            a few public domain pieces that stuck out to me.</p>
          </div>
        </div>
        <div className="about-bottom">
          <a href="https://github.com/bridgerbrown/ecommerce-basic" className="about-btn">GitHub</a>  
          <a href="https://www.artic.edu/open-access/public-api" className="about-btn">ARTIC API</a>              
        </div>
      </div>
      <Footer />
    </div>
  )
}
