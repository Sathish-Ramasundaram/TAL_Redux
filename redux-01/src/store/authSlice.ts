import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    loading: false,
    error: null as string | null,
    isLoggedIn: false,
    otpStatus: "idle" as "idle" | "waiting" | "success" | "timeout" | "error",
otpError: null as string | null,
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

    
otpStart: (state) => {
  state.otpStatus = "waiting";
  state.otpError = null;
},

otpSubmitRequest: (_state, _action) => {},

otpSuccess: (state) => {
  state.otpStatus = "success";
  state.isLoggedIn = true;
},

otpTimeout: (state) => {
  state.otpStatus = "timeout";
  state.otpError = "OTP expired";
  state.isLoggedIn = false;
},

otpFailure: (state, action) => {
  state.otpStatus = "error";
  state.otpError = action.payload;
},

  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
   otpStart,
  otpSubmitRequest,
  otpSuccess,
  otpTimeout,
  otpFailure,
} = authSlice.actions;

export default authSlice.reducer;
