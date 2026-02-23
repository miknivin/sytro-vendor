import RouteGuard from "@/components/auth/RouteGuard";

export default function DashboardLayout({ children }) {
  return <RouteGuard requireAuth>{children}</RouteGuard>;
}
