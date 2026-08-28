import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentDashboard() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const checkins =
      JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

    if (checkins.length > 0) {
      setLatest(checkins[checkins.length - 1]);
    }
  }, []);

  const cardStyle = {
    background: "rgba(17, 25, 48, 0.75)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
    backdropFilter: "blur(12px)",
  };

  const buttonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#8b5cf6,#3b82f6)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 10% 10%, rgba(124,58,237,0.22), transparent 30%), radial-gradient(circle at 90% 20%, rgba(37,99,235,0.2), transparent 30%), #070b18",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        padding: "25px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >

        {/* HEADER */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                boxShadow:
                  "0 0 30px rgba(139,92,246,0.4)",
              }}
            >
              🧠
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "28px",
                }}
              >
                Wellbeing Twin
              </h1>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#94a3b8",
                }}
              >
                Student Dashboard
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                padding: "10px 15px",
                borderRadius: "25px",
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.2)",
                color: "#34d399",
              }}
            >
              ● System Active
            </div>

            <div
              style={{
                padding: "10px 15px",
                borderRadius: "25px",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              👤 Student
            </div>
          </div>
        </header>


        {/* WELCOME */}
        <section
          style={{
            ...cardStyle,
            marginBottom: "25px",
            background:
              "linear-gradient(135deg, rgba(79,70,229,0.35), rgba(37,99,235,0.18))",
          }}
        >
          <p
            style={{
              color: "#a78bfa",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            PERSONAL WELLBEING SPACE
          </p>

          <h2
            style={{
              fontSize: "32px",
              margin: "0 0 10px",
            }}
          >
            Welcome back 👋
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7",
              maxWidth: "700px",
            }}
          >
            Your Digital Twin continuously learns from your
            wellbeing check-ins and helps you understand
            changes in your mood, stress, sleep and academic
            workload.
          </p>
        </section>


        {/* STAT CARDS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >

          {/* MOOD */}
          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(139,92,246,0.2),rgba(17,25,48,0.8))",
            }}
          >
            <div style={{ fontSize: "32px" }}>😊</div>

            <p style={{ color: "#94a3b8" }}>
              Current Mood
            </p>

            <h2 style={{ fontSize: "32px", margin: "8px 0" }}>
              {latest ? `${latest.mood}/5` : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest check-in
            </p>
          </div>


          {/* STRESS */}
          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(245,158,11,0.14),rgba(17,25,48,0.8))",
            }}
          >
            <div style={{ fontSize: "32px" }}>⚡</div>

            <p style={{ color: "#94a3b8" }}>
              Stress Level
            </p>

            <h2 style={{ fontSize: "32px", margin: "8px 0" }}>
              {latest ? `${latest.stress}/5` : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest check-in
            </p>
          </div>


          {/* SLEEP */}
          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(59,130,246,0.15),rgba(17,25,48,0.8))",
            }}
          >
            <div style={{ fontSize: "32px" }}>😴</div>

            <p style={{ color: "#94a3b8" }}>
              Sleep
            </p>

            <h2 style={{ fontSize: "32px", margin: "8px 0" }}>
              {latest ? `${latest.sleep} hrs` : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest check-in
            </p>
          </div>


          {/* WORKLOAD */}
          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(16,185,129,0.13),rgba(17,25,48,0.8))",
            }}
          >
            <div style={{ fontSize: "32px" }}>📚</div>

            <p style={{ color: "#94a3b8" }}>
              Academic Workload
            </p>

            <h2 style={{ fontSize: "25px", margin: "8px 0" }}>
              {latest ? latest.workload : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest check-in
            </p>
          </div>

        </section>


        {/* DIGITAL TWIN + AI */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginBottom: "25px",
          }}
        >

          {/* DIGITAL TWIN */}
          <div style={cardStyle}>
            <div style={{ fontSize: "38px" }}>
              🧠
            </div>

            <h2>My Digital Twin</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              Your personal wellbeing model uses your
              recent check-ins, academic workload and
              routine patterns.
            </p>

            <div
              style={{
                margin: "20px 0",
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(16,185,129,0.1)",
                color: "#34d399",
              }}
            >
              ● {latest ? "Data Updated" : "Waiting for data"}
            </div>

            <Link to="/digital-twin" style={buttonStyle}>
              Open Digital Twin →
            </Link>
          </div>


          {/* AI */}
          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(124,58,237,0.22),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "38px" }}>
              🤖
            </div>

            <h2>AI Wellbeing Insight</h2>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: "1.7",
              }}
            >
              Your recent wellbeing pattern is compared
              with your personal baseline to detect
              meaningful changes.
            </p>

            <Link to="/pattern" style={buttonStyle}>
              View Pattern Analysis →
            </Link>
          </div>

        </section>


        {/* QUICK ACTIONS */}
        <section style={cardStyle}>
          <h2
            style={{
              fontSize: "25px",
              marginBottom: "8px",
            }}
          >
            ⚡ Quick Actions
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "20px",
            }}
          >
            Access your wellbeing tools quickly.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "12px",
            }}
          >

            <Link to="/checkin" style={buttonStyle}>
              📝 Daily Check-in
            </Link>

            <Link to="/history" style={buttonStyle}>
              📋 Wellbeing History
            </Link>

            <Link to="/chart" style={buttonStyle}>
              📈 Wellbeing Trends
            </Link>

            <Link to="/exams" style={buttonStyle}>
              📅 Exam Calendar
            </Link>

            <Link to="/workload" style={buttonStyle}>
              📚 Academic Workload
            </Link>

            <Link to="/digital-twin" style={buttonStyle}>
              🧠 Digital Twin
            </Link>

            <Link to="/privacy" style={buttonStyle}>
              🔐 Privacy & Consent
            </Link>

            <Link
              to="/counsellor-connect"
              style={buttonStyle}
            >
              🧑‍⚕️ Counsellor Support
            </Link>

          </div>
        </section>


        {/* FOOTER */}
        <footer
          style={{
            textAlign: "center",
            padding: "35px 10px 15px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          🧠 Wellbeing Twin

          <br />

          <span>
            Your wellbeing journey, understood through
            personal patterns.
          </span>

          <br />
          <br />

          🔐 This system identifies wellbeing patterns
          and does not diagnose mental health conditions.
        </footer>

      </div>
    </div>
  );
}

export default StudentDashboard;