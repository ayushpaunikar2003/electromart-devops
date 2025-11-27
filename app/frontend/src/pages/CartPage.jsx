import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Grid, Paper, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateQuantity, removeItem } from '../features/cart/cartSlice';
import { selectCartItems, selectCartSubtotal, selectShippingCost, selectCartTotal } from '../features/cart/cartSelectors';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';
import { formatPrice } from '../utils/helpers';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shippingCost = useSelector(selectShippingCost);
  const total = useSelector(selectCartTotal);

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  if (cartItems.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" gutterBottom>Your Cart is Empty</Typography>
        <Button variant="contained" component={RouterLink} to="/shop">
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={4}>
      {/* Cart Items */}
      <Grid item xs={12} md={8}>
        <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
        {cartItems.map(item => (
          <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={item.imageUrl}
              alt={item.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h6">
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  {formatPrice(item.price)}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                <QuantitySelector
                  quantity={item.quantity}
                  setQuantity={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                  maxStock={item.stock}
                />
                <IconButton aria-label="delete" onClick={() => handleRemoveItem(item.id)} sx={{ ml: 'auto' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Card>
        ))}
      </Grid>

      {/* Cart Summary */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2, position: 'sticky', top: '80px' }}>
          <Typography variant="h5" gutterBottom>Order Summary</Typography>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal</Typography>
            <Typography>{formatPrice(subtotal)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Shipping</Typography>
            <Typography>{formatPrice(shippingCost)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{formatPrice(total)}</Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CartPage;