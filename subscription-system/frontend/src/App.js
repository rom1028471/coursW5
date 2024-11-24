import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Компоненты пользователя
import Header from './components/Header';
import Profile from './components/Profile';
import Publications from './components/Publications';
import Cart from './components/Cart';
import Footer from './components/Footer';

// Компоненты аутентификации
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import RoleSelection from './components/RoleSelection';

// Компоненты администратора
import AdminHome from './components/admin/AdminHome';
import Analytics from './components/admin/Analytics';
import Reviews from './components/admin/Reviews';
import Newsletters from './components/admin/Newsletters';

function App() {
  // Состояние аутентификации и пользователя
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  // Состояние корзины и избранного
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Обработчики аутентификации
  const handleSignIn = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Обработчики для корзины
  const handleAddToCart = (publication) => {
    setCartItems([...cartItems, publication]);
  };

  const handleRemoveFromCart = (publicationId) => {
    setCartItems(cartItems.filter(item => item.id !== publicationId));
  };

  // Обработчик для избранного
  const handleToggleFavorite = (publication) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === publication.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== publication.id);
      } else {
        return [...prevFavorites, publication];
      }
    });
  };

  // Если пользователь не выбрал роль
  if (!userRole && !isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoleSelection onSelectRole={setUserRole} />
      </ThemeProvider>
    );
  }

  // Если пользователь выбрал роль, но не аутентифицирован
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route 
              path="/signin" 
              element={<SignIn onSignIn={handleSignIn} />} 
            />
            <Route 
              path="/signup" 
              element={<SignUp onSignUp={handleSignUp} />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/signin" replace />} 
            />
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Header 
            userRole={userRole} 
            cartItemsCount={cartItems.length}
            favoritesCount={favorites.length}
            onLogout={handleLogout}
            user={user}
          />
          <div style={{ flex: 1 }}>
            <Routes>
              {userRole === 'admin' ? (
                // Маршруты администратора
                <>
                  <Route path="/" element={<AdminHome />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/newsletters" element={<Newsletters />} />
                </>
              ) : (
                // Маршруты пользователя
                <>
                  <Route 
                    path="/" 
                    element={
                      <Publications 
                        onAddToCart={handleAddToCart}
                        onToggleFavorite={handleToggleFavorite}
                        favorites={favorites}
                      />
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <Profile 
                        user={user}
                        onLogout={handleLogout}
                        subscriptions={subscriptions}
                        favorites={favorites}
                        cartItems={cartItems}
                      />
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <Cart 
                        items={cartItems}
                        onRemoveFromCart={handleRemoveFromCart}
                      />
                    } 
                  />
                </>
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
