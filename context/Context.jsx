"use client";

import React, { useEffect } from "react";
import { openCartModal } from "@/utlis/openCartModal";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/store";
import {
  addProductToCart,
  addToCompareItem,
  addToWishlist,
  hydrateCart,
  hydrateWishlist,
  removeFromCompareItem,
  removeFromWishlist,
  setCartProducts,
  setCompareItem,
  setQuickAddItem,
  setQuickViewItem,
} from "@/store/slices/ecommerceSlice";

const dataContext = React.createContext();

function ContextBridge({ children }) {
  const dispatch = useDispatch();
  const { cartProducts, wishList, compareItem, quickViewItem, quickAddItem } =
    useSelector((state) => state.ecommerce);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartList") || "[]");
    if (Array.isArray(cartItems) && cartItems.length) {
      dispatch(hydrateCart(cartItems));
    }
    const wishItems = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (Array.isArray(wishItems) && wishItems.length) {
      dispatch(hydrateWishlist(wishItems));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    wishList,
    compareItem,
    quickViewItem,
    quickAddItem,
    totalPrice: cartProducts.reduce(
      (sum, product) => sum + product.quantity * product.price,
      0
    ),
    setCartProducts: (valueOrUpdater) => {
      const nextValue =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(cartProducts)
          : valueOrUpdater;
      dispatch(setCartProducts(nextValue));
    },
    setQuickViewItem: (item) => dispatch(setQuickViewItem(item)),
    setQuickAddItem: (itemId) => dispatch(setQuickAddItem(itemId)),
    setCompareItem: (valueOrUpdater) => {
      const nextValue =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(compareItem)
          : valueOrUpdater;
      dispatch(setCompareItem(nextValue));
    },
    addProductToCart: (id, qty) => {
      const exists = cartProducts.some((item) => item.id == id);
      if (!exists) {
        dispatch(addProductToCart({ id, qty }));
        openCartModal();
      }
    },
    isAddedToCartProducts: (id) => cartProducts.some((item) => item.id == id),
    addToWishlist: (id) => dispatch(addToWishlist(id)),
    removeFromWishlist: (id) => dispatch(removeFromWishlist(id)),
    isAddedtoWishlist: (id) => wishList.includes(id),
    addToCompareItem: (id) => dispatch(addToCompareItem(id)),
    removeFromCompareItem: (id) => dispatch(removeFromCompareItem(id)),
    isAddedtoCompareItem: (id) => compareItem.includes(id),
  };

  return (
    <dataContext.Provider value={contextElement}>{children}</dataContext.Provider>
  );
}

export const useContextElement = () => React.useContext(dataContext);

export default function Context({ children }) {
  return (
    <Provider store={store}>
      <ContextBridge>{children}</ContextBridge>
    </Provider>
  );
}
