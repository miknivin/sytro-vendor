"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function RouteGuard({
  children,
  requireAuth = false,
  guestOnly = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (requireAuth && !isAuthenticated) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
      return;
    }

    if (guestOnly && isAuthenticated) {
      const nextPath =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("next")
          : null;
      router.replace(nextPath || "/");
    }
  }, [guestOnly, isAuthenticated, isLoading, pathname, requireAuth, router]);

  if (
    isLoading ||
    (requireAuth && !isAuthenticated) ||
    (guestOnly && isAuthenticated)
  ) {
    return null;
  }

  return children;
}
