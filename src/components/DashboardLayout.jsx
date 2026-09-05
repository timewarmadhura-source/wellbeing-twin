import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function CounsellorConnect() {
  const [selectedCounsellor, setSelectedCounsellor] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const counsellors = [
    {
      id: 1,
      name: "Dr. Ananya Sharma",
      role: "Student Counsellor",
      specialty: "Academic stress & wellbeing",
      available: true,
      avatar: "👩🏻‍⚕️",
      color: "green",
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      role: "Wellbeing Counsellor",
      specialty: "Stress & personal wellbeing",
      available: true,
      avatar: "👩🏼‍⚕️",
      color: "blue",
    },
    {
      id: 3,
      name: "Dr. Riya Kulkarni",
      role: "Student Support",
      specialty: "Academic & career guidance",
      available: false,
      avatar: "👩🏽‍⚕️",
      color: "pink",
    },
  ];

  const openCounsellor = (counsellor) => {
    setSelectedCounsellor(counsellor);
    setSuccessMessage("");
    setShowMessage(true);
  };

  const openAppointment = () => {
    setSelectedCounsellor(null);
    setSuccessMessage("");
    setShowMessage(true);
  };

  const closeModal = () => {
    setShowMessage(false);
    setSuccessMessage("");
  };

  const submitRequest = () => {
    if (!appointmentDate || !appointmentTime || !reason.trim()) {
      alert("Please select a date, time, and enter a reason.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      student: "Madhura T.",
      counsellor: selectedCounsellor
        ? selectedCounsellor.name
        : "Counsellor",
      date: appointmentDate,
      time: appointmentTime,
      reason: reason.trim(),
      status: "Requested",
      createdAt: new Date().toISOString(),
    };

    const existingAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    const updatedAppointments = [
      ...existingAppointments,
      newAppointment,
    ];

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    setSuccessMessage(
      "Your counselling request has been sent successfully."
    );

    setAppointmentDate("");
    setAppointmentTime("");
    setReason("");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="eyebrow">SUPPORT & WELLBEING</div>

          <h1>Counsellor Connect</h1>

          <p>
            Talk to someone when you need support. You don't have to
            handle everything alone.
          </p>
        </div>
      </div>

      {/* Welcome */}
      <section className="counsellor-welcome">
        <div className="counsellor-welcome-icon">
          💚
        </div>

        <div className="counsellor-welcome-content">
          <span>YOU ARE NOT ALONE</span>

          <h2>It's okay to ask for help.</h2>

          <p>
            Connecting with a counsellor can help you understand your
            feelings, manage academic pressure, and build healthy habits.
          </p>
        </div>
      </section>

      {/* Counsellors */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Available Counsellors</h2>

            <p>
              Choose someone you would like to connect with.
            </p>
          </div>
        </div>

        <div className="counsellor-grid">
          {counsellors.map((counsellor) => (
            <div
              className="counsellor-card"
              key={counsellor.id}
            >
              <div
                className={`counsellor-avatar ${counsellor.color}`}
              >
                {counsellor.avatar}
              </div>

              <div className="counsellor-status">
                <span
                  className={
                    counsellor.available
                      ? "status-dot online"
                      : "status-dot offline"
                  }
                ></span>

                {counsellor.available
                  ? "Available now"
                  : "Currently away"}
              </div>

              <h3>{counsellor.name}</h3>

              <div className="counsellor-role">
                {counsellor.role}
              </div>

              <p>{counsellor.specialty}</p>

              <button
                type="button"
                className={
                  counsellor.available
                    ? "primary-button counsellor-button"
                    : "secondary-button counsellor-button disabled-button"
                }
                disabled={!counsellor.available}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  if (counsellor.available) {
                    openCounsellor(counsellor);
                  }
                }}
              >
                {counsellor.available
                  ? "💬 Connect"
                  : "Not Available"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment */}
      <section className="appointment-card">
        <div className="appointment-icon">
          📅
        </div>

        <div className="appointment-content">
          <span className="appointment-label">
            NEED A SPECIFIC TIME?
          </span>

          <h2>Schedule a counselling session</h2>

          <p>
            Choose a convenient time for a private conversation with
            a counsellor.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            openAppointment();
          }}
        >
          Request Appointment
        </button>
      </section>

      {/* Support Topics */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>What can you talk about?</h2>

            <p>
              There is no need to have a perfect reason to reach out.
            </p>
          </div>
        </div>

        <div className="support-topics">
          <div className="support-topic">
            <span>📚</span>

            <div>
              <strong>Academic pressure</strong>

              <p>
                Exams, workload, assignments or study stress.
              </p>
            </div>
          </div>

          <div className="support-topic">
            <span>😟</span>

            <div>
              <strong>Stress & worries</strong>

              <p>
                When you feel overwhelmed or unable to relax.
              </p>
            </div>
          </div>

          <div className="support-topic">
            <span>💭</span>

            <div>
              <strong>Personal concerns</strong>

              <p>
                Anything that is affecting your day-to-day wellbeing.
              </p>
            </div>
          </div>

          <div className="support-topic">
            <span>🎯</span>

            <div>
              <strong>Future & career</strong>

              <p>
                Career decisions, goals and uncertainty about the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Note */}
      <div className="support-note">
        <span>🛡️</span>

        <div>
          <strong>Important</strong>

          <p>
            This feature is for general student support. If you are in
            immediate danger or facing an emergency, contact your local
            emergency service or a trusted person immediately.
          </p>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="page-actions">
        <Link
          to="/pattern-analysis"
          className="secondary-button"
        >
          View AI Insights
        </Link>

        <Link
          to="/student-dashboard"
          className="primary-button"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Modal */}
      {showMessage && (
        <div
          className="connect-overlay"
          onClick={closeModal}
        >
          <div
            className="connect-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
            >
              ×
            </button>

            <div className="modal-icon">
              {selectedCounsellor ? "💬" : "📅"}
            </div>

            <h2>
              {selectedCounsellor
                ? `Connect with ${selectedCounsellor.name}`
                : "Request Appointment"}
            </h2>

            {successMessage ? (
              <div>
                <p>{successMessage}</p>

                <div
                  style={{
                    marginTop: "20px",
                    padding: "14px",
                    borderRadius: "12px",
                    background: "#e8f7f1",
                    color: "#138a68",
                    fontWeight: "600",
                  }}
                >
                  📋 Status: Requested
                </div>

                <button
                  type="button"
                  className="primary-button modal-button"
                  onClick={closeModal}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {selectedCounsellor ? (
                  <p>
                    Send a counselling request to{" "}
                    <strong>
                      {selectedCounsellor.name}
                    </strong>
                    .
                  </p>
                ) : (
                  <p>
                    Choose a date and time for your counselling
                    session.
                  </p>
                )}

                {/* Date */}
                <div
                  className="login-field"
                  style={{ marginTop: "20px" }}
                >
                  <label className="login-label">
                    Preferred Date
                  </label>

                  <input
                    type="date"
                    className="login-input"
                    value={appointmentDate}
                    onChange={(event) =>
                      setAppointmentDate(event.target.value)
                    }
                  />
                </div>

                {/* Time */}
                <div
                  className="login-field"
                  style={{ marginTop: "15px" }}
                >
                  <label className="login-label">
                    Preferred Time
                  </label>

                  <input
                    type="time"
                    className="login-input"
                    value={appointmentTime}
                    onChange={(event) =>
                      setAppointmentTime(event.target.value)
                    }
                  />
                </div>

                {/* Reason */}
                <div
                  className="login-field"
                  style={{ marginTop: "15px" }}
                >
                  <label className="login-label">
                    Reason for requesting support
                  </label>

                  <textarea
                    className="login-input"
                    rows="4"
                    placeholder="Briefly tell us what you would like support with..."
                    value={reason}
                    onChange={(event) =>
                      setReason(event.target.value)
                    }
                    style={{
                      resize: "vertical",
                      padding: "12px",
                    }}
                  />
                </div>

                {/* Send Request */}
                <button
                  type="button"
                  className="primary-button modal-button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    submitRequest();
                  }}
                >
                  📩 Send Request
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default CounsellorConnect;