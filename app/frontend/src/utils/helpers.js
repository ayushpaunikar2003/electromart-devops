/**
 * Formats a number as a US dollar currency string.
 * @param {number} price - The price to format.
 * @returns {string} - The formatted price string (e.g., "$1,299.99").
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};