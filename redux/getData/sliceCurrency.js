import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD",
};

if (typeof window !== "undefined") {
    initialState.currency = JSON.parse(localStorage.getItem("currency")) || 'USD';
  }

const sliceCurrency = createSlice({
  name: "currency",
  initialState,
  reducers: {
    getCurrency: (state, action) => {
      state.currency = action.payload;
      localStorage.setItem("currency", JSON.stringify(state.currency));
      return;
    },
  },
});

export const { getCurrency } = sliceCurrency.actions;

export default sliceCurrency.reducer;
