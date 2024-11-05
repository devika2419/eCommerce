import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/signup', { username, password });
      alert('Signup successful! You can now log in.');
      navigate('/login'); // Redirect to the login page after signup
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Signup failed! Username might already be taken.');
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
            transform: 'scale(1.03)', // Slight scaling for 3D effect on hover
          },
        }}
      >        <Typography variant="h4" align="center">Signup</Typography>
        <form onSubmit={handleSignup}>
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
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
