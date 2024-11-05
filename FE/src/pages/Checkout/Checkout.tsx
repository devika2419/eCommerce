import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem('userId'); // Get user ID from local storage
      if (userId) {
        try {
          const response = await axios.post('http://localhost:8000/api/cart', { userId: Number(userId) });
          setCartItems(response.data);
          calculateTotal(response.data);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        console.error('User ID not found in local storage');
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items: any[]) => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.price);
      if (isNaN(price)) {
        console.error('Invalid price:', item.price);
        return sum;
      }
      return sum + price;
    }, 0);
    const formattedTotal = parseFloat(total.toFixed(2));
    setTotalAmount(formattedTotal);
  };

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId'); // Get user ID
    if (userId) {
      // Simulate payment success with 80% chance
      const paymentSuccess = Math.random() < 0.8; // 80% chance for success
  
      if (paymentSuccess) {
        // Clear the cart
        await clearCart();
        console.log('Payment successful.');
        navigate('/payment-success'); // Redirect to payment success page
      } else {
        console.error('Payment failed.');
        navigate('/payment-failure'); // Redirect to payment failure page
      }
    } else {
      console.error('User ID not found in local storage');
    }
  };
  

  const clearCart = async () => {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      await Promise.all(cartItems.map(item =>
        axios.put(`http://localhost:8000/api/cart/remove`, { id: item.id, userId: Number(userId) }) 
      ));
      setCartItems([]);
      setTotalAmount(0);
    } else {
      console.error('User ID not found in local storage');
    }
  };

  return (
    <>
      <Navbar title="Checkout" />
      <Container maxWidth="sm" sx={{ marginTop: '2%' }}>
        {cartItems.length === 0 ? (
          <Typography align="center">Your cart is empty</Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ marginBottom: '1%' }}>
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">₹{item.price}</Typography>
                  <Typography variant="body2">Quantity: 1</Typography>
                </CardContent>
              </Card>
            ))}
            <Typography variant="h6" align="center" sx={{ marginTop: '2%' }}>
              Total Amount: ₹{totalAmount}
            </Typography>
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={clearCart}>
            Clear Cart
          </Button>
          <Button variant="contained" color="primary" onClick={handleCheckout}>
            Proceed to Payment
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Checkout;
