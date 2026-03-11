import React, { useState } from 'react'
import './ProductDetail.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../../services/cart';

export const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [selectedVariant, setSelectedVariant] = useState(
        product?.variants?.length ? product.variants[0] : null
    );
    

    if (!product) {
        return (
            <div className="container">
                <div className="error-message">
                    <p>Prodotto non trovato</p>
                </div>
            </div>
        );
    }

    const increase = () => setQuantity(prev => prev + 1);
    const decrease = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleAddToCart = () => {
    addToCart(
        selectedVariant
            ? { ...product, price: selectedVariant.price, selectedVariant }
            : product,
        quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
};

const handleCheckout = () => {
    addToCart(
        selectedVariant
            ? { ...product, price: selectedVariant.price, selectedVariant }
            : product,
        quantity
    );
    navigate('/cart');
};


    const handleGoBack = () => {
        navigate(-1);
        window.scrollTo(0, 0);
    };

    return (
        <div className="container">
            <div className="title">Dettagli Prodotto</div>
            <div className="detail">
                <div className="image">
                    <img src={product.image_url} alt={product.title} />
                </div>
                <div className="content">
                    <h1 className="name">{product.name}</h1>
                    <div className="price">
                        € {parseFloat(selectedVariant?.price ?? product.price).toFixed(2)}
                    </div>
                    {product.variants && product.variants.length > 0 && (
                        <div className="variants">
                            <hr></hr>
                            <p className="variant-title"><b>Formato</b></p>

                            <div className="variant-options">
                                {product.variants.map((variant, index) => (
                                    <button
                                        key={index}
                                        className={`variant-btn ${selectedVariant?.size_ml === variant.size_ml ? 'active' : ''
                                            }`}
                                        onClick={() => setSelectedVariant(variant)}
                                        disabled={variant.stock === 0}
                                    >
                                        {variant.size_ml} ml
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="quantity-buttons">
                        <button className="q-btn" onClick={decrease}>-</button>
                        <span className="q-value">{quantity}</span>
                        <button className="q-btn" onClick={increase}>+</button>
                    </div>

                    <div className="buttons">
                        <button onClick={handleCheckout} className="checkout-btn">Check Out</button>
                        <button onClick={handleAddToCart} className={`cart-btn ${addedToCart ? 'added' : ''}`}>
                            {addedToCart ? '✓ Aggiunto!' : 'Aggiungi al carrello'}
                            <span>
                                <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1" />
                                </svg>
                            </span>
                        </button>
                        <button onClick={handleGoBack} className="back-btn">Torna indietro</button>
                    </div>

                    {/* Descrizione section */}
                    <div className="description-section">
                        <hr />
                        <h2 className="description-title">Descrizione</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                            nec nisl odio. Mauris vehicula at nunc id posuere. Fusce vel elit
                            nec ipsum vehicula sollicitudin. Donec vel odio at orci congue
                            suscipit. Suspendisse potenti.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
