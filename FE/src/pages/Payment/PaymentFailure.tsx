import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentFailure: React.FC = () => {
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
        Payment Failed
      </Typography>
      <Typography variant="body1">
        Unfortunately, your payment could not be processed. You will be redirected shortly.
      </Typography>
    </Container>
  );
};

export default PaymentFailure;
