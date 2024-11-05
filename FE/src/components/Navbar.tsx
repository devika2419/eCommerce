import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '../../public/back.png';
import { useNavigate } from 'react-router-dom';
import Cart from "../../public/shopping-cart.png";

const Navbar: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCart = () => {
    navigate('/checkout');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleSignOut = () => {
    // Clear all data from local storage
    localStorage.clear();
    // You may also want to remove any session data if applicable
    // Redirect to the home page after clearing storage
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
        color: '#ffffff',
        marginBottom: '2%',
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">
          <img src={ArrowBackIcon} alt="back-button" style={{ width: 24, height: 24 }} />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton edge="start" color="inherit" onClick={handleCart} aria-label="cart">
            <img src={Cart} alt="cart-button" style={{ width: 24, height: 24 }} />
          </IconButton>
          <Button color="inherit" onClick={handleLogin} sx={{ color: 'black' }}>Login</Button>
          <Button color="inherit" onClick={handleSignup} sx={{ color: 'black' }}>Signup</Button>
          <Button color="inherit" onClick={handleSignOut} sx={{ color: 'black' }}>Sign Out</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
