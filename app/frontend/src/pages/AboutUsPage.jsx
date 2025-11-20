import React from 'react';
// import { Box, Typography, Container, Paper } from '@mui/material';
import { Typography, Container, Paper } from '@mui/material';

const AboutUsPage = () => {
  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          About ElectroShop
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Your one-stop destination for the latest and greatest in electronics.
        </Typography>
        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          Welcome to ElectroShop, your premier digital gadget hub. Our mission is to provide tech enthusiasts with top-quality electronics, from cutting-edge laptops and smartphones to high-fidelity headphones and professional-grade cameras. We believe in the power of technology to simplify and enrich lives, and we are committed to bringing you the best products the industry has to offer.
        </Typography>
        <Typography variant="body1" paragraph>
          Our values are simple: quality, innovation, and customer satisfaction. We carefully curate our product selection to ensure every item meets our high standards of performance and reliability. At ElectroShop, we're not just selling electronics; we're providing tools that empower creativity, enhance productivity, and connect people.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for choosing ElectroShop. We look forward to serving you and helping you find the perfect gadget to fit your lifestyle.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUsPage;