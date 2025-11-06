import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Navbar } from '../../component/Navbar';
import './WishlistPage.css';

export const WishlistPage = () => {
    const { 
        wishlistItems, 
        removeFromWishlist, 
        clearWishlist
    } = useWishlist();
    
    const { addToCart } = useCart();

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    const getImageUrl = (product) => {
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            const firstImage = product.images[0];
            return typeof firstImage === 'string' ? firstImage : firstImage.url || firstImage;
        }
        if (product.image) {
            return typeof product.image === 'string' ? product.image : product.image.url || product.image;
        }
        return 'https://via.placeholder.com/300';
    };

    return (
        <div className="wishlist-page">
            <Navbar />
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <h1 className="wishlist-title">My Wishlist</h1>
                    {wishlistItems.length > 0 && (
                        <button onClick={clearWishlist} className="clear-wishlist-btn">
                            Clear Wishlist
                        </button>
                    )}
                </div>
                
                {wishlistItems.length === 0 ? (
                    <div className="empty-wishlist">
                        <div className="empty-wishlist-icon">
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
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </div>
                        <h2>Your wishlist is empty</h2>
                        <p>Start adding items you love to your wishlist!</p>
                        <Link to="/" className="continue-shopping-btn">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="wishlist-grid">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="wishlist-item">
                                <button 
                                    className="remove-wishlist-btn"
                                    onClick={() => removeFromWishlist(item.id)}
                                    aria-label="Remove from wishlist"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="20" 
                                        height="20" 
                                        viewBox="0 0 24 24" 
                                        fill="currentColor" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                </button>
                                
                                <div className="wishlist-item-image">
                                    <img 
                                        src={getImageUrl(item)} 
                                        alt={item.title || item.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300';
                                        }}
                                    />
                                </div>
                                
                                <div className="wishlist-item-info">
                                    <h3 className="wishlist-item-title">
                                        {item.title || item.name}
                                    </h3>
                                    <p className="wishlist-item-category">
                                        {typeof item.category === 'string' 
                                            ? item.category 
                                            : item.category?.name || 'Uncategorized'}
                                    </p>
                                    <div className="wishlist-item-price">
                                        ${(item.price || 0).toFixed(2)}
                                    </div>
                                </div>
                                
                                <div className="wishlist-item-actions">
                                    <button 
                                        className="move-to-cart-btn"
                                        onClick={() => handleMoveToCart(item)}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="18" 
                                            height="18" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                        Move to Cart
                                    </button>
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(item)}
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="18" 
                                            height="18" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

