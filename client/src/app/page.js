"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function HomePage() {

  const router =
    useRouter();

  useEffect(() => {

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

    // ROLE REDIRECT

    if (
      user.role === "admin"
    ) {

      router.push(
        "/admin/dashboard"
      );

    } else {

      router.push(
        "/student/dashboard"
      );
    }

  }, []);

  return null;
}