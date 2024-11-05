import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, Button, Box } from '@mui/material';
import axios from 'axios';
import Navbar from "../../components/Navbar"; 

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  created_at: string;
}

const ProductDescription: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productId = localStorage.getItem('productId');
      if (productId) {
        try {
          const response = await axios.post('http://localhost:8000/api/products/id', { id: Number(productId) });
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    const productId = localStorage.getItem('productId');
    const userId = localStorage.getItem('userId'); 

    if (productId && userId) {
      const updatedStatus = { productId: Number(productId), status: 'cart', userId: Number(userId) }; 
      try {
        console.log(updatedStatus)
        await axios.post(`http://localhost:8000/api/cart/add`, updatedStatus); 
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const existingProduct = cartItems.find((item: { id: number; }) => item.id === updatedStatus.productId);
        if (!existingProduct) {
          cartItems.push({ ...product, status: 'cart' });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Product added to cart');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      console.error('Product ID or User ID not found in local storage');
    }
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <>
      <Navbar title={product.name} />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #ffafbd, #ffc3a0)', padding: '2%' }}>
        <Card sx={{ width: '100%', marginTop: '2%' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">{product.name}</Typography>
            <Typography variant="body1" align="center">{product.description}</Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }} align="center">₹{product.price}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleAddToCart}>Add to Cart</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default ProductDescription;
