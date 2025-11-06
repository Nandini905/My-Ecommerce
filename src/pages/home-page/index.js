import React from 'react';
import { Navbar } from '../../component/Navbar';
import { ProductListing } from '../../component/ProductListing';
import './HomePage.css';

export const HomePage = () => {
    return (
        <div className="home-page">
            <Navbar />
            <main className="main-content">
                <ProductListing />
            </main>
        </div>
    );
}