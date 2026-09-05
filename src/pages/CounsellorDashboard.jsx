import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

function CounsellorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const savedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    setAppointments(savedAppointments);
  }, []);

  function updateStatus(index, newStatus) {
    const updatedAppointments = appointments.map(
      (appointment, i) =>
        i === index
          ? { ...appointment, status: newStatus }
          : appointment
    );

    setAppointments(updatedAppointments);

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );
  }

  const pendingCount = appointments.filter(
    (a) => a.status === "Requested"
  ).length;

  const acceptedCount = appointments.filter(
    (a) => a.status === "Accepted"
  ).length;

  const rejectedCount = appointments.filter(
    (a) => a.status === "Rejected"
  ).length;

  return (
    <DashboardLayout>
      <div className="counsellor-page">

        {/* HERO */}
        <section className="counsellor-hero">
          <div>
            <span className="page-eyebrow">
              Counsellor Portal
            </span>

            <h1>Welcome, Counsellor 👋</h1>

            <p>
              Manage student support requests and
              counselling appointments in one place.
            </p>
          </div>

          <div className="counsellor-hero-icon">
            🧑‍⚕️
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="counsellor-section">

          <div className="section-heading">
            <div>
              <span className="page-eyebrow">
                Overview
              </span>

              <h2>Support Activity 💚</h2>
            </div>
          </div>

          <div className="counsellor-metrics-grid">

            <div className="counsellor-metric-card">
              <span className="metric-icon">📋</span>

              <span className="metric-label">
                Total Requests
              </span>

              <strong>{appointments.length}</strong>

              <small>
                Support requests
              </small>
            </div>

            <div className="counsellor-metric-card">
              <span className="metric-icon">⏳</span>

              <span className="metric-label">
                Pending
              </span>

              <strong>{pendingCount}</strong>

              <small>
                Awaiting response
              </small>
            </div>

            <div className="counsellor-metric-card">
              <span className="metric-icon">✅</span>

              <span className="metric-label">
                Accepted
              </span>

              <strong>{acceptedCount}</strong>

              <small>
                Confirmed appointments
              </small>
            </div>

            <div className="counsellor-metric-card">
              <span className="metric-icon">↩️</span>

              <span className="metric-label">
                Rejected
              </span>

              <strong>{rejectedCount}</strong>

              <small>
                Declined requests
              </small>
            </div>

          </div>
        </section>

        {/* APPOINTMENTS */}
        <section className="counsellor-section">

          <div className="section-heading">
            <div>
              <span className="page-eyebrow">
                Student Support
              </span>

              <h2>Appointment Requests 📅</h2>
            </div>

            <span className="counsellor-count">
              {appointments.length}{" "}
              {appointments.length === 1
                ? "request"
                : "requests"}
            </span>
          </div>

          {appointments.length === 0 ? (
            <div className="counsellor-empty-card">

              <div className="counsellor-empty-icon">
                🌱
              </div>

              <h3>
                No appointment requests yet
              </h3>

              <p>
                Student counselling requests will
                appear here when they are submitted.
              </p>

            </div>
          ) : (
            <div className="counsellor-appointments">

              {appointments.map((appointment, index) => (

                <div
                  className="counsellor-appointment-card"
                  key={index}
                >

                  <div className="appointment-header">

                    <div className="appointment-number">
                      <span>💬</span>
                    </div>

                    <div>
                      <span className="page-eyebrow">
                        Student Support Request
                      </span>

                      <h3>
                        Appointment #{index + 1}
                      </h3>
                    </div>

                    <span
                      className={`appointment-status ${
                        appointment.status === "Accepted"
                          ? "status-accepted"
                          : appointment.status === "Rejected"
                          ? "status-rejected"
                          : "status-pending"
                      }`}
                    >
                      {appointment.status ||
                        "Requested"}
                    </span>

                  </div>

                  <div className="appointment-details">

                    <div className="appointment-detail">
                      <span>🧑‍⚕️</span>

                      <div>
                        <small>Counsellor</small>
                        <strong>
                          {appointment.counsellor ||
                            "Not specified"}
                        </strong>
                      </div>
                    </div>

                    <div className="appointment-detail">
                      <span>📅</span>

                      <div>
                        <small>Date</small>
                        <strong>
                          {appointment.date ||
                            "Not specified"}
                        </strong>
                      </div>
                    </div>

                    <div className="appointment-detail">
                      <span>⏰</span>

                      <div>
                        <small>Time</small>
                        <strong>
                          {appointment.time ||
                            "Not specified"}
                        </strong>
                      </div>
                    </div>

                  </div>

                  <div className="appointment-reason">

                    <span>💭 Reason</span>

                    <p>
                      {appointment.reason ||
                        "No reason provided."}
                    </p>

                  </div>

                  {appointment.status === "Requested" && (
                    <div className="appointment-actions">

                      <button
                        className="btn-primary"
                        onClick={() =>
                          updateStatus(
                            index,
                            "Accepted"
                          )
                        }
                      >
                        ✅ Accept
                      </button>

                      <button
                        className="btn-secondary"
                        onClick={() =>
                          updateStatus(
                            index,
                            "Rejected"
                          )
                        }
                      >
                        ❌ Reject
                      </button>

                    </div>
                  )}

                  {appointment.status === "Accepted" && (
                    <div className="appointment-message accepted-message">
                      ✅ Appointment accepted successfully.
                    </div>
                  )}

                  {appointment.status === "Rejected" && (
                    <div className="appointment-message rejected-message">
                      ❌ Appointment request rejected.
                    </div>
                  )}

                </div>

              ))}

            </div>
          )}
        </section>

        {/* SUPPORT NOTE */}
        <section className="counsellor-support-card">

          <div className="counsellor-support-icon">
            💚
          </div>

          <div>
            <h2>
              A supportive space matters
            </h2>

            <p>
              Respond to student requests with
              empathy, confidentiality, and respect.
              Every conversation should feel safe.
            </p>
          </div>

        </section>

        {/* PRIVACY */}
        <section className="counsellor-privacy-card">

          <div className="privacy-card-icon">
            🔐
          </div>

          <div>
            <h3>
              Confidentiality & Privacy
            </h3>

            <p>
              Counselling information should remain
              confidential and accessible only to
              authorised users.
            </p>

            <p>
              Student wellbeing data should always be
              handled according to consent and privacy
              settings.
            </p>
          </div>

        </section>

      </div>
    </DashboardLayout>
  );
}

export default CounsellorDashboard;