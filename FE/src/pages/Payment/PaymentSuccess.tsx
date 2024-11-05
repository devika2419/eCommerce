import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to homepage after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: 'center',
        marginTop: '20%',
        padding: '20px',
        backgroundColor: '#e0f7fa', 
        borderRadius: '10px',
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#00796b' }}>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ color: '#616161' }}>
          Thank you for your purchase. You will be redirected shortly.
        </Typography>
      </Box>
    </Container>
  );
};

export default PaymentSuccess;
