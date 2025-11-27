import { createSlice } from '@reduxjs/toolkit';
import { products as allProducts } from '../../data/products';

const initialState = {
  items: allProducts,
  categoryFilter: 'All Products',
  sortOrder: 'default',
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategoryFilter, setSortOrder, setSearchQuery } = productSlice.actions;

export default productSlice.reducer;