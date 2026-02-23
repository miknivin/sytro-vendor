import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import ecommerceReducer from "./slices/ecommerceSlice";
import cartReducer from "./slices/cartSlice";
import userReducer from "./slices/userSlice";
import { baseApi } from "./api/baseApi";
import { productApi } from "./api/productsApi";
import { websiteSettingsApi } from "./api/websiteSettings";
import { orderApi } from "./api/orderApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    ecommerce: ecommerceReducer,
    cart: cartReducer,

    [baseApi.reducerPath]: baseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [websiteSettingsApi.reducerPath]: websiteSettingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      userApi.middleware,
      authApi.middleware,
      websiteSettingsApi.middleware,
    ),
});

setupListeners(store.dispatch);
