import { createSlice } from "@reduxjs/toolkit";

const initialState = { wishList: [] };

if (typeof window !== "undefined") {
  initialState.wishList = JSON.parse(localStorage.getItem("wishList")) || [];
}
export const sliceWishList = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const isFound = state.wishList.find((el) => el.id === action.payload.id);
      if (state.wishList.length === 0 || !isFound) {
        state.wishList.push(action.payload);
        localStorage.setItem("wishList", JSON.stringify(state.wishList));
        return;
      }
    },
    removeWishList: (state, action) => {
      state.wishList =
        state.wishList &&
        state.wishList.filter((el) => el.id !== action.payload.id);
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
      return;
    },
  },
});

export const { addToWishList, removeWishList } = sliceWishList.actions;

export default sliceWishList.reducer;
