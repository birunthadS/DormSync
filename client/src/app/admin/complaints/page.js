"use client";

import "./complaints.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminComplaints() {

  const [complaints, setComplaints] =
    useState([]);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        )
      : null;

  const fetchComplaints =
    async () => {

      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/complaints`,
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        setComplaints(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    if (user) {
      fetchComplaints();
    }

  }, []);

  const updateStatus =
    async (id, status) => {

      try {

        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/complaints/${id}`,

          { status },

          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        fetchComplaints();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <ProtectedRoute>

      <div className="page-layout">

        <AdminSidebar />

        <div className="page-main">

          <Topbar title="Manage Complaints" />

          <div className="page-content">

            <div className="complaints-grid">

              {complaints.map(
                (complaint) => (

                  <div
                    className="complaint-card"
                    key={
                      complaint._id
                    }
                  >

                    <h2>
                      {
                        complaint.title
                      }
                    </h2>

                    <p>
                      {
                        complaint.description
                      }
                    </p>

                    <p>
                      Room {
                        complaint.roomNumber
                      }
                    </p>

                    <p>
                      Student:
                      {" "}
                      {
                        complaint.createdBy
                          ?.name
                      }
                    </p>

                    <select
                      value={
                        complaint.status
                      }

                      onChange={(e) =>
                        updateStatus(
                          complaint._id,
                          e.target.value
                        )
                      }
                    >

                      <option>
                        Pending
                      </option>

                      <option>
                        In Progress
                      </option>

                      <option>
                        Resolved
                      </option>

                    </select>

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