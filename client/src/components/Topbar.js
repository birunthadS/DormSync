"use client";

import "./Topbar.css";

export default function Topbar({
  title,
}) {

  return (
    <div className="topbar">

      <div>

        <h1>{title}</h1>

        <p>
          Manage hostel operations
        </p>

      </div>

      <button>
        Live System
      </button>

    </div>
  );
}