import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Electronics from "../../../public/electronics.gif";
import Fashion from "../../../public/fashion.gif";
import Furniture from "../../../public/home.gif";
import axios from 'axios';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);


  const categoryImages: { [key: string]: string } = {
    Electronics: Electronics,
    Fashion: Fashion,
    "Home & Kitchen": Furniture,
  };

  const handleShopNowClick = () => {
    navigate('products/all'); 
  };

  // Function to navigate to product listing page with category
  const handleCategoryClick = (category: string) => {
    navigate(`/products/${category}`);
  };

    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products'); // Adjust the API endpoint as necessary
        const products = response.data;
  
        // Select random products (e.g., 4 products)
        const shuffledProducts = products.sort(() => 0.5 - Math.random()); // Shuffle the products array
        const selectedProducts = shuffledProducts.slice(0, 4); // Take the first 4 products after shuffling
  
        setFeaturedProducts(selectedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(148,143,244,1) 0%, rgba(130,130,254,1) 60%, rgba(15,163,193,1) 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>Welcome to ClickCart Connect.</Typography>
          <Typography variant="h6" gutterBottom>Find amazing deals on top products!</Typography>
          <Button variant="contained" color="secondary" onClick={handleShopNowClick}>
            Shop Now
          </Button>

        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>Shop by Category</Typography>
        <Grid container spacing={4}>
          {['Electronics', 'Fashion', 'Home & Kitchen'].map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Card 
                sx={{ cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
                onClick={() => handleCategoryClick(category)} // Clickable card
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={categoryImages[category]}
                  alt={category}
                  sx={{ objectFit: 'contain' }} 
                />
                <CardContent>
                  <Typography variant="h6" align="center">{category}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

       {/* Featured Products Section */}
       <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" gutterBottom>Featured Products</Typography>
        <Grid container spacing={4}>
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card sx={{ height: '100%', boxShadow: 2 }}>

                  <CardContent>
                    <Typography variant="body1" gutterBottom>{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">₹{product.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center">Loading featured products...</Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
