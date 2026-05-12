"use client";

import "./complaints.css";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import StudentSidebar from "@/components/StudentSidebar";

import Topbar from "@/components/Topbar";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function StudentComplaints() {

  const [complaints, setComplaints] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "WiFi",
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

  const fetchComplaints =
    async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/complaints/student",
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/complaints`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${user.token}`,
            },
          }
        );

        alert(
          "Complaint Submitted"
        );

        setFormData({
          title: "",
          description: "",
          category: "WiFi",
          roomNumber: "",
        });

        fetchComplaints();

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

          <Topbar title="My Complaints" />

          <div className="page-content">

            <form
              className="complaint-form"
              onSubmit={handleSubmit}
            >

              <div className="form-grid">

                <input
                  type="text"
                  name="title"
                  placeholder="Complaint title"
                  className="input-field"
                  value={
                    formData.title
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
                name="description"
                placeholder="Describe issue..."
                className="input-field"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                required
              />

              <div className="form-bottom">

                <select
                  name="category"
                  className="input-field"
                  value={
                    formData.category
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option>
                    WiFi
                  </option>

                  <option>
                    Electricity
                  </option>

                  <option>
                    Plumbing
                  </option>

                </select>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Submit
                </button>

              </div>

            </form>

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
                      Room {
                        complaint.roomNumber
                      }
                    </p>

                    <p>
                      {
                        complaint.description
                      }
                    </p>

                    <div
                      className={`status ${
                        complaint.status ===
                        "Resolved"
                          ? "resolved"
                          : complaint.status ===
                            "In Progress"
                          ? "progress"
                          : "pending"
                      }`}
                    >
                      {
                        complaint.status
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