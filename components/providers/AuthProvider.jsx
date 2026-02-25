"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setLoading, setUser } from "@/store/slices/userSlice";

const AuthContext = createContext(null);

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Request failed");
  }
  return data;
}

function redirectToLogin() {
  if (typeof window === "undefined") {
    return;
  }

  const path = window.location.pathname;
  const isAuthPage = path === "/login";

  if (!isAuthPage) {
    window.location.replace(`/login?next=${encodeURIComponent(path)}`);
  }
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.loading);

  const refreshUser = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await parseResponse(response);
      const nextUser = data?.user || null;
      dispatch(setUser(nextUser));
      dispatch(setIsAuthenticated(Boolean(nextUser)));
      return { success: true, user: nextUser };
    } catch (error) {
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      redirectToLogin();
      return { success: false, error: error.message, user: null };
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(
    async ({ email, password }) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await parseResponse(response);
      await refreshUser();
      return data;
    },
    [refreshUser]
  );

  const register = useCallback(
    async () => {
      throw new Error(
        "Self-registration is disabled. Please contact admin to create your account.",
      );
    },
    [],
  );

  const logout = useCallback(async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    await parseResponse(response);
    dispatch(setUser(null));
    dispatch(setIsAuthenticated(false));
    dispatch(setLoading(false));
  }, [dispatch]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      refreshUser,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, isLoading, refreshUser, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
