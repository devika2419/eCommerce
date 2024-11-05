import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to homepage after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '20%' }}>
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1">
        Thank you for your purchase. You will be redirected shortly.
      </Typography>
    </Container>
  );
};

export default PaymentSuccess;
