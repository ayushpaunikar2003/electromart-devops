import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard/ProductCard';

const HomePage = () => {
  const navigate = useNavigate();
  const allProducts = useSelector((state) => state.products.items);

  const topRatedProducts = [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const latestArrivals = [...allProducts].slice(-4);

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: 12, pb: 12, 
          background: 'url(https://placehold.co/1200x400/1976d2/FFFFFF?text=Welcome+to+ElectroShop) center/cover no-repeat',
          color: 'white',
          textAlign: 'center',
          borderRadius: 2,
          mb: 6,
          overflow: 'hidden'
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(34, 34, 34, 0.45)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
            Your Digital Gadget Hub
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 15 }}>
            The latest and greatest in electronics, all in one place.
          </Typography>
          <Button variant="contained" size="large" color="secondary" onClick={() => navigate('/shop')}>
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* Top Rated Products Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Top Rated Products
        </Typography>
        <Grid container spacing={4}>
          {topRatedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Latest Arrivals Section */}
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
          Latest Arrivals
        </Typography>
        <Grid container spacing={4}>
          {latestArrivals.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;