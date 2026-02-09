import { createSlice } from "@reduxjs/toolkit";

type BundleState = {
  loading: boolean;
  profile: any | null;
  notifications: string[];
  stats: any | null;
};

const initialState: BundleState = {
  loading: false,
  profile: null,
  notifications: [],
  stats: null,
};

const bundleSlice = createSlice({
  name: "bundle",
  initialState,
  reducers: {
    bundleRequest: (state) => {
      state.loading = true;
    },

    bundleSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload.profile;
      state.notifications = action.payload.notifications;
      state.stats = action.payload.stats;
    },

    bundleFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  bundleRequest,
  bundleSuccess,
  bundleFailure,
} = bundleSlice.actions;

export default bundleSlice.reducer;
