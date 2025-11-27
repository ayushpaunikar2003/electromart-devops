import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../features/cart/cartSelectors';
import { Box, Typography, Paper, Grid, TextField, Button, FormControl, RadioGroup, FormControlLabel, Radio, Divider, List, ListItem, ListItemText } from '@mui/material';
import { formatPrice } from '../utils/helpers';
import { clearCart } from '../features/cart/cartSlice';
import { placeOrder } from '../features/order/orderSlice';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    // State for shipping fields
    const [shipping, setShipping] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    // Place order handler
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const orderData = {
            items: cartItems,
            customer: {
                name: shipping.name,
                email: shipping.email,
                address: `${shipping.address}, ${shipping.city}, ${shipping.state}, ${shipping.postalCode}, ${shipping.country}`
            },
            total
        };
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            if (res.ok) {
                // Save order details in Redux (for confirmation page)
                dispatch(placeOrder({
                    items: cartItems,
                    total,
                }));

                // Clear the cart after successful order
                dispatch(clearCart());

                alert('Order placed successfully!');
                navigate('/order-confirmation');
            } else {
                alert('Failed to place order.');
            }
        } catch (err) {
            alert('Network error. Please try again.');
        }
    };

    // 🔹 SMALL CHANGE HERE: don't redirect, just render nothing if cart is empty
    if (cartItems.length === 0) {
        return null;
    }

    return (
        <Box component="form" onSubmit={handlePlaceOrder}>
            <Typography variant="h3" component="h1" gutterBottom align="center">Checkout</Typography>
            <Grid container spacing={5}>
                {/* Shipping Details */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>Shipping Details</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Full Name" name="name" value={shipping.name} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Email Address" type="email" name="email" value={shipping.email} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth label="Address Line 1" name="address" value={shipping.address} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="City" name="city" value={shipping.city} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="State/Province" name="state" value={shipping.state} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Postal Code" name="postalCode" value={shipping.postalCode} onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth label="Country" name="country" value={shipping.country} onChange={handleInputChange} />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Payment Method */}
                    <Paper sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h5" gutterBottom>Payment Method</Typography>
                        <FormControl component="fieldset">
                            <RadioGroup defaultValue="creditCard">
                                <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card (Simulated)" />
                                <FormControlLabel value="paypal" control={<Radio />} label="PayPal (Simulated)" />
                                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                            </RadioGroup>
                        </FormControl>
                    </Paper>
                </Grid>

                {/* Order Summary */}
                <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 3, position: 'sticky', top: '80px' }}>
                        <Typography variant="h5" gutterBottom>Order Summary</Typography>
                        <List disablePadding>
                            {cartItems.map((item) => (
                                <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                                    <Typography variant="body2">{formatPrice(item.price * item.quantity)}</Typography>
                                </ListItem>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={<Typography variant="h6">Total</Typography>} />
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    {formatPrice(total)}
                                </Typography>
                            </ListItem>
                        </List>
                        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3 }}>
                            Place Order
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CheckoutPage;
