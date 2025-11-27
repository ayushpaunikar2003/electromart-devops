import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <Rating value={product.rating} readOnly precision={0.5} size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ml: 1}}>({product.rating})</Typography>
        </Box>
        <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          component={RouterLink}
          to={`/products/${product.id}`}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default ProductCard;