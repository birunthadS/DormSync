"use client";

import "./Sidebar.css";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

export default function Sidebar() {

  const pathname = usePathname();

  const [user, setUser] =
    useState(null);

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

    setUser(storedUser);

  }, []);

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Complaints",
      href: "/complaints",
    },
    {
      name: "Visitors",
      href: "/visitors",
    },
    {
      name: "Notifications",
      href: "/notifications",
    },
  ];

  return (
    <div className="sidebar">

      <div>

        <div className="logo">

          <h1>DormSync</h1>

          <p>
            Smart Hostel System
          </p>

        </div>

        <div className="nav-links">

          {links.map((link) => (

            <Link
              key={link.name}
              href={link.href}
              className={
                pathname === link.href
                  ? "active-link"
                  : ""
              }
            >
              {link.name}
            </Link>

          ))}

        </div>

        <button
          className="logout-btn"
          onClick={() => {

            localStorage.removeItem(
              "userInfo"
            );

            window.location.href =
              "/login";
          }}
        >
          Logout
        </button>

      </div>

      <div className="profile-box">

        <div className="avatar">

          {
            user?.name
              ? user.name
                  .charAt(0)
                  .toUpperCase()
              : "U"
          }

        </div>

        <div>

          <p className="profile-name">

            {
              user?.name ||
              "User"
            }

          </p>

          <p className="profile-role">

            {
              user?.role ||
              "Student"
            }

          </p>

        </div>

      </div>

    </div>
  );
}