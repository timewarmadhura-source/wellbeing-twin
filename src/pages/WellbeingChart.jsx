import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function WellbeingChart() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

    setCheckins(saved);
  }, []);

  const data = checkins.map((item, index) => ({
    day: `Day ${index + 1}`,
    mood: Number(item.mood),
    stress: Number(item.stress),
    sleep: Number(item.sleep),
  }));

  const cardStyle = {
    background: "rgba(17,25,48,0.82)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    backdropFilter: "blur(12px)",
  };

  const buttonStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#8b5cf6,#3b82f6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const average = (values) => {
    if (values.length === 0) return 0;

    return (
      values.reduce((sum, value) => sum + Number(value), 0) /
      values.length
    );
  };

  const averageMood = average(
    checkins.map((item) => item.mood)
  );

  const averageStress = average(
    checkins.map((item) => item.stress)
  );

  const averageSleep = average(
    checkins.map((item) => item.sleep)
  );

  const latest =
    checkins.length > 0
      ? checkins[checkins.length - 1]
      : null;

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
          maxWidth: "1150px",
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
                fontSize: "13px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              PERSONAL WELLBEING ANALYTICS
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "38px",
              }}
            >
              📈 Wellbeing Trends
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
              }}
            >
              Visualize how your wellbeing changes over time.
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
                border:
                  "1px solid rgba(255,255,255,0.1)",
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

        {/* NO DATA */}

        {checkins.length === 0 ? (
          <div
            style={{
              ...cardStyle,
              textAlign: "center",
              padding: "70px 30px",
            }}
          >
            <div
              style={{
                fontSize: "65px",
                marginBottom: "20px",
              }}
            >
              📊
            </div>

            <h2>No wellbeing data yet</h2>

            <p
              style={{
                color: "#94a3b8",
                maxWidth: "550px",
                margin: "auto",
                lineHeight: "1.7",
              }}
            >
              Complete a few Daily Check-ins and your
              wellbeing trends will appear here.
            </p>

            <Link
              to="/checkin"
              style={{
                display: "inline-block",
                marginTop: "25px",
              }}
            >
              <button style={buttonStyle}>
                📝 Start Check-in
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* SUMMARY CARDS */}

            <section
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(210px,1fr))",
                gap: "18px",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  ...cardStyle,
                  background:
                    "linear-gradient(145deg,rgba(139,92,246,0.20),rgba(17,25,48,0.85))",
                }}
              >
                <div style={{ fontSize: "30px" }}>😊</div>

                <p style={{ color: "#94a3b8" }}>
                  Average Mood
                </p>

                <h2
                  style={{
                    fontSize: "32px",
                    margin: "8px 0",
                  }}
                >
                  {averageMood.toFixed(1)}
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#64748b",
                    }}
                  >
                    {" "}
                    / 5
                  </span>
                </h2>

                <p style={{ color: "#a78bfa" }}>
                  Personal average
                </p>
              </div>

              <div
                style={{
                  ...cardStyle,
                  background:
                    "linear-gradient(145deg,rgba(245,158,11,0.15),rgba(17,25,48,0.85))",
                }}
              >
                <div style={{ fontSize: "30px" }}>⚡</div>

                <p style={{ color: "#94a3b8" }}>
                  Average Stress
                </p>

                <h2
                  style={{
                    fontSize: "32px",
                    margin: "8px 0",
                  }}
                >
                  {averageStress.toFixed(1)}
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#64748b",
                    }}
                  >
                    {" "}
                    / 5
                  </span>
                </h2>

                <p style={{ color: "#fbbf24" }}>
                  Personal average
                </p>
              </div>

              <div
                style={{
                  ...cardStyle,
                  background:
                    "linear-gradient(145deg,rgba(59,130,246,0.15),rgba(17,25,48,0.85))",
                }}
              >
                <div style={{ fontSize: "30px" }}>😴</div>

                <p style={{ color: "#94a3b8" }}>
                  Average Sleep
                </p>

                <h2
                  style={{
                    fontSize: "32px",
                    margin: "8px 0",
                  }}
                >
                  {averageSleep.toFixed(1)}
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#64748b",
                    }}
                  >
                    {" "}
                    hrs
                  </span>
                </h2>

                <p style={{ color: "#60a5fa" }}>
                  Personal average
                </p>
              </div>

              <div
                style={{
                  ...cardStyle,
                  background:
                    "linear-gradient(145deg,rgba(16,185,129,0.14),rgba(17,25,48,0.85))",
                }}
              >
                <div style={{ fontSize: "30px" }}>📝</div>

                <p style={{ color: "#94a3b8" }}>
                  Check-ins
                </p>

                <h2
                  style={{
                    fontSize: "32px",
                    margin: "8px 0",
                  }}
                >
                  {checkins.length}
                </h2>

                <p style={{ color: "#34d399" }}>
                  Data points collected
                </p>
              </div>
            </section>

            {/* MAIN CHART */}

            <section
              style={{
                ...cardStyle,
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "15px",
                  marginBottom: "25px",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "25px",
                    }}
                  >
                    📊 Wellbeing Overview
                  </h2>

                  <p
                    style={{
                      color: "#94a3b8",
                      marginTop: "8px",
                    }}
                  >
                    Mood, stress and sleep across your
                    check-ins.
                  </p>
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
                  ● Live from check-ins
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "420px",
                }}
              >
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={data}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.08)"
                    />

                    <XAxis
                      dataKey="day"
                      stroke="#94a3b8"
                    />

                    <YAxis
                      stroke="#94a3b8"
                      domain={[0, 10]}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "#111930",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        color: "white",
                      }}
                    />

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="mood"
                      name="Mood"
                      stroke="#a78bfa"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="stress"
                      name="Stress"
                      stroke="#fbbf24"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />

                    <Line
                      type="monotone"
                      dataKey="sleep"
                      name="Sleep"
                      stroke="#60a5fa"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* LATEST INSIGHT */}

            {latest && (
              <section
                style={{
                  ...cardStyle,
                  marginBottom: "25px",
                  background:
                    "linear-gradient(135deg,rgba(79,70,229,0.25),rgba(17,25,48,0.9))",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "18px",
                      background:
                        "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "30px",
                      flexShrink: 0,
                    }}
                  >
                    🤖
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#a78bfa",
                        fontWeight: "bold",
                        fontSize: "13px",
                      }}
                    >
                      DIGITAL TWIN INSIGHT
                    </p>

                    <h2
                      style={{
                        margin: "5px 0 10px",
                      }}
                    >
                      Latest wellbeing snapshot
                    </h2>

                    <p
                      style={{
                        color: "#cbd5e1",
                        lineHeight: "1.7",
                      }}
                    >
                      Your latest check-in recorded a mood
                      of{" "}
                      <strong>
                        {latest.mood}/5
                      </strong>
                      , stress of{" "}
                      <strong>
                        {latest.stress}/5
                      </strong>{" "}
                      and{" "}
                      <strong>
                        {latest.sleep} hours
                      </strong>{" "}
                      of sleep.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* INFORMATION */}

            <section
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "20px",
              }}
            >
              <div style={cardStyle}>
                <div style={{ fontSize: "32px" }}>🧠</div>

                <h2>What does this graph show?</h2>

                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: "1.7",
                  }}
                >
                  The graph visualizes your wellbeing data
                  collected from your Daily Check-ins. This
                  helps you identify changes and patterns
                  over time.
                </p>
              </div>

              <div style={cardStyle}>
                <div style={{ fontSize: "32px" }}>🔍</div>

                <h2>Why is tracking useful?</h2>

                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: "1.7",
                  }}
                >
                  Regular tracking gives your Digital Twin
                  more information about your personal
                  baseline and helps identify meaningful
                  changes.
                </p>
              </div>

              <div style={cardStyle}>
                <div style={{ fontSize: "32px" }}>🔐</div>

                <h2>Your data</h2>

                <p
                  style={{
                    color: "#94a3b8",
                    lineHeight: "1.7",
                  }}
                >
                  Your prototype currently stores wellbeing
                  check-ins locally in your browser using
                  localStorage.
                </p>
              </div>
            </section>

            {/* BOTTOM */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginTop: "25px",
              }}
            >
              <Link
                to="/checkin"
                style={{
                  textDecoration: "none",
                }}
              >
                <button style={buttonStyle}>
                  📝 Add Check-in
                </button>
              </Link>

              <Link
                to="/pattern"
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
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  🧠 Pattern Analysis →
                </button>
              </Link>
            </div>
          </>
        )}

        {/* FOOTER */}

        <footer
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            padding: "35px 10px 10px",
          }}
        >
          🧠 Wellbeing Twin
          <br />
          Personal wellbeing analytics through Digital Twin
          technology.
        </footer>
      </div>
    </div>
  );
}

export default WellbeingChart;