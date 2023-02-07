import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], loading: false, error: null };
if (typeof window !== "undefined") {
  initialState.products = JSON.parse(localStorage.getItem("cart")) || [];
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const foundElementIndex = state.products.findIndex(
        (el) => el.id === action.payload.id
      );

      if (foundElementIndex === -1) {
        state.products = [...state.products, { ...action.payload, qty: 1 }];
        localStorage.setItem("cart", JSON.stringify(state.products));
        return;
      }
      const updateItem = {
        ...state.products[foundElementIndex],
        qty: (state.products[foundElementIndex].qty += 1), // action.payload.qty || 1 => هنا هتشوفه بيجمع مثلا لو 4 + 4 = 8
      };
      state.products[foundElementIndex] = updateItem;
      localStorage.setItem("cart", JSON.stringify(state.products));
      return;
    },
    removeToCart: (state, action) => {
      state.products = state.products.filter((el) => el.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.products));
      return;
    },
    addToCartOtherWay: (state, action) => {
      const newItem = action.payload;
      const existItem = state.products.find((el) => el.id === newItem.id);
      const products = existItem
        ? state.products.map((el) => (el.id === existItem.id ? newItem : el))
        : [...state.products, newItem];
      localStorage.setItem("cart", JSON.stringify(state.products));
      // console.log(products);
      return { ...state, products };
    },
    setInitialState: (state) => {
      state.products = JSON.parse(localStorage.getItem("cart")) ?? [];
    },
  },

});

export const { addToCart, removeToCart, addToCartOtherWay, setInitialState } =
  productSlice.actions;

export default productSlice.reducer;
