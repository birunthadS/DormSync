"use client";

import "./visitors.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AdminSidebar from "@/components/AdminSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminVisitors() {

  const [visitors, setVisitors] =
    useState([]);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        )
      : null;

  const fetchVisitors =
    async () => {

      try {

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/visitors`,
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        setVisitors(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    if (user) {
      fetchVisitors();
    }

  }, []);

  const updateStatus =
  async (id, status) => {

    try {

      await axios.put(

        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/visitors/${id}`,

        { status },

        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      fetchVisitors();

    } catch (error) {

      console.log(error);
    }
};

  return (

    <ProtectedRoute>

      <div className="page-layout">

        <AdminSidebar />

        <div className="page-main">

          <Topbar title="Visitor Approvals" />

          <div className="page-content">

            <div className="visitors-grid">

              {visitors.map(
                (visitor) => (

                  <div
                    className="visitor-card"
                    key={
                      visitor._id
                    }
                  >

                    <h2>
                      {
                        visitor.visitorName
                      }
                    </h2>

                    <p>
                      Room {
                        visitor.roomNumber
                      }
                    </p>

                    <p>
                      {
                        visitor.purpose
                      }
                    </p>

                    <p>
                      Student:
                      {" "}
                      {
                        visitor.createdBy
                          ?.name
                      }
                    </p>

                    <select
                      value={
                        visitor.status
                      }

                      onChange={(e) =>
                        updateStatus(
                          visitor._id,
                          e.target.value
                        )
                      }
                    >

                      <option>
                        Pending
                      </option>

                      <option>
                        Approved
                      </option>

                      <option>
                        Rejected
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