import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Topbar1 from "@/components/headers/Topbar1";
import ShopDefault from "@/components/shop/ShopDefault";
import Subcollections from "@/components/shop/Subcollections";
import React from "react";

export const metadata = {
  title:
    "Product Collection Sub || Sytro - Vendor",
  description: "Sytro - Vendor",
};
export default function page() {
  return (
    <>
      <Header2 />
      <ShopDefault />
      <Footer1 />
    </>
  );
}
