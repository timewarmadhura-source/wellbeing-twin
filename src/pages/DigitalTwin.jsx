import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DigitalTwin() {
  const [latest, setLatest] = useState(null);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    try {
      const saved =
        JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

      setCheckins(saved);

      if (saved.length > 0) {
        setLatest(saved[saved.length - 1]);
      }
    } catch (error) {
      console.error("Error loading wellbeing data:", error);
      setCheckins([]);
      setLatest(null);
    }
  }, []);

  const cardStyle = {
    background: "rgba(17, 25, 48, 0.82)",
    border: "1px solid rgba(139, 92, 246, 0.2)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    backdropFilter: "blur(12px)",
  };

  const primaryButton = {
    padding: "13px 22px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#8b5cf6,#3b82f6)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  };

  const secondaryButton = {
    padding: "13px 22px",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  };

  function getStatus() {
    if (!latest) {
      return "Waiting for Data";
    }

    const mood = Number(latest.mood);
    const stress = Number(latest.stress);
    const sleep = Number(latest.sleep);

    if (stress >= 4 || mood <= 2 || sleep < 5) {
      return "Needs Attention";
    }

    if (stress >= 3 || mood === 3 || sleep < 7) {
      return "Moderate";
    }

    return "Stable";
  }

  const status = getStatus();

  function getStatusColor() {
    if (status === "Stable") return "#34d399";
    if (status === "Moderate") return "#fbbf24";
    if (status === "Needs Attention") return "#fb923c";
    return "#94a3b8";
  }

  function getStatusIcon() {
    if (status === "Stable") return "🟢";
    if (status === "Moderate") return "🟡";
    if (status === "Needs Attention") return "🟠";
    return "⚪";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 10% 10%, rgba(124,58,237,0.28), transparent 30%), radial-gradient(circle at 90% 20%, rgba(37,99,235,0.25), transparent 30%), #070b18",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        padding: "30px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
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
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
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
                  "0 0 30px rgba(139,92,246,0.45)",
              }}
            >
              🧠
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                My Digital Twin
              </h1>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#94a3b8",
                }}
              >
                Your personal wellbeing model
              </p>
            </div>
          </div>

          <Link
            to="/student"
            style={{
              ...secondaryButton,
            }}
          >
            ← Dashboard
          </Link>
        </header>


        {/* STATUS */}
        <section
          style={{
            ...cardStyle,
            marginBottom: "22px",
            background:
              "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(37,99,235,0.12))",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "25px",
            }}
          >
            <div>
              <p
                style={{
                  color: "#a78bfa",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                DIGITAL WELLBEING MODEL
              </p>

              <h2
                style={{
                  fontSize: "30px",
                  margin: "0 0 10px",
                }}
              >
                Your Twin is Learning 🧠
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  maxWidth: "650px",
                  lineHeight: "1.7",
                }}
              >
                Your Digital Twin learns from your wellbeing
                check-ins and creates a personal picture of
                your mood, stress, sleep and academic workload.
              </p>
            </div>

            <div
              style={{
                minWidth: "160px",
                textAlign: "center",
                padding: "22px",
                borderRadius: "18px",
                background: "rgba(0,0,0,0.25)",
                border:
                  "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: "42px" }}>
                {getStatusIcon()}
              </div>

              <strong
                style={{
                  color: getStatusColor(),
                  fontSize: "18px",
                }}
              >
                {status}
              </strong>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginTop: "5px",
                }}
              >
                Current status
              </p>
            </div>
          </div>
        </section>


        {/* DATA CARDS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(210px,1fr))",
            gap: "18px",
            marginBottom: "22px",
          }}
        >

          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(139,92,246,0.2),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "32px" }}>
              😊
            </div>

            <p style={{ color: "#94a3b8" }}>
              Mood
            </p>

            <h2
              style={{
                fontSize: "30px",
                margin: "8px 0",
              }}
            >
              {latest ? `${latest.mood} / 5` : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest reading
            </p>
          </div>


          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(245,158,11,0.14),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "32px" }}>
              ⚡
            </div>

            <p style={{ color: "#94a3b8" }}>
              Stress
            </p>

            <h2
              style={{
                fontSize: "30px",
                margin: "8px 0",
              }}
            >
              {latest ? `${latest.stress} / 5` : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest reading
            </p>
          </div>


          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(59,130,246,0.15),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "32px" }}>
              😴
            </div>

            <p style={{ color: "#94a3b8" }}>
              Sleep
            </p>

            <h2
              style={{
                fontSize: "30px",
                margin: "8px 0",
              }}
            >
              {latest ? `${latest.sleep} hrs` : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest reading
            </p>
          </div>


          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(16,185,129,0.13),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "32px" }}>
              📚
            </div>

            <p style={{ color: "#94a3b8" }}>
              Academic Workload
            </p>

            <h2
              style={{
                fontSize: "22px",
                margin: "8px 0",
              }}
            >
              {latest ? latest.workload : "--"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Latest reading
            </p>
          </div>

        </section>


        {/* PERSONAL MODEL */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
            marginBottom: "22px",
          }}
        >

          <div style={cardStyle}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "15px",
                background:
                  "rgba(139,92,246,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                marginBottom: "15px",
              }}
            >
              📊
            </div>

            <h2>Personal Pattern</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              The system learns from your previous
              check-ins and builds a personal baseline
              for your wellbeing.
            </p>

            <div
              style={{
                marginTop: "18px",
                padding: "14px",
                borderRadius: "12px",
                background:
                  "rgba(139,92,246,0.08)",
                color: "#c4b5fd",
              }}
            >
              📈{" "}
              <strong>{checkins.length}</strong>{" "}
              check-in
              {checkins.length !== 1 ? "s" : ""} recorded
            </div>
          </div>


          <div style={cardStyle}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "15px",
                background:
                  "rgba(59,130,246,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                marginBottom: "15px",
              }}
            >
              🔮
            </div>

            <h2>Pattern Prediction</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              As more check-ins are collected, your Digital
              Twin can identify relationships between your
              academic workload and wellbeing patterns.
            </p>

            <div
              style={{
                marginTop: "18px",
                padding: "14px",
                borderRadius: "12px",
                background:
                  "rgba(59,130,246,0.08)",
                color: "#93c5fd",
              }}
            >
              🤖 Model continuously learning
            </div>
          </div>

        </section>


        {/* HOW IT WORKS */}
        <section
          style={{
            ...cardStyle,
            marginBottom: "22px",
          }}
        >
          <h2
            style={{
              color: "#c4b5fd",
              marginBottom: "25px",
            }}
          >
            🔬 How Your Digital Twin Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(180px,1fr))",
              gap: "20px",
            }}
          >

            {[
              ["01", "Collect", "Record wellbeing data"],
              ["02", "Learn", "Build your personal baseline"],
              ["03", "Compare", "Find changes in your pattern"],
              ["04", "Support", "Suggest helpful actions"],
            ].map((item) => (
              <div
                key={item[0]}
                style={{
                  textAlign: "center",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    margin: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                    fontWeight: "bold",
                    boxShadow:
                      "0 0 20px rgba(139,92,246,0.25)",
                  }}
                >
                  {item[0]}
                </div>

                <h3>{item[1]}</h3>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "14px",
                    lineHeight: "1.6",
                  }}
                >
                  {item[2]}
                </p>
              </div>
            ))}

          </div>
        </section>


        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <Link
            to="/checkin"
            style={primaryButton}
          >
            📝 New Check-in
          </Link>

          <Link
            to="/pattern"
            style={secondaryButton}
          >
            🤖 Pattern Analysis
          </Link>

          <Link
            to="/chart"
            style={secondaryButton}
          >
            📈 View Trends
          </Link>
        </div>


        {/* EMPTY DATA MESSAGE */}
        {!latest && (
          <section
            style={{
              ...cardStyle,
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            <div style={{ fontSize: "45px" }}>
              📊
            </div>

            <h2>No wellbeing data yet</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.7",
                marginBottom: "18px",
              }}
            >
              Complete your first wellbeing check-in to
              start building your Digital Twin.
            </p>

            <Link
              to="/checkin"
              style={primaryButton}
            >
              Start First Check-in →
            </Link>
          </section>
        )}


        {/* DISCLAIMER */}
        <footer
          style={{
            textAlign: "center",
            padding: "30px 10px 15px",
            color: "#64748b",
            fontSize: "13px",
            lineHeight: "1.6",
          }}
        >
          🧠 Wellbeing Twin
          <br />

          Your wellbeing journey, understood through
          personal patterns.

          <br />
          <br />

          🔐 This system identifies wellbeing patterns
          and does not diagnose mental health conditions.
        </footer>

      </div>
    </div>
  );
}

export default DigitalTwin;