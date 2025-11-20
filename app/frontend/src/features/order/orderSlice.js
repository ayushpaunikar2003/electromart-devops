import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: null,
  orderDetails: null,
  orderTotal: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orderId = `ES-${Date.now()}`;
      state.orderDetails = action.payload.items;
      state.orderTotal = action.payload.total;
    },
  },
});

export const { placeOrder } = orderSlice.actions;

export default orderSlice.reducer;