
import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  loading: boolean;
};

const initialState: AppState = {
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = appSlice.actions;

export default appSlice.reducer;
