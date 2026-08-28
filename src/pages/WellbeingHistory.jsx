import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function WellbeingHistory() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const savedCheckins =
      JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

    setCheckins(savedCheckins);
  }, []);

  const cardStyle = {
    background: "rgba(17, 25, 48, 0.82)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    backdropFilter: "blur(12px)",
  };

  const getMoodText = (mood) => {
    const value = Number(mood);

    if (value <= 1) return "Very Low";
    if (value === 2) return "Low";
    if (value === 3) return "Okay";
    if (value === 4) return "Good";
    return "Excellent";
  };

  const getStressText = (stress) => {
    const value = Number(stress);

    if (value <= 1) return "Very Low";
    if (value === 2) return "Low";
    if (value === 3) return "Moderate";
    if (value === 4) return "High";
    return "Very High";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 10% 10%, rgba(124,58,237,0.25), transparent 30%), radial-gradient(circle at 90% 20%, rgba(37,99,235,0.22), transparent 30%), #070b18",
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
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div>
            <p
              style={{
                color: "#a78bfa",
                fontWeight: "600",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              PERSONAL WELLBEING DATA
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "38px",
              }}
            >
              📋 Wellbeing History
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
              }}
            >
              Review your previous wellbeing check-ins and
              understand your journey over time.
            </p>
          </div>

          <Link
            to="/student"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                padding: "11px 18px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                cursor: "pointer",
              }}
            >
              ← Dashboard
            </button>
          </Link>
        </header>

        {/* SUMMARY */}

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(200px,1fr))",
            gap: "18px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(139,92,246,0.18),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "30px" }}>📊</div>

            <p style={{ color: "#94a3b8" }}>
              Total Check-ins
            </p>

            <h2
              style={{
                fontSize: "32px",
                margin: "8px 0",
              }}
            >
              {checkins.length}
            </h2>

            <p style={{ color: "#64748b" }}>
              Recorded entries
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(16,185,129,0.14),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "30px" }}>🧠</div>

            <p style={{ color: "#94a3b8" }}>
              Digital Twin
            </p>

            <h2
              style={{
                fontSize: "22px",
                margin: "8px 0",
              }}
            >
              {checkins.length > 0
                ? "Learning"
                : "Waiting"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Pattern collection
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(59,130,246,0.14),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "30px" }}>📈</div>

            <p style={{ color: "#94a3b8" }}>
              Tracking Status
            </p>

            <h2
              style={{
                fontSize: "22px",
                margin: "8px 0",
              }}
            >
              {checkins.length >= 2
                ? "Active"
                : "Getting Started"}
            </h2>

            <p style={{ color: "#64748b" }}>
              Personal pattern
            </p>
          </div>
        </section>

        {/* NO DATA */}

        {checkins.length === 0 && (
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
              padding: "60px 30px",
            }}
          >
            <div
              style={{
                fontSize: "60px",
                marginBottom: "20px",
              }}
            >
              📭
            </div>

            <h2>No check-ins yet</h2>

            <p
              style={{
                color: "#94a3b8",
                maxWidth: "550px",
                margin: "auto",
                lineHeight: "1.7",
              }}
            >
              Your wellbeing history will appear here after
              you complete your first Daily Check-in.
            </p>

            <Link
              to="/checkin"
              style={{
                display: "inline-block",
                marginTop: "25px",
                textDecoration: "none",
              }}
            >
              <button
                style={{
                  padding: "13px 22px",
                  border: "none",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                📝 Complete Check-in
              </button>
            </Link>
          </div>
        )}

        {/* HISTORY */}

        {checkins.length > 0 && (
          <section>
            <div
              style={{
                ...cardStyle,
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  fontSize: "25px",
                }}
              >
                🗓️ Your Check-in Timeline
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: 0,
                }}
              >
                Your most recent wellbeing information is
                shown first.
              </p>
            </div>

            {[...checkins]
              .reverse()
              .map((checkin, index) => {
                const actualIndex =
                  checkins.length - index;

                return (
                  <div
                    key={index}
                    style={{
                      ...cardStyle,
                      marginBottom: "18px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* TOP */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      <div>
                        <p
                          style={{
                            color: "#a78bfa",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          CHECK-IN #{actualIndex}
                        </p>

                        <h2
                          style={{
                            margin: "5px 0",
                          }}
                        >
                          {checkin.date}
                        </h2>
                      </div>

                      <div
                        style={{
                          padding: "8px 14px",
                          borderRadius: "20px",
                          background:
                            "rgba(139,92,246,0.12)",
                          color: "#c4b5fd",
                          fontSize: "13px",
                        }}
                      >
                        📌 Recorded
                      </div>
                    </div>

                    {/* METRICS */}

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit,minmax(180px,1fr))",
                        gap: "12px",
                      }}
                    >
                      {/* MOOD */}

                      <div
                        style={{
                          background:
                            "rgba(139,92,246,0.10)",
                          borderRadius: "14px",
                          padding: "18px",
                        }}
                      >
                        <div style={{ fontSize: "28px" }}>
                          😊
                        </div>

                        <p
                          style={{
                            color: "#94a3b8",
                            marginTop: "8px",
                          }}
                        >
                          Mood
                        </p>

                        <strong
                          style={{
                            fontSize: "21px",
                          }}
                        >
                          {checkin.mood}/5
                        </strong>

                        <p
                          style={{
                            color: "#a78bfa",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        >
                          {getMoodText(checkin.mood)}
                        </p>
                      </div>

                      {/* STRESS */}

                      <div
                        style={{
                          background:
                            "rgba(245,158,11,0.10)",
                          borderRadius: "14px",
                          padding: "18px",
                        }}
                      >
                        <div style={{ fontSize: "28px" }}>
                          ⚡
                        </div>

                        <p
                          style={{
                            color: "#94a3b8",
                            marginTop: "8px",
                          }}
                        >
                          Stress
                        </p>

                        <strong
                          style={{
                            fontSize: "21px",
                          }}
                        >
                          {checkin.stress}/5
                        </strong>

                        <p
                          style={{
                            color: "#fbbf24",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        >
                          {getStressText(checkin.stress)}
                        </p>
                      </div>

                      {/* SLEEP */}

                      <div
                        style={{
                          background:
                            "rgba(59,130,246,0.10)",
                          borderRadius: "14px",
                          padding: "18px",
                        }}
                      >
                        <div style={{ fontSize: "28px" }}>
                          😴
                        </div>

                        <p
                          style={{
                            color: "#94a3b8",
                            marginTop: "8px",
                          }}
                        >
                          Sleep
                        </p>

                        <strong
                          style={{
                            fontSize: "21px",
                          }}
                        >
                          {checkin.sleep} hrs
                        </strong>

                        <p
                          style={{
                            color: "#60a5fa",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        >
                          Sleep duration
                        </p>
                      </div>

                      {/* WORKLOAD */}

                      <div
                        style={{
                          background:
                            "rgba(16,185,129,0.10)",
                          borderRadius: "14px",
                          padding: "18px",
                        }}
                      >
                        <div style={{ fontSize: "28px" }}>
                          📚
                        </div>

                        <p
                          style={{
                            color: "#94a3b8",
                            marginTop: "8px",
                          }}
                        >
                          Workload
                        </p>

                        <strong
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          {checkin.workload}
                        </strong>

                        <p
                          style={{
                            color: "#34d399",
                            fontSize: "13px",
                            marginTop: "5px",
                          }}
                        >
                          Academic pressure
                        </p>
                      </div>
                    </div>

                    {/* NOTE */}

                    {checkin.note && (
                      <div
                        style={{
                          marginTop: "18px",
                          padding: "16px",
                          borderRadius: "12px",
                          background:
                            "rgba(255,255,255,0.04)",
                          border:
                            "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <p
                          style={{
                            color: "#a78bfa",
                            fontWeight: "bold",
                            marginBottom: "7px",
                          }}
                        >
                          💬 Your Note
                        </p>

                        <p
                          style={{
                            color: "#cbd5e1",
                            lineHeight: "1.6",
                          }}
                        >
                          {checkin.note}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
          </section>
        )}

        {/* BOTTOM ACTIONS */}

        {checkins.length > 0 && (
          <div
            style={{
              ...cardStyle,
              marginTop: "25px",
              textAlign: "center",
            }}
          >
            <h2>Keep your Digital Twin learning 🧠</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.6",
              }}
            >
              Regular check-ins help the system understand
              your personal baseline and identify changes.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "20px",
              }}
            >
              <Link
                to="/checkin"
                style={{
                  textDecoration: "none",
                }}
              >
                <button
                  style={{
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "10px",
                    background:
                      "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  📝 New Check-in
                </button>
              </Link>

              <Link
                to="/chart"
                style={{
                  textDecoration: "none",
                }}
              >
                <button
                  style={{
                    padding: "12px 20px",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    background:
                      "rgba(255,255,255,0.06)",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  📈 View Trends
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* FOOTER */}

        <footer
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            padding: "35px 10px 15px",
          }}
        >
          🧠 Wellbeing Twin
          <br />
          Your wellbeing journey, understood through personal
          patterns.
        </footer>
      </div>
    </div>
  );
}

export default WellbeingHistory;