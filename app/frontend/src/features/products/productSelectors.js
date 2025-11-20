import { createSelector } from '@reduxjs/toolkit';

const selectProducts = (state) => state.products.items;
const selectCategoryFilter = (state) => state.products.categoryFilter;
const selectSortOrder = (state) => state.products.sortOrder;
const selectSearchQuery = (state) => state.products.searchQuery;

export const selectFilteredAndSortedProducts = createSelector(
  [selectProducts, selectCategoryFilter, selectSortOrder, selectSearchQuery],
  (products, categoryFilter, sortOrder, searchQuery) => {
    let filteredProducts = [...products];

    // Filter by category
    if (categoryFilter !== 'All Products') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Filter by search query
    if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(lowercasedQuery) ||
                product.description.toLowerCase().includes(lowercasedQuery)
        );
    }

    // Sort products
    switch (sortOrder) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // No sorting or default sorting
        break;
    }

    return filteredProducts;
  }
);