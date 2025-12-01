import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // إضافة منتج للمفضلة
    addToWishlist: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },

    // إزالة منتج من المفضلة
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // نقل منتج من المفضلة لسلة التسوق
    moveToCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    // مسح قائمة المفضلة
    clearWishlist: (state) => {
      state.items = [];
    },

    // تحديث حالة التحميل
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // تحديث الخطأ
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  moveToCart,
  clearWishlist,
  setLoading,
  setError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer; 