import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  created_at: string;
}

const ProductListing: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'http://localhost:8000/api/products';
        if (category && category !== 'all') {
          url += `/category/${category}`;
        }
        const response = await axios.get<Product[]>(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleProductClick = (productId: number) => {
    localStorage.setItem('productId', productId.toString());
    navigate(`/products/product-desc`);
  };

  return (
    <>
      <Navbar title="Product Listing" />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => handleProductClick(product.id)} 
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/150"
                  alt={product.name}
                />
                <Box sx={{ flexGrow: 1 }} />
                <CardContent>
                  <Typography variant="h5" gutterBottom>{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 2 }}>
                    ₹{product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProductListing;
