import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    loading: false,
    error: null as string | null,
    isLoggedIn: false,
  },

  reducers: {
    loginRequest: (
      state,
      action: { payload: { email: string; password: string } }
    ) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
    },

    registerRequest: (state, _action) => {
      state.loading = true;
      state.error = null;
    },

    registerSuccess: (state) => {
      state.loading = false;
    },

    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  registerRequest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
