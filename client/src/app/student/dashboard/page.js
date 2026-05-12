"use client";

import "./dashboard.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import StudentSidebar from "@/components/StudentSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentDashboard() {

  const [stats, setStats] =
    useState({
      complaints: 0,
      visitors: 0,
      pendingVisitors: 0,
    });

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        )
      : null;

  const fetchData =
    async () => {

      try {

        const complaintsRes =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/complaints/student`,
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        const visitorsRes =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/student/visitors`,
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        const complaints =
          complaintsRes.data.length;

        const visitors =
          visitorsRes.data.length;

        const pendingVisitors =
          visitorsRes.data.filter(
            (v) =>
              v.status ===
              "Pending"
          ).length;

        setStats({
          complaints,
          visitors,
          pendingVisitors,
        });

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    if (user) {
      fetchData();
    }

  }, []);

  return (

    <ProtectedRoute>

      <div className="page-layout">

        <StudentSidebar />

        <div className="page-main">

          <Topbar title="Student Dashboard" />

          <div className="page-content">

            <div className="dashboard-banner">

              <h1>
                Welcome Back
              </h1>

              <p>
                Track your complaints,
                visitor requests and
                hostel activities.
              </p>

            </div>

            <div className="dashboard-grid">

              <div className="dashboard-card">

                <h3>
                  My Complaints
                </h3>

                <h1>
                  {
                    stats.complaints
                  }
                </h1>

              </div>

              <div className="dashboard-card">

                <h3>
                  Visitor Requests
                </h3>

                <h1>
                  {
                    stats.visitors
                  }
                </h1>

              </div>

              <div className="dashboard-card">

                <h3>
                  Pending Requests
                </h3>

                <h1>
                  {
                    stats.pendingVisitors
                  }
                </h1>

              </div>

            </div>

          </div>

        </div>

      </div>

    </ProtectedRoute>
  );
}