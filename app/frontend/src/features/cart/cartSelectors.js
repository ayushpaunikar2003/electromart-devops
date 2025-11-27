import { createSelector } from '@reduxjs/toolkit';

// Add the 'export' keyword to the line below
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemCount = createSelector(
    selectCartItems,
    (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
    selectCartItems,
    (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectShippingCost = createSelector(
    selectCartSubtotal,
    (subtotal) => (subtotal > 500 ? 0 : 10)
);

export const selectCartTotal = createSelector(
    selectCartSubtotal,
    selectShippingCost,
    (subtotal, shipping) => subtotal + shipping
);