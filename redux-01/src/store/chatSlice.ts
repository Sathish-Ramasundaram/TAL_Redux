import { createSlice } from "@reduxjs/toolkit";

type ChatState = {
  messages: string[];
  sending: boolean;
};

const initialState: ChatState = {
  messages: [],
  sending: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessageRequest: (state, _action) => {
      state.sending = true;
    },

    sendMessageSuccess: (state, action) => {
      state.sending = false;
      state.messages.push(action.payload);
    },
  },
});

export const {
  sendMessageRequest,
  sendMessageSuccess,
} = chatSlice.actions;

export default chatSlice.reducer;
