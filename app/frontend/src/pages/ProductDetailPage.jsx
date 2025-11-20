import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Typography, Button, Chip, Rating } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';
import MessageDialog from '../components/MessageDialog/MessageDialog';
import { addItem } from '../features/cart/cartSlice';
import { formatPrice } from '../utils/helpers';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.items.find((p) => p.id === id));
  
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!product) {
    return <Typography variant="h5" align="center">Product not found!</Typography>;
  }

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    setSnackbarOpen(true);
  };

  return (
    <Box>
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <Box
                    component="img"
                    src={product.imageUrl}
                    alt={product.name}
                    sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h3" component="h1" gutterBottom sx={{fontWeight: 'bold'}}>
                    {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} readOnly precision={0.5} />
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.rating} stars)
                    </Typography>
                </Box>
                <Typography variant="h4" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                    {formatPrice(product.price)}
                </Typography>
                <Typography variant="body1" paragraph>
                    {product.description}
                </Typography>
                <Chip
                    label={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    color={product.stock > 0 ? 'success' : 'error'}
                    sx={{ mb: 3, fontWeight: 'bold' }}
                />
                
                {product.stock > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} maxStock={product.stock} />
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={handleAddToCart}
                            disabled={quantity <= 0 || product.stock === 0}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                )}
            </Grid>
        </Grid>
        <MessageDialog 
            open={snackbarOpen} 
            handleClose={() => setSnackbarOpen(false)} 
            message="Item added to cart!"
        />
    </Box>
  );
};

export default ProductDetailPage;