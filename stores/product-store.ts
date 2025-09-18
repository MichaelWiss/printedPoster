/**
 * Product Store
 * 
 * Manages product-related state like favorites, recently viewed,
 * and product filters. Separated for better organization.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { ShopifyProduct, ProductFilters, ProductSortKey } from '@/types/shopify';

interface ProductState {
  // Favorites
  favoriteProductIds: string[];
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  
  // Recently viewed
  recentlyViewed: ShopifyProduct[];
  addToRecentlyViewed: (product: ShopifyProduct) => void;
  clearRecentlyViewed: () => void;
  
  // Product filters
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  clearFilters: () => void;
  
  // Sorting
  sortKey: ProductSortKey;
  sortReverse: boolean;
  setSorting: (key: ProductSortKey, reverse?: boolean) => void;
  
  // View preferences
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
}

const defaultFilters: ProductFilters = {
  tags: [],
  priceMin: undefined,
  priceMax: undefined,
  vendor: undefined,
  productType: undefined,
};

export const useProductStore = create<ProductState>()(
  devtools(
    persist(
      (set, get) => ({
        // Favorites
        favoriteProductIds: [],
        addToFavorites: (productId: string) => set((state) => ({
          favoriteProductIds: [...state.favoriteProductIds, productId],
        })),
        removeFromFavorites: (productId: string) => set((state) => ({
          favoriteProductIds: state.favoriteProductIds.filter(id => id !== productId),
        })),
        toggleFavorite: (productId: string) => set((state) => {
          const isFavorite = state.favoriteProductIds.includes(productId);
          return {
            favoriteProductIds: isFavorite
              ? state.favoriteProductIds.filter(id => id !== productId)
              : [...state.favoriteProductIds, productId],
          };
        }),
        isFavorite: (productId: string) => get().favoriteProductIds.includes(productId),
        
        // Recently viewed
        recentlyViewed: [],
        addToRecentlyViewed: (product: ShopifyProduct) => set((state) => {
          const filtered = state.recentlyViewed.filter(p => p.id !== product.id);
          return {
            recentlyViewed: [product, ...filtered].slice(0, 10), // Keep only last 10
          };
        }),
        clearRecentlyViewed: () => set({ recentlyViewed: [] }),
        
        // Product filters
        filters: defaultFilters,
        setFilters: (filters: ProductFilters) => set({ filters }),
        updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
        clearFilters: () => set({ filters: defaultFilters }),
        
        // Sorting
        sortKey: 'RELEVANCE',
        sortReverse: false,
        setSorting: (key: ProductSortKey, reverse = false) => set({ 
          sortKey: key, 
          sortReverse: reverse 
        }),
        
        // View preferences
        viewMode: 'grid',
        setViewMode: (mode: 'grid' | 'list') => set({ viewMode: mode }),
        
        // Pagination
        currentPage: 1,
        setCurrentPage: (page: number) => set({ currentPage: page }),
        itemsPerPage: 24,
        setItemsPerPage: (count: number) => set({ itemsPerPage: count }),
      }),
      {
        name: 'product-store',
        partialize: (state) => ({
          favoriteProductIds: state.favoriteProductIds,
          recentlyViewed: state.recentlyViewed,
          viewMode: state.viewMode,
          itemsPerPage: state.itemsPerPage,
        }),
      }
    ),
    {
      name: 'product-store',
    }
  )
);

// Selectors for better performance
export const useFavorites = () => useProductStore((state) => ({
  favoriteIds: state.favoriteProductIds,
  addToFavorites: state.addToFavorites,
  removeFromFavorites: state.removeFromFavorites,
  toggleFavorite: state.toggleFavorite,
  isFavorite: state.isFavorite,
}));

export const useRecentlyViewed = () => useProductStore((state) => ({
  products: state.recentlyViewed,
  addToRecentlyViewed: state.addToRecentlyViewed,
  clearRecentlyViewed: state.clearRecentlyViewed,
}));

export const useProductFilters = () => useProductStore((state) => ({
  filters: state.filters,
  setFilters: state.setFilters,
  updateFilter: state.updateFilter,
  clearFilters: state.clearFilters,
}));

export const useProductSorting = () => useProductStore((state) => ({
  sortKey: state.sortKey,
  sortReverse: state.sortReverse,
  setSorting: state.setSorting,
}));

export const useViewMode = () => useProductStore((state) => ({
  mode: state.viewMode,
  setMode: state.setViewMode,
}));

export const usePagination = () => useProductStore((state) => ({
  currentPage: state.currentPage,
  setCurrentPage: state.setCurrentPage,
  itemsPerPage: state.itemsPerPage,
  setItemsPerPage: state.setItemsPerPage,
}));
