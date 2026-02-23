"use client";

import { useGetProductDetailsQuery } from "@/store/api/productsApi";
import FullScreenSpinner from "@/components/common/FullScreenSpinner";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import Moments from "../common/Moments.jsx";
import Features from "../common/Features";
import GoogleReviews from "../common/GoogleReviews";
import RelatedProducts from "./RelatedProducts";
import TrustBanner from "@/components/common/TrustBanner";
import TestimonialImages from "@/components/common/TestimonialImages";

export default function ProductDetailsClient({ productId }) {
  const { data, error, isLoading } = useGetProductDetailsQuery(productId, {
    skip: !productId,
  });

  const product = data?.productById;

  if (isLoading) return <FullScreenSpinner />;

  if (error || !product) {
    return <p>Unable to load product details.</p>;
  }

  return (
    <>
      <DetailsOuterZoom product={product} details={product?.details} />
      <ShopDetailsTab product={product} details={product?.details} />
      <Moments />
      <RelatedProducts product={product} />
      <GoogleReviews />
      <Features />
      <TrustBanner />
      <TestimonialImages />
    </>
  );
}
