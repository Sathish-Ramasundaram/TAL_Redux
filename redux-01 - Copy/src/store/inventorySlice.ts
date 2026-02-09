import { createSlice } from "@reduxjs/toolkit";

type InventoryState = {
  items: string[];
};

const initialState: InventoryState = {
  items: ["Vivo A1", "Vivo A2", "Vivo A3"],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
    checkInventoryRequest: () => {},
  },
});


export const { clearItems, checkInventoryRequest } = inventorySlice.actions;

export default inventorySlice.reducer;
