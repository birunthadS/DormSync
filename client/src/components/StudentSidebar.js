"use client";

import "./Sidebar.css";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

export default function StudentSidebar() {

  const pathname =
    usePathname();

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
      href:
        "/student/dashboard",
    },

    {
      name: "My Complaints",
      href:
        "/student/complaints",
    },

    {
      name: "Visitor Requests",
      href:
        "/student/visitors",
    },

    {
      name: "Notifications",
      href:
        "/student/notifications",
    },
  ];

  return (
    <div className="sidebar">

      <div>

        <div className="logo">

          <h1>DormSync</h1>

          <p>
            Student Panel
          </p>

        </div>

        <div className="nav-links">

          {links.map((link) => (

            <Link
              key={link.name}
              href={link.href}
              className={
                pathname ===
                link.href
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
              : "S"
          }

        </div>

        <div>

          <p className="profile-name">
            {user?.name}
          </p>

          <p className="profile-role">
            Student
          </p>

        </div>

      </div>

    </div>
  );
}