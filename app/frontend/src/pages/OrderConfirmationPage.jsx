import React from 'react'; // Make sure React is imported
import { useSelector } from 'react-redux';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { selectOrder } from '../features/order/orderSelectors';
import { formatPrice } from '../utils/helpers';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { orderId, orderDetails, orderTotal } = useSelector(selectOrder);

  // Move the hook to the top level
  React.useEffect(() => {
    // Place the condition inside the hook
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]); // Add dependencies

  // If there's no orderId, render nothing while the effect redirects
  if (!orderId) {
    return null;
  }

  // The rest of your component remains the same
  return (
    <Box display="flex" justifyContent="center" alignItems="center" >
        <Paper sx={{ p: 4, maxWidth: 600, textAlign: 'center' }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }}/>
            <Typography variant="h3" component="h1" gutterBottom>
                Thank You For Your Order!
            </Typography>
            <Typography variant="h6" color="text.secondary">
                Your order has been placed successfully.
            </Typography>
            <Typography variant="h5" sx={{ mt: 3 }}>
                Order ID: <strong>{orderId}</strong>
            </Typography>

            <Box sx={{ my: 3, textAlign: 'left' }}>
                 <Typography variant="h6" gutterBottom>Order Summary:</Typography>
                 {orderDetails.map(item => (
                     <Box key={item.id} display="flex" justifyContent="space-between">
                         <Typography>{item.name} (x{item.quantity})</Typography>
                         <Typography>{formatPrice(item.price * item.quantity)}</Typography>
                     </Box>
                 ))}
                 <Divider sx={{ my: 2 }}/>
                 <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" fontWeight="bold">{formatPrice(orderTotal)}</Typography>
                 </Box>
            </Box>

            <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/"
                sx={{ mt: 2 }}
            >
                Continue Shopping
            </Button>
        </Paper>
    </Box>
  );
};

export default OrderConfirmationPage;