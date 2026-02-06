
import { createSlice } from "@reduxjs/toolkit";

type SyncState = {
  running: boolean;
};

const initialState: SyncState = {
  running: false,
};

const syncSlice = createSlice({
  name: "sync",
  initialState,
  reducers: {
    syncStartRequest: () => {},   // saga trigger
    syncStopRequest: () => {},    // saga trigger

    syncStarted: (state) => {
      state.running = true;
    },

    syncStopped: (state) => {
      state.running = false;
    },
  },
});

export const {
  syncStartRequest,
  syncStopRequest,
  syncStarted,
  syncStopped,
} = syncSlice.actions;

export default syncSlice.reducer;
