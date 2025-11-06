import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Navbar } from '../../component/Navbar';
import './CartPage.css';
import { openRazorpayCheckout } from '../../utils/razorpay';

export const CartPage = () => {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal, 
        getCartItemsCount 
    } = useCart();
    const [paying, setPaying] = useState(false);

    const handleQuantityChange = (productId, newQuantity) => {
        updateQuantity(productId, parseInt(newQuantity) || 1);
    };

    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        } else {
            removeFromCart(item.id);
        }
    };

    const handleIncrease = (item) => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const getImageUrl = (product) => {
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            const firstImage = product.images[0];
            return typeof firstImage === 'string' ? firstImage : firstImage.url || firstImage;
        }
        if (product.image) {
            return typeof product.image === 'string' ? product.image : product.image.url || product.image;
        }
        return 'https://via.placeholder.com/150';
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 0 ? 10.00 : 0;
    const total = subtotal + shipping;

    const handlePayNow = async () => {
        if (cartItems.length === 0) return;
        try {
            setPaying(true);
            // NOTE: In production, create an order on your server using Razorpay Orders API
            // and pass order_id here. This is a client-only demo flow.
            const amountPaise = Math.round(total * 100);
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_RbLZnEpjRHIrDC',
                amount: amountPaise, // in paise
                currency: 'INR',
                name: 'Ecommerce Web',
                description: 'Order Payment',
                // order_id: '<server_generated_order_id>',
                prefill: {
                    name: 'Customer',
                    email: 'customer@example.com',
                    contact: '9999999999',
                },
                notes: {
                    cart_items_count: String(getCartItemsCount()),
                },
                theme: {
                    color: '#007bff',
                },
            };

            const response = await openRazorpayCheckout(options);
            // On success, you should verify payment signature on your server.
            console.log('Payment success:', response);
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            clearCart();
        } catch (err) {
            console.warn('Payment error:', err);
            if (err && err.message !== 'Payment cancelled') {
                alert('Payment failed. Please try again.');
            }
        } finally {
            setPaying(false);
        }
    };

    return (
        <div className="cart-page">
            <Navbar />
            <div className="cart-container">
                <h1 className="cart-title">Shopping Cart</h1>
                
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-cart-icon">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="80" 
                                height="80" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/" className="continue-shopping-btn">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items-section">
                            <div className="cart-header">
                                <h2>Cart Items ({getCartItemsCount()})</h2>
                                <button onClick={clearCart} className="clear-cart-btn">
                                    Clear Cart
                                </button>
                            </div>
                            
                            <div className="cart-items-list">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="cart-item-image">
                                            <img 
                                                src={getImageUrl(item)} 
                                                alt={item.title || item.name}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150';
                                                }}
                                            />
                                        </div>
                                        
                                        <div className="cart-item-details">
                                            <h3 className="cart-item-title">
                                                {item.title || item.name}
                                            </h3>
                                            <p className="cart-item-category">
                                                {typeof item.category === 'string' 
                                                    ? item.category 
                                                    : item.category?.name || 'Uncategorized'}
                                            </p>
                                            <div className="cart-item-price">
                                                ${(item.price || 0).toFixed(2)}
                                            </div>
                                        </div>
                                        
                                        <div className="cart-item-quantity">
                                            <button 
                                                className="quantity-btn decrease"
                                                onClick={() => handleDecrease(item)}
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity || 1}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                className="quantity-input"
                                            />
                                            <button 
                                                className="quantity-btn increase"
                                                onClick={() => handleIncrease(item)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        
                                        <div className="cart-item-total">
                                            <span className="item-total-price">
                                                ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                            </span>
                                        </div>
                                        
                                        <button 
                                            className="remove-item-btn"
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label="Remove item"
                                        >
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="20" 
                                                height="20" 
                                                viewBox="0 0 24 24" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                            >
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="cart-summary">
                            <div className="summary-card">
                                <h2>Order Summary</h2>
                                
                                <div className="summary-row">
                                    <span>Subtotal ({getCartItemsCount()} items)</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                
                                <div className="summary-divider"></div>
                                
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                
                                <button className="checkout-btn" onClick={handlePayNow} disabled={paying || cartItems.length === 0}>
                                    {paying ? 'Processing...' : 'Pay with Razorpay'}
                                </button>
                                
                                <Link to="/" className="continue-shopping-link">
                                    ← Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

