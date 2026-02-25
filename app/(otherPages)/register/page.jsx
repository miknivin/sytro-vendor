import { redirect } from "next/navigation";

export const metadata = {
  title: "Login || Sytro - Vendor",
  description: "Sytro - Vendor",
};
export default function page() {
  redirect("/login");
}
