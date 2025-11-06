import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { CartPage } from './pages/cart-page';
import { WishlistPage } from './pages/wishlist-page';
import { LoginPage } from './pages/login-page';
import { RegisterPage } from './pages/register-page';
import { ProtectedRoute } from './component/ProtectedRoute';

function App() {
  return (
    <Routes> 
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
