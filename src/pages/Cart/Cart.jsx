import React, { useState, useEffect } from 'react';
import './Cart.css';
import axios from 'axios';
import { getCart, removeFromCart, setCart } from '../../services/cart';
import { Link, useNavigate } from 'react-router-dom';

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch tutti i prodotti dal DB
  useEffect(() => {
    axios.get('http://localhost:5000/api/products/all')
      .then(res => setAllProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  // Arricchisce il carrello con dati dal DB
  const enrichCart = (products) => {
    const cart = getCart();
    return cart.map(cartItem => {
      const product = products.find(p => p._id.toString() === cartItem.id.toString());
      if (!product) return null;

      let price = product.price;
      let variantId = null;
      let variantLabel = null;

      // Se il carrello ha variante, usa prezzo e label della variante
      if (cartItem.variantId && product.variants?.length > 0) {
        const variant = product.variants.find(v => v._id === cartItem.variantId);
        if (variant) {
          price = variant.price;
          variantId = variant._id;
          variantLabel = `${variant.size_ml}ml`;
        }
      }

      return {
        ...product,
        qty: cartItem.qty || 1,
        variantId,
        variantLabel,
        price,
      };
    }).filter(item => item !== null);
  };

  // Aggiorna carrello quando cambiano i prodotti
  useEffect(() => {
    if (allProducts.length > 0) {
      const enrichedCart = enrichCart(allProducts);
      setCartItems(enrichedCart);
      setLoading(false);
    }
  }, [allProducts]);

  // Listener per aggiornamenti del carrello
  useEffect(() => {
    const handleCartUpdate = () => {
      const enrichedCart = enrichCart(allProducts);
      setCartItems(enrichedCart);
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, [allProducts]);

  const handleQuantityChange = (productId, newQty, variantId = null) => {
    const cart = getCart();
    const item = cart.find(i => i.id === productId && i.variantId === variantId);
    if (!item) return;

    if (newQty <= 0) {
      removeFromCart(productId, variantId);
    } else {
      item.qty = newQty;
      setCart(cart);
    }

    // Dispatch evento per aggiornare il carrello
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleRemove = (productId, variantId = null) => {
    removeFromCart(productId, variantId);
    const enrichedCart = enrichCart(allProducts);
    setCartItems(enrichedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
  };

  // Checkout con Stripe
  const handleCheckout = async () => {
    try {
      const items = cartItems.map(item => ({
        productId: item._id,
        variantId: item.variantId,
        quantity: item.qty,
      }));

      const res = await axios.post('http://localhost:5000/api/checkout', { items });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Errore durante il pagamento");
    }
  };

  const handleGoBack = () => navigate(-1);

  if (loading) return <div className="cart-loading">Caricamento...</div>;

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h2>Il tuo carrello è vuoto</h2>
          <p>Scopri i nostri prodotti di qualità</p>
          <Link to="/inchiostro" className="continue-shopping-btn">Continua lo shopping</Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items-section">
            <h2 className="section-title">Prodotti nel carrello</h2>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item._id + (item.variantId || '')} className="cart-item">
                  <div className="item-image">
                    <img src={item.image_url} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <h3 className="item-title">{item.name}{item.variantLabel ? ` - ${item.variantLabel}` : ''}</h3>
                    <p className="item-price">€ {parseFloat(item.price).toFixed(2)}</p>
                  </div>

                  <div className="item-quantity">
                    <label>Quantità:</label>
                    <span className="item-quantity-number">{item.qty}</span>
                  </div>

                  <div className="item-subtotal">
                    <p className="subtotal-price">€ {(item.price * item.qty).toFixed(2)}</p>
                  </div>

                  <button onClick={() => handleRemove(item._id, item.variantId)} className="trash-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <Link to="/inchiostro" className="continue-btn">Continua lo shopping</Link>
          </div>

          <div className="cart-summary">
            <h2 style={{ color: "white" }}>Riepilogo ordine</h2>
            <div className="summary-row">
              <span>Totale:</span>
              <span>€ {calculateTotal()}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-btn">Procedi al checkout</button>
            <button onClick={handleGoBack} className="back-btn">← Torna indietro</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
