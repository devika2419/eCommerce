import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { username, password });
      const { token, userId } = response.data; 
      localStorage.setItem('token', token); 
      localStorage.setItem('userId', userId.toString()); 
      console.log('Login successful:', token);
      navigate('/products'); 
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 5,
          background: 'linear-gradient(90deg, #B3CDE0 0%, #A4D8E1 100%)', 
          color: '#ffffff',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.03)', 
          },
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
