import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Register from "@/components/othersPages/Register";
import RouteGuard from "@/components/auth/RouteGuard";
import React from "react";

export const metadata = {
  title: "Register || Sytro - Vendor",
  description: "Sytro - Vendor",
};
export default function page() {
  return (
    <RouteGuard guestOnly>
      <>
        <Header2 />
        <div className="tf-page-title style-2">
          <div className="container-full">
            <div className="heading text-center">Register</div>
          </div>
        </div>

        <Register />
        <Footer1 />
      </>
    </RouteGuard>
  );
}
