import React from "react"

const ProductItem = props => {
    const { product } = props
    return(
        <div className="column is-half">
            <div className="box">
                <div className="media">
                    <div className="media-left">
                        <figure className="image">
                            <img 
                                src={product.img}
                                alt={product.shortDesc}
                            />
                        </figure>
                    </div>
                    <div className="media-content">
                        <b style={{ textTransform: "capitalize"}}>
                            {product.title}{" "}
                        </b>
                        <h2>{product.artist}</h2>
                        <span className="tag is-primary">{product.price}</span>
                        {product.stock > 0 ? (
                        <small>{product.stock + " Available"}</small>
                        ) : (
                        <small className="has-text-danger">Out Of Stock</small>
                        )}
                        <div className="is-clearfix">
                            <button
                                className="button is-small is-outlined is-primary is-pulled-right"
                                onClick={() => 
                                    props.addToCart({
                                        id: product.name,
                                        product,
                                        amount: 1
                                    })
                                }
                            >
                                Add to Cart
                            </button>
                            <button
                                className="button is-small is-outlined is-primary is-pulled-left"
                            >
                                More Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem