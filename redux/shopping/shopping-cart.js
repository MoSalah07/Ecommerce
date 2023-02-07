import { createSlice } from "@reduxjs/toolkit";

const initialState = { show: false };

const ShowShoppingCart = createSlice({
  name: "Shopping-Cart",
  initialState,
  reducers: {
    showCart: (state, action) => {
      ( state.show = action.payload );
      return;
    },

    toggleCart: (state) => {
      ( state.show = !state.show );
      return;
    },
  },
});

export const { showCart, toggleCart } = ShowShoppingCart.actions;

export default ShowShoppingCart.reducer;
