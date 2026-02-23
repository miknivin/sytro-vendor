"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function RouteGuard({
  children,
  requireAuth = false,
  guestOnly = false,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
      const nextPath = searchParams.get("next");
      router.replace(nextPath || "/");
    }
  }, [
    guestOnly,
    isAuthenticated,
    isLoading,
    pathname,
    requireAuth,
    router,
    searchParams,
  ]);

  if (
    isLoading ||
    (requireAuth && !isAuthenticated) ||
    (guestOnly && isAuthenticated)
  ) {
    return null;
  }

  return children;
}
