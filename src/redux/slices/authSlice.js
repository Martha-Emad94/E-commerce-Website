import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk لتسجيل الدخول
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    // محاكاة تسجيل الدخول - في التطبيق الحقيقي سيكون هناك API call
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('فشل تسجيل الدخول');
    }
    
    const data = await response.json();
    return data;
  }
);

// Async thunk للتسجيل
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('فشل التسجيل');
    }
    
    const data = await response.json();
    return data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    // تسجيل الخروج
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    // تحديث بيانات المستخدم
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    // مسح الخطأ
    clearError: (state) => {
      state.error = null;
    },

    // مسح نجاح التسجيل
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },

    // تحديث حالة التحميل
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // تسجيل الدخول
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // التسجيل
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerSuccess = true;
        // يمكن تسجيل الدخول تلقائياً بعد التسجيل
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  logout,
  updateUser,
  clearError,
  clearRegisterSuccess,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer; 