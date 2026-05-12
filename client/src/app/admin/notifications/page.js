"use client";

import "./notifications.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminNotifications() {

  const [notifications, setNotifications] =
    useState([]);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        )
      : null;

  const fetchNotifications =
    async () => {

      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications`,
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        setNotifications(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    if (user) {
      fetchNotifications();
    }

  }, []);

  return (

    <ProtectedRoute>

      <div className="page-layout">

        <AdminSidebar />

        <div className="page-main">

          <Topbar title="Admin Notifications" />

          <div className="page-content">

            <div className="notifications-list">

              {notifications.map(
                (notification) => (

                  <div
                    className="notification-card"
                    key={
                      notification._id
                    }
                  >

                    <p>
                      {
                        notification.message
                      }
                    </p>

                    <small>

                      {
                        new Date(
                          notification.createdAt
                        ).toLocaleString()
                      }

                    </small>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </ProtectedRoute>
  );
}