import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./getData/SliceProduct";
import sliceCurrency from "./getData/sliceCurrency";
import sliceWishList from "./getData/sliceWishList";
import ShowShoppingCart from "./shopping/shopping-cart";

const store = configureStore({
  reducer: {
    product: productSlice,
    currency: sliceCurrency,
    wishList: sliceWishList,
    "Shopping-Cart": ShowShoppingCart,
  },
});

export default store;
