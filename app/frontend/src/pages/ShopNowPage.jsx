import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Box, Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ProductCard from '../components/ProductCard/ProductCard';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import SortDropdown from '../components/SortDropdown/SortDropdown';

import { selectFilteredAndSortedProducts } from '../features/products/productSelectors';
import { setCategoryFilter, setSortOrder, setSearchQuery } from '../features/products/productSlice';

const ShopNowPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredAndSortedProducts);
  const { categoryFilter, sortOrder, searchQuery } = useSelector((state) => state.products);

  // Reset filters on component mount
  useEffect(() => {
    return () => {
        dispatch(setCategoryFilter('All Products'));
        dispatch(setSortOrder('default'));
        dispatch(setSearchQuery(''));
    };
  }, [dispatch]);


  return (
    <Grid container spacing={4}>
      {/* Left Sidebar for Filters */}
      <Grid item xs={12} md={3}>
        <Box sx={{ position: 'sticky', top: '80px', p: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <TextField
              fullWidth
              label="Search Products"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          <CategoryFilter
            selectedCategory={categoryFilter}
            onSelectCategory={(category) => dispatch(setCategoryFilter(category))}
          />
        </Box>
      </Grid>

      {/* Right Main Area for Products */}
      <Grid item xs={12} md={9}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Box sx={{ minWidth: 200 }}>
            <SortDropdown
              sortOrder={sortOrder}
              onSortChange={(order) => dispatch(setSortOrder(order))}
            />
          </Box>
        </Box>
        <Grid container spacing={3}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} lg={4}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
                <Typography align="center" sx={{mt: 5}}>No products found.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShopNowPage;