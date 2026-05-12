"use client";

import "./notifications.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import StudentSidebar from "@/components/StudentSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentNotifications() {

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
          `${process.env.NEXT_PUBLIC_API_URL}/api/student/notifications`,
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

        <StudentSidebar />

        <div className="page-main">

          <Topbar title="Notifications" />

          <div className="page-content">

            <div className="notifications-list">

              {notifications.length === 0 ? (

                <div className="notification-card">

                  <p>
                    No notifications available.
                  </p>

                </div>

              ) : (

                notifications.map(
                  (notification) => (

                    <div
                      className="notification-card"
                      key={
                        notification._id
                      }
                    >

                      <p className="notification-message">

                        {
                          notification.message
                        }

                      </p>

                      <p className="notification-time">

                        {
                          new Date(
                            notification.createdAt
                          ).toLocaleString()
                        }

                      </p>

                    </div>

                  )
                )

              )}

            </div>

          </div>

        </div>

      </div>

    </ProtectedRoute>
  );
}