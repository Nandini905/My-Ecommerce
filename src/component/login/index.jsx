import React from 'react';

export const Login = () => {
    const onFormSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div>
                <span>Email</span>
                <input type="email" placeholder="enter your email" />
            </div>
            <div>
                <span>Password</span>
                <input type="password" placeholder="enter your password" />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};