"use client";

import { useMemo, useRef, useState } from "react";
import ProductGrid from "./ProductGrid";
import ShopFilter from "./ShopFilter";
import { useGetProductsQuery } from "@/store/api/productsApi";

export default function ShopDefault() {
  const [gridItems] = useState(4);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const inputRef = useRef(null);

  const productsParams = {
    resPerPage: 60,
    ...(query ? { keyword: query } : {}),
    ...(selectedCategory ? { category: selectedCategory } : {}),
    ...(selectedCapacity ? { capacity: selectedCapacity } : {}),
  };

  const { data, isLoading, error } = useGetProductsQuery(productsParams);
  const { data: allProductsData } = useGetProductsQuery({ resPerPage: 500 });

  const products = data?.filteredProducts || [];
  const allProducts = allProductsData?.filteredProducts || [];

  const categories = useMemo(
    () => [...new Set(allProducts.map((item) => item?.category).filter(Boolean))],
    [allProducts]
  );

  const capacities = useMemo(
    () =>
      [
        ...new Set(
          allProducts
            .map((item) => item?.capacity)
            .filter((value) => value !== undefined && value !== null)
        ),
      ].sort((a, b) => Number(a) - Number(b)),
    [allProducts]
  );

  const handleClear = () => {
    setQuery("");
    setSelectedCategory("");
    setSelectedCapacity("");
    inputRef.current?.focus();
  };

  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          <div className="tf-shop-control d-flex justify-content-end flex-wrap align-items-center">
            {/* <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
            </div> */}
            <div className="tf-control-layout d-flex justify-content-center">
              <div className="search-wrap">
                <div style={{minWidth:"100%"}} className={`search-box ${focused ? "focused" : ""}`}>
                  <i className="icon icon-search search-icon" />
                  <input
                    ref={inputRef}
                    type="text"
                    className="search-input w-100"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => e.key === "Escape" && handleClear()}
                  />
                  {query && (
                    <button className="clear-btn" onClick={handleClear}>
                      <i className="fas fa-times" />
                    </button>
                  )}
                  <button type="button" className="search-btn">
                    <i className="fas fa-arrow-right" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="wrapper-control-shop">
            <div className="meta-filter-shop" />
            <ProductGrid
              allproducts={products}
              gridItems={gridItems}
              isLoading={isLoading}
              isError={Boolean(error)}
            />
          </div>
        </div>
      </section>

      <ShopFilter
        categories={categories}
        capacities={capacities}
        selectedCategory={selectedCategory}
        selectedCapacity={selectedCapacity}
        onCategoryChange={setSelectedCategory}
        onCapacityChange={setSelectedCapacity}
        onClear={handleClear}
      />
    </>
  );
}
