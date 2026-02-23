"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { replaceS3WithCloudFront } from "@/utlis/replaceS3WithCloudFront";

export default function SearchModal() {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const { data, isFetching } = useGetProductsQuery(
    {
      keyword: debouncedKeyword,
      resPerPage: 10,
    },
    {
      skip: debouncedKeyword.length < 2,
    },
  );

  const products = data?.filteredProducts || [];

  return (
    <div className="offcanvas offcanvas-end canvas-search" id="canvasSearch">
      <div className="canvas-wrapper">
        <header className="tf-search-head">
          <div className="title fw-5">
            Search
            <div className="close">
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
          </div>
          <div className="tf-search-sticky">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="tf-mini-search-frm"
            >
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="Search"
                  className=""
                  name="text"
                  tabIndex={0}
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-required="true"
                  required
                />
              </fieldset>
              <button className="" type="submit">
                <i className="icon-search" />
              </button>
            </form>
          </div>
        </header>
        <div className="canvas-body p-0">
          <div className="tf-search-content">
            <div className="tf-cart-hide-has-results">
              <div className="tf-col-content">
                <div className="tf-search-content-title fw-5">Products</div>
                <div className="tf-search-hidden-inner">
                  {debouncedKeyword.length < 2 ? (
                    <p className="p-3">Type at least 2 characters to search.</p>
                  ) : isFetching ? (
                    <p className="p-3">Searching...</p>
                  ) : products.length === 0 ? (
                    <p className="p-3">No products found.</p>
                  ) : (
                    products.map((product) => {
                      const productId = product?._id;
                      const image =
                        replaceS3WithCloudFront(product?.images?.[0]?.url) ||
                        "/images/placeholder.jpg";
                      const title = product?.name || "Product";
                      const price = Number(product?.offer ?? 0);

                      return (
                        <div className="tf-loop-item" key={productId}>
                          <div className="image">
                            <Link href={`/product-detail/${productId}`}>
                              <Image
                                alt={title}
                                src={image}
                                width={200}
                                height={200}
                              />
                            </Link>
                          </div>
                          <div className="content">
                            <Link href={`/product-detail/${productId}`}>
                              {title}
                            </Link>
                            <div className="tf-product-info-price">
                              <div className="price fw-6">
                                Rs.{price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
