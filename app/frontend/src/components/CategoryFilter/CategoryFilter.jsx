import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { getCategories } from '../../data/products';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const categories = getCategories();

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Categories</Typography>
      {categories.map((category) => (
        <Button
          key={category}
          fullWidth
          variant={selectedCategory === category ? 'contained' : 'text'}
          onClick={() => onSelectCategory(category)}
          sx={{ justifyContent: 'flex-start', mb: 1 }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryFilter;