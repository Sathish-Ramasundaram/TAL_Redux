import { createSlice } from "@reduxjs/toolkit";

type MailState = {
  sent: boolean;
  undoAvailable: boolean;
  statusText: string;
};

const initialState: MailState = {
  sent: false,
  undoAvailable: false,
  statusText: "No mail sent",
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    sendMailRequest: () => {},          // saga trigger
    undoMailRequest: () => {},          // saga trigger

    mailSent: (state) => {
      state.sent = true;
      state.undoAvailable = true;
      state.statusText = "Mail sent ✅";
    },

    mailUndone: (state) => {
      state.statusText = "Mail reverted ↩️";
    },

    undoExpired: (state) => {
  state.undoAvailable = false;
  state.sent = false;
  state.statusText = "Undo window expired";
},

  },
});

export const {
  sendMailRequest,
  undoMailRequest,
  mailSent,
  mailUndone,
  undoExpired,
} = mailSlice.actions;

export default mailSlice.reducer;
