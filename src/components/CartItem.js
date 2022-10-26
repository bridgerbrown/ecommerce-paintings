import React from "react";

const CartItem = props => {
  const { product } = props
  return (
    <div className="cartitem-container">
        <div className="cartitem-image">
            <figure className="image">
                <img 
                    src={product.img}
                    alt={product.shortDesc}
                />
            </figure>
        </div>
        <div className="cartitem-right">
            <div className="cartitem-info">
                <div className="cartitem-text">
                    <h1 className="cartitem-title">
                        {product.title}
                    </h1>
                    <h2 className="cartitem-artist">{product.artist}</h2>
                    <small>{`${product.quantity} in cart`}</small>
                </div>
                <div className="cartitem-buttons">
                    <button
                        className="remove-cart"
                        onClick={() => 
                            props.removeFromCart({
                                id: product.id,
                                title: product.title,
                                img: product.img,
                                link: product.link,
                                description: product.description,
                                medium: product.medium,
                                artist: product.artist,
                                quantity: 1,
                                totalValue: product.price,
                                stock: product.stock,
                                price: product.price
                            })
                        }
                    >
                        Remove
                    </button>
                    <button
                        className="more-info-cart"
                    >
                        More Info
                    </button>
                </div>
            </div>
        </div>
        <div className="cartitem-price">
                <h3>{product.price}</h3>
        </div> 
  </div>
  );
};

export default CartItem;