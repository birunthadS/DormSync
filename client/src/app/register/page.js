"use client";

import "./register.css";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function RegisterPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "student",
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
          formData
        );

        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data)
        );

        alert(
          "Registration Successful"
        );

        if (res.data.role === "admin") {

  router.push(
    "/admin/dashboard"
  );

} else {

  router.push(
    "/student/dashboard"
  );
}

      } catch (error) {

  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );
} finally {

        setLoading(false);
      }
    };

  return (
    <div className="register-page">

      <div className="register-box">

        <h1>DormSync</h1>

        <p>
          Create your account
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input-field"
            onChange={handleChange}
            required
          />

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

          <select
            name="role"
            className="input-field"
            onChange={handleChange}
          >
            <option value="student">
              Student
            </option>

            <option value="admin">
              Admin
            </option>
          </select>

          <button
            className="primary-button"
            disabled={loading}
          >
            {
              loading
                ? "Creating Account..."
                : "Register"
            }
          </button>

        </form>

        <div className="register-footer">

          Already have an account?{" "}

          <Link href="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}