import React, { useState, useEffect } from 'react';
import { ProductCard } from '../ProductCard';
import { getAllProducts } from '../../getallproject';
import { useCart } from '../../context/CartContext';
import './ProductListing.css';

export const ProductListing = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(() => {
        return localStorage.getItem('pl_searchTerm') || '';
    });
    const [selectedCategory, setSelectedCategory] = useState(() => {
        return localStorage.getItem('pl_selectedCategory') || 'all';
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, selectedCategory, products]);

    // Persist UI state (search/category) to localStorage
    useEffect(() => {
        localStorage.setItem('pl_searchTerm', searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        localStorage.setItem('pl_selectedCategory', selectedCategory);
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllProducts();
            setProducts(data);
            setFilteredProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to load products. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const filterProducts = () => {
        let filtered = [...products];

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(product =>
                (product.title || product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.description || '').toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => {
                let categoryName = '';
                if (typeof product.category === 'string') {
                    categoryName = product.category;
                } else if (product.category?.name) {
                    categoryName = product.category.name;
                }
                return categoryName.toLowerCase() === selectedCategory.toLowerCase();
            });
        }

        setFilteredProducts(filtered);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const getCategoryName = (product) => {
        if (!product.category) return 'uncategorized';
        if (typeof product.category === 'string') return product.category;
        if (product.category.name) return product.category.name;
        return 'uncategorized';
    };

    // Get all unique categories with counts
    const getCategoriesWithCounts = () => {
        const categoryMap = new Map();
        
        products.forEach(product => {
            const categoryName = getCategoryName(product);
            if (categoryName && categoryName !== 'uncategorized') {
                categoryMap.set(categoryName, (categoryMap.get(categoryName) || 0) + 1);
            }
        });

        const categoriesList = Array.from(categoryMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => a.name.localeCompare(b.name));

        return categoriesList;
    };

    const categoriesWithCounts = getCategoriesWithCounts();
    const allCategoriesCount = products.length;

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={fetchProducts} className="retry-btn">Retry</button>
            </div>
        );
    }

    return (
        <div className="product-listing">
            <div className="listing-header">
                <h2 className="listing-title">Our Products</h2>
                <div className="filters">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>
                
                <div className="category-filters">
                    <h3 className="category-filters-title">Filter by Category:</h3>
                    <div className="category-buttons">
                        <button
                            className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedCategory('all')}
                        >
                            All
                            <span className="category-count">({allCategoriesCount})</span>
                        </button>
                        {categoriesWithCounts.map(({ name, count }) => (
                            <button
                                key={name}
                                className={`category-btn ${selectedCategory.toLowerCase() === name.toLowerCase() ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(name)}
                            >
                                {name.charAt(0).toUpperCase() + name.slice(1)}
                                <span className="category-count">({count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="no-products">
                    <p>No products found. Try adjusting your search or filters.</p>
                </div>
            ) : (
                <>
                    <div className="results-count">
                        Showing {Math.max(0, filteredProducts.length - 2)} of {products.length} products
                    </div>
                    <div className="products-grid">
                        {filteredProducts.slice(0, -2).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

