import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import CounsellorDashboard from "./pages/CounsellorDashboard";

import WellbeingCheckin from "./pages/WellbeingCheckin";
import WellbeingHistory from "./pages/WellbeingHistory";
import PatternAnalysis from "./pages/PatternAnalysis";
import WellbeingChart from "./pages/WellbeingChart";
import ExamCalendar from "./pages/ExamCalendar";
import AcademicWorkload from "./pages/AcademicWorkload";
import DigitalTwin from "./pages/DigitalTwin";
import PrivacyConsent from "./pages/PrivacyConsent";
import CounsellorConnect from "./pages/CounsellorConnect";


// =========================
// HOME PAGE
// =========================

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 15% 20%, rgba(124,58,237,0.25), transparent 30%), radial-gradient(circle at 85% 30%, rgba(37,99,235,0.22), transparent 30%), #070b18",
        color: "#f8fafc",
        fontFamily: "Inter, Arial, sans-serif",
        overflow: "hidden",
      }}
    >

      {/* ================= NAVBAR ================= */}

      <nav
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "22px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontWeight: "800",
            fontSize: "20px",
          }}
        >

          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              boxShadow:
                "0 0 25px rgba(139,92,246,0.4)",
              fontSize: "22px",
            }}
          >
            🧠
          </div>

          Wellbeing Twin

        </div>


        <Link
          to="/login"
          style={{
            textDecoration: "none",
          }}
        >

          <button
            style={{
              padding: "11px 22px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)",
              background:
                "linear-gradient(135deg,#7c3aed,#2563eb)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow:
                "0 8px 25px rgba(79,70,229,0.3)",
            }}
          >
            Login →
          </button>

        </Link>

      </nav>


      {/* ================= HERO ================= */}

      <section
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "90px 30px 70px",
          textAlign: "center",
        }}
      >

        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "30px",
            background:
              "rgba(139,92,246,0.12)",
            border:
              "1px solid rgba(139,92,246,0.3)",
            color: "#c4b5fd",
            fontSize: "14px",
            marginBottom: "25px",
          }}
        >
          ✨ AI-Powered Student Wellbeing
        </div>


        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 72px)",
            lineHeight: "1.05",
            margin: "0 auto 25px",
            maxWidth: "850px",
            fontWeight: "800",
            background:
              "linear-gradient(90deg, #ffffff, #c4b5fd, #67e8f9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Understand Your
          <br />
          Wellbeing Journey
        </h1>


        <p
          style={{
            maxWidth: "700px",
            margin: "auto",
            fontSize: "18px",
            color: "#94a3b8",
            lineHeight: "1.8",
          }}
        >
          A Digital Twin that learns your personal
          wellbeing patterns and helps you understand
          how mood, stress, sleep and academic workload
          change over time.
        </p>


        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >

          <Link
            to="/login"
            style={{
              textDecoration: "none",
            }}
          >

            <button
              style={{
                padding: "14px 28px",
                fontSize: "15px",
                borderRadius: "10px",
                border: "none",
                background:
                  "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow:
                  "0 10px 30px rgba(79,70,229,0.35)",
              }}
            >
              Get Started 🚀
            </button>

          </Link>


          <a
            href="#features"
            style={{
              textDecoration: "none",
            }}
          >

            <button
              style={{
                padding: "14px 28px",
                background:
                  "rgba(255,255,255,0.06)",
                color: "white",
                border:
                  "1px solid rgba(255,255,255,0.12)",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Explore Features ↓
            </button>

          </a>

        </div>

      </section>


      {/* ================= DASHBOARD PREVIEW ================= */}

      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto 90px",
          padding: "0 25px",
        }}
      >

        <div
          style={{
            padding: "12px",
            borderRadius: "25px",
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(59,130,246,0.2))",
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.5)",
          }}
        >

          <div
            style={{
              background: "#0d1326",
              borderRadius: "18px",
              padding: "25px",
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                    color: "white",
                  }}
                >
                  Student Wellbeing
                </h2>

                <p
                  style={{
                    color: "#64748b",
                    marginTop: "5px",
                  }}
                >
                  Personal overview
                </p>

              </div>


              <div
                style={{
                  padding: "8px 13px",
                  borderRadius: "20px",
                  background:
                    "rgba(16,185,129,0.12)",
                  color: "#34d399",
                  fontSize: "13px",
                }}
              >
                ● Stable
              </div>

            </div>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(150px,1fr))",
                gap: "15px",
              }}
            >

              {[
                ["😊", "Mood", "4.2 / 5"],
                ["⚡", "Stress", "2.1 / 5"],
                ["😴", "Sleep", "7.5 hrs"],
                ["📚", "Workload", "Moderate"],
              ].map((item) => (

                <div
                  key={item[1]}
                  style={{
                    padding: "20px",
                    borderRadius: "15px",
                    background:
                      "rgba(255,255,255,0.04)",
                    border:
                      "1px solid rgba(255,255,255,0.07)",
                  }}
                >

                  <div
                    style={{
                      fontSize: "25px",
                    }}
                  >
                    {item[0]}
                  </div>

                  <p
                    style={{
                      margin: "10px 0 5px",
                      color: "#94a3b8",
                    }}
                  >
                    {item[1]}
                  </p>

                  <strong
                    style={{
                      fontSize: "20px",
                      color: "#f8fafc",
                    }}
                  >
                    {item[2]}
                  </strong>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        style={{
          maxWidth: "1100px",
          margin: "auto",
          padding: "30px",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >

          <p
            style={{
              color: "#a78bfa",
              fontWeight: "600",
              letterSpacing: "2px",
            }}
          >
            POWERFUL FEATURES
          </p>

          <h2
            style={{
              fontSize: "38px",
              margin: "10px 0",
              color: "white",
            }}
          >
            Everything in one place
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Tools designed to help students understand
            their wellbeing and academic patterns.
          </p>

        </div>


        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "20px",
          }}
        >

          {[
            [
              "📝",
              "Daily Check-in",
              "Record mood, stress, sleep and workload.",
            ],
            [
              "📈",
              "Wellbeing Trends",
              "Visualize changes in your wellbeing over time.",
            ],
            [
              "🧠",
              "Digital Twin",
              "Build a personal model based on your patterns.",
            ],
            [
              "🤖",
              "AI Pattern Analysis",
              "Detect meaningful changes from your baseline.",
            ],
            [
              "📅",
              "Exam Calendar",
              "Track upcoming exams and academic pressure.",
            ],
            [
              "🧑‍⚕️",
              "Support",
              "Connect with appropriate support when needed.",
            ],
          ].map((feature) => (

            <div
              key={feature[1]}
              style={{
                padding: "25px",
                borderRadius: "18px",
                background:
                  "rgba(17,25,48,0.7)",
                border:
                  "1px solid rgba(148,163,184,0.12)",
                boxShadow:
                  "0 15px 35px rgba(0,0,0,0.2)",
              }}
            >

              <div
                style={{
                  fontSize: "34px",
                  marginBottom: "15px",
                }}
              >
                {feature[0]}
              </div>

              <h3
                style={{
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                {feature[1]}
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                {feature[2]}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section
        style={{
          maxWidth: "900px",
          margin: "100px auto",
          padding: "30px",
          textAlign: "center",
        }}
      >

        <h2
          style={{
            fontSize: "36px",
            color: "white",
          }}
        >
          🔬 How Your Digital Twin Works
        </h2>


        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "25px",
            marginTop: "40px",
          }}
        >

          {[
            ["01", "Collect", "Record wellbeing data"],
            ["02", "Learn", "Understand your baseline"],
            ["03", "Detect", "Find meaningful changes"],
            ["04", "Support", "Provide helpful guidance"],
          ].map((step) => (

            <div key={step[0]}>

              <div
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "auto",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                  fontWeight: "bold",
                }}
              >
                {step[0]}
              </div>

              <h3
                style={{
                  color: "white",
                }}
              >
                {step[1]}
              </h3>

              <p
                style={{
                  color: "#94a3b8",
                }}
              >
                {step[2]}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer
        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.08)",
          padding: "35px 20px",
          textAlign: "center",
          color: "#64748b",
        }}
      >

        <div
          style={{
            fontSize: "22px",
            marginBottom: "10px",
            color: "white",
          }}
        >
          🧠 Wellbeing Twin
        </div>

        <p>
          Your wellbeing journey, understood through
          your personal patterns.
        </p>

        <small>
          🔐 This system identifies wellbeing patterns
          and does not diagnose mental health conditions.
        </small>

      </footer>

    </div>
  );
}


// =========================
// APP + ROUTES
// =========================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboards */}
        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        <Route
          path="/parent"
          element={<ParentDashboard />}
        />

        <Route
          path="/teacher"
          element={<TeacherDashboard />}
        />

        <Route
          path="/counsellor"
          element={<CounsellorDashboard />}
        />

        {/* Wellbeing */}
        <Route
          path="/checkin"
          element={<WellbeingCheckin />}
        />

        <Route
          path="/history"
          element={<WellbeingHistory />}
        />

        <Route
          path="/chart"
          element={<WellbeingChart />}
        />

        <Route
          path="/pattern"
          element={<PatternAnalysis />}
        />

        {/* Academic */}
        <Route
          path="/exams"
          element={<ExamCalendar />}
        />

        <Route
          path="/workload"
          element={<AcademicWorkload />}
        />

<Route
  path="/digital-twin"
  element={<DigitalTwin />}
/>


        {/* Privacy */}
        <Route
          path="/privacy"
          element={<PrivacyConsent />}
        />

        {/* Counsellor */}
        <Route
          path="/counsellor-connect"
          element={<CounsellorConnect />}
        />

      </Routes>

    </BrowserRouter>
  );
}


// =========================
// EXPORT
// =========================

export default App;