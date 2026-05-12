"use client";

import "./dashboard.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {

  const [stats, setStats] =
    useState({
      complaints: 0,
      pendingComplaints: 0,
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/complaints`,
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        const visitorsRes =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/visitors`,
            {
              headers: {
                Authorization:
                  `Bearer ${user.token}`,
              },
            }
          );

        setStats({

          complaints:
            complaintsRes.data.length,

          pendingComplaints:
            complaintsRes.data.filter(
              (c) =>
                c.status ===
                "Pending"
            ).length,

          visitors:
            visitorsRes.data.length,

          pendingVisitors:
            visitorsRes.data.filter(
              (v) =>
                v.status ===
                "Pending"
            ).length,
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

        <AdminSidebar />

        <div className="page-main">

          <Topbar title="Admin Dashboard" />

          <div className="page-content">

            <div className="dashboard-grid">

              <div className="dashboard-card">

                <h3>
                  Total Complaints
                </h3>

                <h1>
                  {
                    stats.complaints
                  }
                </h1>

              </div>

              <div className="dashboard-card">

                <h3>
                  Pending Complaints
                </h3>

                <h1>
                  {
                    stats.pendingComplaints
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
                  Pending Visitors
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