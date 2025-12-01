import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk لجلب جميع المنتجات
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('فشل في جلب المنتجات');
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) {
        throw new Error('فشل في جلب الفئات');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`فشل في جلب منتجات فئة: ${category}`);
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
);

// Async thunk للبحث في المنتجات
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchTerm) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error('فشل في البحث');
      }
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    filteredProducts: [],
    categories: [],
    searchResults: [],
    loading: false,
    error: null,
    filters: {
      category: '',
      brand: '',
      priceRange: { min: '', max: '' },
      sortBy: 'name',
    },
  },
  reducers: {
    // تحديث الفلاتر
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // مسح الفلاتر
    clearFilters: (state) => {
      state.filters = {
        category: '',
        brand: '',
        priceRange: { min: '', max: '' },
        sortBy: 'name',
      };
      state.filteredProducts = state.allProducts;
    },

    // تطبيق الفلاتر
    applyFilters: (state) => {
      try {
        let filtered = [...state.allProducts];

        // فلتر الفئة
        if (state.filters.category) {
          filtered = filtered.filter(product => 
            product.category === state.filters.category
          );
        }

        // فلتر العلامة التجارية
        if (state.filters.brand) {
          filtered = filtered.filter(product => 
            product.brand === state.filters.brand
          );
        }

        // فلتر السعر
        if (state.filters.priceRange.min || state.filters.priceRange.max) {
          filtered = filtered.filter(product => {
            const price = product.price;
            const min = state.filters.priceRange.min ? parseFloat(state.filters.priceRange.min) : 0;
            const max = state.filters.priceRange.max ? parseFloat(state.filters.priceRange.max) : Infinity;
            return price >= min && price <= max;
          });
        }

        // الترتيب
        switch (state.filters.sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case 'name':
          default:
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        }

        state.filteredProducts = filtered;
      } catch (error) {
        console.error('Error applying filters:', error);
        state.filteredProducts = state.allProducts;
      }
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
  extraReducers: (builder) => {
    builder
      // جلب جميع المنتجات
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // جلب الفئات
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // جلب منتجات فئة معينة
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // البحث في المنتجات
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateFilters,
  clearFilters,
  applyFilters,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer; 