import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortDropdown = ({ sortOrder, onSortChange }) => {
  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>Sort By</InputLabel>
      <Select
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        label="Sort By"
      >
        <MenuItem value="default">Default</MenuItem>
        <MenuItem value="price-asc">Price: Low to High</MenuItem>
        <MenuItem value="price-desc">Price: High to Low</MenuItem>
        <MenuItem value="name-asc">Name: A-Z</MenuItem>
        <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;