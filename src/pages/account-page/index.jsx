import React from 'react';
import { Navbar } from '../../component/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../../component/ProtectedRoute';
import './AccountPage.css';

const AccountPage = () => {
    const { user, logout } = useAuth();
    const { getCartTotal, getCartItemsCount } = useCart();
    const { getWishlistCount } = useWishlist();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    return (
        <ProtectedRoute>
            <div className="account-page-wrapper">
                <Navbar />
                <div className="account-page">
                <div className="account-container">
                    <div className="account-header">
                        <h1>My Account</h1>
                        <p className="account-subtitle">Manage your account settings and preferences</p>
                    </div>

                    <div className="account-content">
                        {/* Profile Section */}
                        <div className="account-section">
                            <div className="section-header">
                                <h2>Profile Information</h2>
                            </div>
                            <div className="profile-card">
                                <div className="profile-avatar-large">
                                    {getInitials(user?.name)}
                                </div>
                                <div className="profile-details">
                                    <div className="detail-item">
                                        <label>Full Name</label>
                                        <div className="detail-value">{user?.name || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-item">
                                        <label>Email Address</label>
                                        <div className="detail-value">{user?.email || 'Not provided'}</div>
                                    </div>
                                    <div className="detail-item">
                                        <label>Account Status</label>
                                        <div className="detail-value status-active">
                                            <span className="status-dot"></span>
                                            Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Statistics Section */}
                        <div className="account-section">
                            <div className="section-header">
                                <h2>Account Statistics</h2>
                            </div>
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon cart-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-content">
                                        <div className="stat-value">{getCartItemsCount()}</div>
                                        <div className="stat-label">Items in Cart</div>
                                        <div className="stat-subtext">${getCartTotal().toFixed(2)} total</div>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon wishlist-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                    </div>
                                    <div className="stat-content">
                                        <div className="stat-value">{getWishlistCount()}</div>
                                        <div className="stat-label">Wishlist Items</div>
                                        <div className="stat-subtext">Saved for later</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="account-section">
                            <div className="section-header">
                                <h2>Quick Actions</h2>
                            </div>
                            <div className="actions-grid">
                                <button 
                                    className="action-btn"
                                    onClick={() => navigate('/cart')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    View Cart
                                </button>
                                <button 
                                    className="action-btn"
                                    onClick={() => navigate('/wishlist')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                    View Wishlist
                                </button>
                                <button 
                                    className="action-btn"
                                    onClick={() => navigate('/')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>

                        {/* Account Actions */}
                        <div className="account-section">
                            <div className="section-header">
                                <h2>Account Actions</h2>
                            </div>
                            <div className="account-actions">
                                <button 
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </ProtectedRoute>
    );
};

export default AccountPage;

