"use client";

import "./login.css";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
          formData
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data)
        );

        // ROLE-BASED REDIRECT

        if (
          res.data.role === "admin"
        ) {

          router.push(
            "/admin/dashboard"
          );

        } else {

          router.push(
            "/student/dashboard"
          );
        }

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Login Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>DormSync</h1>

        <p>
          Login to continue
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
            required
          />

          <button
            className="primary-button"
            disabled={loading}
          >
            {
              loading
                ? "Logging in..."
                : "Login"
            }
          </button>

        </form>
        <div className="login-footer">

  Don't have an account?{" "}

  <Link href="/register">
    Register
  </Link>

</div>

        <div className="register-footer">

          New user?{" "}

          <Link href="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}