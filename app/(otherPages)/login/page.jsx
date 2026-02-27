import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Login from "@/components/othersPages/Login";
import RouteGuard from "@/components/auth/RouteGuard";
import React from "react";

export const metadata = {
  title: "Login || Sytro - Vendor",
  description: "Sytro - Vendor",
};
export default function page() {
  return (
    <RouteGuard guestOnly>
      <>
        <div className="tf-page-title style-2">
          <div className="container-full">
            <div className="heading text-center">Log in</div>
          </div>
        </div>

        <Login />
        <Footer1 />
      </>
    </RouteGuard>
  );
}
