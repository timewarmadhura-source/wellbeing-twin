import { useEffect, useState } from "react";

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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🧑‍⚕️ Counsellor Dashboard</h1>

      <p>
        Welcome! Manage student support requests and
        appointments from here.
      </p>

      <hr />

      <h2>📅 Appointment Requests</h2>

      {appointments.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
          }}
        >
          <p>No appointment requests yet.</p>
        </div>
      ) : (
        appointments.map((appointment, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "25px",
              marginTop: "20px",
              borderRadius: "15px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h3>
              Student Appointment #{index + 1}
            </h3>

            <p>
              <strong>Counsellor:</strong>{" "}
              {appointment.counsellor}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {appointment.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {appointment.time}
            </p>

            <p>
              <strong>Reason:</strong>{" "}
              {appointment.reason}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {appointment.status}
            </p>

            {appointment.status === "Requested" && (
              <div>
                <button
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
              <p>
                ✅ Appointment accepted.
              </p>
            )}

            {appointment.status === "Rejected" && (
              <p>
                ❌ Appointment rejected.
              </p>
            )}
          </div>
        ))
      )}

      <hr />

      <h2>📊 Counsellor Overview</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>📋 Requests</h3>
          <h2>{appointments.length}</h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>✅ Accepted</h3>
          <h2>
            {
              appointments.filter(
                (a) => a.status === "Accepted"
              ).length
            }
          </h2>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>⏳ Pending</h3>
          <h2>
            {
              appointments.filter(
                (a) => a.status === "Requested"
              ).length
            }
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CounsellorDashboard;