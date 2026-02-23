import React from "react";
import { ProductCard } from "../shopCards/ProductCard";

export default function ProductGrid({
  gridItems = 4,
  allproducts = [],
  isLoading = false,
  isError = false,
}) {
  if (isLoading) {
    return <div style={{ margin: "0 auto 24px", width: "fit-content" }}>Loading products...</div>;
  }

  if (isError) {
    return <div style={{ margin: "0 auto 24px", width: "fit-content" }}>Failed to load products.</div>;
  }

  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0 auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {allproducts.length} product(s) found
      </div>
      <div className="grid-layout wrapper-shop" data-grid={`grid-${gridItems}`}>
        {allproducts.map((product) => (
          <ProductCard product={product} key={product?._id || product?.id} />
        ))}
      </div>
    </>
  );
}
