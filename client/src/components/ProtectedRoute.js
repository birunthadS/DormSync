"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

export default function ProtectedRoute({
  children,
}) {

  const router = useRouter();

  const pathname =
    usePathname();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    // PUBLIC ROUTES

    if (
      pathname === "/login" ||
      pathname === "/register"
    ) {

      setAuthorized(true);

      return;
    }

    const storedUser =
      localStorage.getItem(
        "userInfo"
      );

    // NOT LOGGED IN

    if (!storedUser) {

      router.push("/login");

      return;
    }

    const user =
      JSON.parse(storedUser);

    // ADMIN ROUTES

    if (
      pathname.startsWith(
        "/admin"
      ) &&
      user.role !== "admin"
    ) {

      router.push(
        "/student/dashboard"
      );

      return;
    }

    // STUDENT ROUTES

    if (
      pathname.startsWith(
        "/student"
      ) &&
      user.role !== "student"
    ) {

      router.push(
        "/admin/dashboard"
      );

      return;
    }

    setAuthorized(true);

  }, [pathname, router]);

  if (!authorized) {
    return null;
  }

  return children;
}