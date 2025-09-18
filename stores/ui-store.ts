/**
 * UI Store
 * 
 * Manages UI state like modals, drawers, and loading states.
 * Separated from cart store for better performance and organization.
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Cart drawer state
  isCartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;
  toggleCartDrawer: () => void;
  
  // Mobile menu state
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  
  // Filters drawer state
  isFiltersDrawerOpen: boolean;
  setFiltersDrawerOpen: (open: boolean) => void;
  toggleFiltersDrawer: () => void;
  
  // Global loading state
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Theme state (for future dark mode support)
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set, _get) => ({
      // Cart drawer state
      isCartDrawerOpen: false,
      setCartDrawerOpen: (open: boolean) => set({ isCartDrawerOpen: open }),
      toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
      
      // Mobile menu state
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      
      // Filters drawer state
      isFiltersDrawerOpen: false,
      setFiltersDrawerOpen: (open: boolean) => set({ isFiltersDrawerOpen: open }),
      toggleFiltersDrawer: () => set((state) => ({ isFiltersDrawerOpen: !state.isFiltersDrawerOpen })),
      
      // Global loading state
      isGlobalLoading: false,
      setGlobalLoading: (loading: boolean) => set({ isGlobalLoading: loading }),
      
      // Search state
      searchQuery: '',
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      
      // Theme state
      theme: 'light',
      setTheme: (theme: 'light' | 'dark') => set({ theme }),
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
    }),
    {
      name: 'ui-store',
    }
  )
);

// Selectors for better performance
export const useCartDrawerState = () => useUIStore((state) => ({
  isOpen: state.isCartDrawerOpen,
  setOpen: state.setCartDrawerOpen,
  toggle: state.toggleCartDrawer,
}));

export const useMobileMenuState = () => useUIStore((state) => ({
  isOpen: state.isMobileMenuOpen,
  setOpen: state.setMobileMenuOpen,
  toggle: state.toggleMobileMenu,
}));

export const useFiltersDrawerState = () => useUIStore((state) => ({
  isOpen: state.isFiltersDrawerOpen,
  setOpen: state.setFiltersDrawerOpen,
  toggle: state.toggleFiltersDrawer,
}));

export const useGlobalLoading = () => useUIStore((state) => state.isGlobalLoading);
export const useSetGlobalLoading = () => useUIStore((state) => state.setGlobalLoading);

export const useSearchState = () => useUIStore((state) => ({
  query: state.searchQuery,
  setQuery: state.setSearchQuery,
}));

export const useThemeState = () => useUIStore((state) => ({
  theme: state.theme,
  setTheme: state.setTheme,
  toggle: state.toggleTheme,
}));
