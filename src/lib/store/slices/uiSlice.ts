import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isMobileMenuOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchOpen: boolean;
  activeCategory: string;
  viewMode: "grid" | "list";
  sortBy: "newest" | "price-low" | "price-high" | "rating";
  notification: {
    message: string;
    type: "success" | "error" | "info";
  } | null;
}

const initialState: UIState = {
  isMobileMenuOpen: false,
  isCartDrawerOpen: false,
  isSearchOpen: false,
  activeCategory: "All",
  viewMode: "grid",
  sortBy: "newest",
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setMobileMenuOpen(state, action: PayloadAction<boolean>) {
      state.isMobileMenuOpen = action.payload;
    },
    toggleCartDrawer(state) {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    setCartDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isCartDrawerOpen = action.payload;
    },
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
    setSearchOpen(state, action: PayloadAction<boolean>) {
      state.isSearchOpen = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
    setViewMode(state, action: PayloadAction<"grid" | "list">) {
      state.viewMode = action.payload;
    },
    setSortBy(
      state,
      action: PayloadAction<"newest" | "price-low" | "price-high" | "rating">
    ) {
      state.sortBy = action.payload;
    },
    showNotification(
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info";
      }>
    ) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleCartDrawer,
  setCartDrawerOpen,
  toggleSearch,
  setSearchOpen,
  setActiveCategory,
  setViewMode,
  setSortBy,
  showNotification,
  clearNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
