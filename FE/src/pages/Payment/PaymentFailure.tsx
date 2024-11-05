import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentFailure: React.FC = () => {
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
        backgroundColor: '#ffebee', 
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
        <Typography variant="h4" gutterBottom sx={{ color: '#d32f2f' }}>
          Payment Failed
        </Typography>
        <Typography variant="body1" sx={{ color: '#616161' }}>
          Unfortunately, your payment could not be processed. You will be redirected shortly.
        </Typography>
      </Box>
    </Container>
  );
};

export default PaymentFailure;
