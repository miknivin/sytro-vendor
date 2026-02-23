"use client";

import { allProducts } from "@/data/products";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      queryFn: () => ({ data: allProducts }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      queryFn: (id) => {
        const product = allProducts.find((item) => item.id == id) || null;
        return { data: product };
      },
      providesTags: (_result, _error, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = baseApi;
