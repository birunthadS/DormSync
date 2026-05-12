"use client";

import "./visitors.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import StudentSidebar from "@/components/StudentSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentVisitors() {

  const [visitors, setVisitors] =
    useState([]);

  const [formData, setFormData] =
    useState({
      visitorName: "",
      purpose: "",
      roomNumber: "",
    });

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
          `${process.env.NEXT_PUBLIC_API_URL}/api/student/visitors`,
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

      try {

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/student/visitors`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        alert(
          "Visitor Request Created"
        );

        setFormData({
          visitorName: "",
          purpose: "",
          roomNumber: "",
        });

        fetchVisitors();

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Failed"
        );
      }
    };

  return (

    <ProtectedRoute>

      <div className="page-layout">

        <StudentSidebar />

        <div className="page-main">

          <Topbar title="Visitor Requests" />

          <div className="page-content">

            <form
              className="visitor-form"
              onSubmit={handleSubmit}
            >

              <div className="form-grid">

                <input
                  type="text"
                  name="visitorName"
                  placeholder="Visitor Name"
                  className="input-field"
                  value={
                    formData.visitorName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <input
                  type="text"
                  name="roomNumber"
                  placeholder="Room Number"
                  className="input-field"
                  value={
                    formData.roomNumber
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              <textarea
                name="purpose"
                placeholder="Purpose..."
                className="input-field"
                value={
                  formData.purpose
                }
                onChange={
                  handleChange
                }
                required
              />

              <button
                type="submit"
                className="primary-button"
              >
                Create Request
              </button>

            </form>

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

                    <div
                      className={`status ${
                        visitor.status ===
                        "Approved"
                          ? "resolved"
                          : visitor.status ===
                            "Rejected"
                          ? "rejected"
                          : "pending"
                      }`}
                    >
                      {
                        visitor.status
                      }
                    </div>

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