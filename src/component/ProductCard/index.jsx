import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

export const ProductCard = ({ product, onAddToCart }) => {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    // Handle different image formats
    const getImageUrl = () => {
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            const firstImage = product.images[0];
            // Handle both string URLs and objects with url property
            return typeof firstImage === 'string' ? firstImage : firstImage.url || firstImage;
        }
        if (product.image) {
            return typeof product.image === 'string' ? product.image : product.image.url || product.image;
        }
        return 'https://via.placeholder.com/300';
    };

    // Handle category display
    const getCategoryName = () => {
        if (!product.category) return null;
        if (typeof product.category === 'string') return product.category;
        if (product.category.name) return product.category.name;
        return null;
    };

    const categoryName = getCategoryName();

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img 
                    src={getImageUrl()} 
                    alt={product.title || product.name || 'Product image'}
                    className="product-image"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300';
                    }}
                />
                <button 
                    className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                    onClick={handleWishlistToggle}
                    aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill={inWishlist ? "currentColor" : "none"}
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                {categoryName && (
                    <div className="product-badge">
                        <span className="category-badge">{categoryName}</span>
                    </div>
                )}
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title || product.name}</h3>
                <p className="product-description">
                    {product.description ? (product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description) : 'No description available'}
                </p>
                <div className="product-footer">
                    <div className="product-price">
                        <span className="price-symbol">$</span>
                        <span className="price-amount">{product.price || '0.00'}</span>
                    </div>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
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
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

