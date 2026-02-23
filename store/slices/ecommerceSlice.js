import { createSlice } from "@reduxjs/toolkit";
import { allProducts } from "@/data/products";

const initialState = {
  cartProducts: [],
  wishList: [1, 2, 3],
  compareItem: [1, 2, 3],
  quickViewItem: allProducts[0],
  quickAddItem: 1,
};

const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    hydrateCart(state, action) {
      state.cartProducts = action.payload;
    },
    hydrateWishlist(state, action) {
      state.wishList = action.payload;
    },
    setCartProducts(state, action) {
      state.cartProducts = action.payload;
    },
    setQuickViewItem(state, action) {
      state.quickViewItem = action.payload;
    },
    setQuickAddItem(state, action) {
      state.quickAddItem = action.payload;
    },
    setCompareItem(state, action) {
      state.compareItem = action.payload;
    },
    addProductToCart(state, action) {
      const { id, qty } = action.payload;
      const exists = state.cartProducts.some((item) => item.id == id);
      if (!exists) {
        const item = allProducts.find((product) => product.id == id);
        if (item) {
          state.cartProducts.push({ ...item, quantity: qty ? qty : 1 });
        }
      }
    },
    addToWishlist(state, action) {
      const id = action.payload;
      if (!state.wishList.includes(id)) {
        state.wishList.push(id);
      } else {
        state.wishList = state.wishList.filter((item) => item != id);
      }
    },
    removeFromWishlist(state, action) {
      state.wishList = state.wishList.filter((item) => item != action.payload);
    },
    addToCompareItem(state, action) {
      if (!state.compareItem.includes(action.payload)) {
        state.compareItem.push(action.payload);
      }
    },
    removeFromCompareItem(state, action) {
      state.compareItem = state.compareItem.filter(
        (item) => item != action.payload
      );
    },
  },
});

export const {
  hydrateCart,
  hydrateWishlist,
  setCartProducts,
  setQuickViewItem,
  setQuickAddItem,
  setCompareItem,
  addProductToCart,
  addToWishlist,
  removeFromWishlist,
  addToCompareItem,
  removeFromCompareItem,
} = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
