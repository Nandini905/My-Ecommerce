import React, { useState, useEffect } from 'react';
import './Toast.css';

let toastTimeout = null;

export const showToast = (message, type = 'success') => {
    const event = new CustomEvent('showToast', { detail: { message, type } });
    window.dispatchEvent(event);
};

export const Toast = () => {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const handleShowToast = (e) => {
            const { message, type } = e.detail;
            setToast({ message, type });
            
            // Clear existing timeout
            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }
            
            // Auto hide after 3 seconds
            toastTimeout = setTimeout(() => {
                setToast(null);
            }, 3000);
        };

        window.addEventListener('showToast', handleShowToast);
        
        return () => {
            window.removeEventListener('showToast', handleShowToast);
            if (toastTimeout) {
                clearTimeout(toastTimeout);
            }
        };
    }, []);

    if (!toast) return null;

    return (
        <div className={`toast toast-${toast.type}`}>
            <div className="toast-content">
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
                    className="toast-icon"
                >
                    {toast.type === 'success' ? (
                        <>
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </>
                    ) : (
                        <>
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </>
                    )}
                </svg>
                <span className="toast-message">{toast.message}</span>
            </div>
        </div>
    );
};

