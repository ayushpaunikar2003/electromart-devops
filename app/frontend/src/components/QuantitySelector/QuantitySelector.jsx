import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantitySelector = ({ quantity, setQuantity, maxStock }) => {
  const handleDecrement = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleIncrement = () => {
    setQuantity(Math.min(maxStock, quantity + 1));
  };

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxStock) {
      setQuantity(value);
    } else if (event.target.value === '') {
        setQuantity(1);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: 1 }}>
      <IconButton onClick={handleDecrement} disabled={quantity <= 1}>
        <RemoveIcon />
      </IconButton>
      <TextField
        value={quantity}
        onChange={handleChange}
        inputProps={{
          style: { textAlign: 'center', width: 40 },
          min: 1,
          max: maxStock
        }}
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    border: 'none',
                },
            },
        }}
      />
      <IconButton onClick={handleIncrement} disabled={quantity >= maxStock}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;