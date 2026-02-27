"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";
import { replaceS3WithCloudFront } from "@/utlis/replaceS3WithCloudFront";

export const ProductCard = ({ product }) => {
  const productId = product?._id || "";
  const title = product?.name || product?.title || "Product";
  const price = Number(product?.offer ?? product?.price ?? 0);
  const primaryImage =
    replaceS3WithCloudFront(product?.images?.[0]?.url) ||
    product?.imgSrc ||
    "/images/products/fashion-slideshow-01.jpg";
  const hoverImage =
    replaceS3WithCloudFront(product?.images?.[0]?.url) ||
    product?.imgHoverSrc ||
    primaryImage;

  const [currentImage, setCurrentImage] = useState(primaryImage);
  const {
    setQuickViewItem,
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(primaryImage);
  }, [primaryImage]);

  const displayColors = useMemo(() => product?.colors || [], [product?.colors]);

  return (
    <div className="card-product fl-item" key={productId}>
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${productId}`} className="product-img">
          <Image
            className="lazyload img-product"
            data-src={primaryImage}
            src={currentImage}
            alt={title}
            width={720}
            height={1005}
          />
          <Image
            className="lazyload img-hover"
            data-src={hoverImage}
            src={hoverImage}
            alt={title}
            width={720}
            height={1005}
          />
        </Link>
        <div className="list-product-btn">
          <Link
            href={`/product-detail/${productId || ""}`}
            className="box-icon bg_white quickview tf-btn-loading"
          >
            <span className="icon icon-view" />
            <span className="tooltip">Quick View</span>
          </Link>
        </div>
        {product?.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )}
        {product?.sizes && (
          <div className="size-list">
            {product.sizes.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${productId}`} className="title link">
          {title}
        </Link>
{/* <span className="price">${price.toFixed(2)}</span> */}
        {displayColors.length > 0 && (
          <ul className="list-color-product">
            {displayColors.map((color) => (
              <li
                className={`list-color-item color-swatch ${
                  currentImage === color.imgSrc ? "active" : ""
                }`}
                key={color.name}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <span className="tooltip">{color.name}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <Image
                  className="lazyload"
                  data-src={color.imgSrc}
                  src={color.imgSrc}
                  alt={title}
                  width={720}
                  height={1005}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
