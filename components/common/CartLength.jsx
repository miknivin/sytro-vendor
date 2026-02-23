"use client";

import { useSelector } from "react-redux";

export default function CartLength() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return <>{Array.isArray(cartItems) ? cartItems.length : 0}</>;
}
