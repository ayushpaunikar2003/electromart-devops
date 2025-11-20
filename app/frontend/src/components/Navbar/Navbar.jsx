import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectCartItemCount } from '../../features/cart/cartSelectors';

const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'Shop Now', path: '/shop' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const cartItemCount = useSelector(selectCartItemCount);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', textDecoration: 'none' }}
        >
          ElectroShop
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navLinks.map((link) => (
            <Button
              key={link.title}
              color="inherit"
              component={RouterLink}
              to={link.path}
              sx={{ margin: '0 10px' }}
            >
              {link.title}
            </Button>
          ))}
        </Box>
        <IconButton color="primary" aria-label="shopping cart" onClick={() => navigate('/cart')}>
          <Badge badgeContent={cartItemCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;