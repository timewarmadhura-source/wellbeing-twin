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
  const features = [
    {
      icon: "📝",
      title: "Daily Check-in",
      text: "Record your mood, stress, sleep and academic workload.",
      color: "#dff5ec",
    },
    {
      icon: "📈",
      title: "Wellbeing Trends",
      text: "Understand how your wellbeing changes over time.",
      color: "#e5f1ff",
    },
    {
      icon: "🧠",
      title: "Digital Twin",
      text: "Build a personal wellbeing profile from your patterns.",
      color: "#f0eaff",
    },
    {
      icon: "🤖",
      title: "AI Pattern Analysis",
      text: "Identify meaningful changes in your wellbeing patterns.",
      color: "#fff4d9",
    },
    {
      icon: "📅",
      title: "Academic Tracking",
      text: "Keep track of exams and academic workload.",
      color: "#ffeaf0",
    },
    {
      icon: "💚",
      title: "Counsellor Support",
      text: "Connect with a counsellor when you need support.",
      color: "#dff5ec",
    },
  ];

  const steps = [
    ["01", "Check in", "Share how you are feeling today."],
    ["02", "Learn", "The system learns your wellbeing patterns."],
    ["03", "Understand", "View trends and changes over time."],
    ["04", "Get support", "Take helpful actions when needed."],
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4fcf9",
        color: "#123b35",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      {/* ================= NAVBAR ================= */}

      <nav
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "20px 25px",
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
            fontSize: "22px",
            color: "#123b35",
          }}
        >
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#dff5ec",
              fontSize: "24px",
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
            background: "#138a68",
            color: "white",
            padding: "11px 22px",
            borderRadius: "12px",
            fontWeight: "700",
          }}
        >
          Login →
        </Link>
      </nav>

      {/* ================= HERO ================= */}

      <section
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          padding: "75px 25px 55px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "9px 17px",
            borderRadius: "30px",
            background: "#e3f7ef",
            color: "#138a68",
            fontSize: "14px",
            fontWeight: "700",
            marginBottom: "25px",
          }}
        >
          ✨ AI-Powered Student Wellbeing
        </div>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 72px)",
            lineHeight: "1.08",
            margin: "0 auto 25px",
            maxWidth: "850px",
            fontWeight: "800",
            color: "#123b35",
          }}
        >
          Understand Your
          <br />
          <span style={{ color: "#138a68" }}>
            Wellbeing Journey
          </span>
        </h1>

        <p
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            fontSize: "18px",
            color: "#637b75",
            lineHeight: "1.8",
          }}
        >
          A Digital Twin that learns your personal wellbeing patterns
          and helps you understand how mood, stress, sleep and academic
          workload change over time.
        </p>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: "12px",
              background: "#138a68",
              color: "white",
              fontWeight: "700",
              fontSize: "15px",
              boxShadow: "0 8px 20px rgba(19,138,104,0.18)",
            }}
          >
            Get Started 🚀
          </Link>

          <a
            href="#features"
            style={{
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: "12px",
              background: "white",
              color: "#123b35",
              border: "1px solid #d7e9e3",
              fontWeight: "700",
              fontSize: "15px",
            }}
          >
            Explore Features ↓
          </a>
        </div>
      </section>

      {/* ================= DASHBOARD PREVIEW ================= */}

      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto 80px",
          padding: "0 25px",
        }}
      >
        <div
          style={{
            background: "#dff5ec",
            borderRadius: "28px",
            padding: "10px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "22px",
              padding: "28px",
              border: "1px solid #e0eee9",
              boxShadow: "0 15px 40px rgba(24,74,62,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "25px",
                gap: "15px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    color: "#123b35",
                  }}
                >
                  Student Wellbeing
                </h2>

                <p
                  style={{
                    color: "#718883",
                    margin: "6px 0 0",
                  }}
                >
                  Personal overview
                </p>
              </div>

              <div
                style={{
                  padding: "8px 14px",
                  borderRadius: "20px",
                  background: "#e3f7ef",
                  color: "#138a68",
                  fontSize: "13px",
                  fontWeight: "700",
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
                    borderRadius: "16px",
                    background: "#f7fcfa",
                    border: "1px solid #e2eee9",
                  }}
                >
                  <div style={{ fontSize: "26px" }}>
                    {item[0]}
                  </div>

                  <p
                    style={{
                      margin: "10px 0 5px",
                      color: "#718883",
                    }}
                  >
                    {item[1]}
                  </p>

                  <strong
                    style={{
                      fontSize: "20px",
                      color: "#123b35",
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
          margin: "0 auto",
          padding: "50px 25px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          <div
            style={{
              color: "#138a68",
              fontWeight: "800",
              letterSpacing: "2px",
              fontSize: "13px",
            }}
          >
            POWERFUL FEATURES
          </div>

          <h2
            style={{
              fontSize: "38px",
              margin: "10px 0",
              color: "#123b35",
            }}
          >
            Everything in one place
          </h2>

          <p
            style={{
              color: "#718883",
              fontSize: "16px",
            }}
          >
            Simple tools designed to help students understand and
            improve their wellbeing.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                padding: "25px",
                borderRadius: "20px",
                background: "white",
                border: "1px solid #dfede8",
                boxShadow:
                  "0 10px 30px rgba(24,74,62,0.06)",
              }}
            >
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "16px",
                  background: feature.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  marginBottom: "18px",
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  margin: "0 0 10px",
                  color: "#123b35",
                }}
              >
                {feature.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#718883",
                  lineHeight: "1.6",
                }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section
        style={{
          maxWidth: "1050px",
          margin: "70px auto",
          padding: "55px 25px",
          background: "#ecf8f4",
          borderRadius: "28px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#138a68",
              fontWeight: "800",
              letterSpacing: "1px",
            }}
          >
            HOW IT WORKS
          </div>

          <h2
            style={{
              fontSize: "36px",
              margin: "10px 0",
              color: "#123b35",
            }}
          >
            Your wellbeing journey
          </h2>

          <p style={{ color: "#718883" }}>
            A simple process that turns your daily check-ins into
            meaningful insights.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: "25px",
            marginTop: "45px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step[0]}
              style={{
                textAlign: "center",
                background: "white",
                padding: "25px 18px",
                borderRadius: "18px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  margin: "0 auto 15px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#dff5ec",
                  color: "#138a68",
                  fontWeight: "800",
                }}
              >
                {step[0]}
              </div>

              <h3
                style={{
                  margin: "0 0 8px",
                  color: "#123b35",
                }}
              >
                {step[1]}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#718883",
                  lineHeight: "1.5",
                  fontSize: "14px",
                }}
              >
                {step[2]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section
        style={{
          maxWidth: "850px",
          margin: "80px auto",
          padding: "20px 25px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "25px",
            padding: "45px 25px",
            border: "1px solid #dfede8",
            boxShadow:
              "0 15px 40px rgba(24,74,62,0.07)",
          }}
        >
          <div style={{ fontSize: "42px" }}>🌱</div>

          <h2
            style={{
              fontSize: "32px",
              color: "#123b35",
              margin: "12px 0",
            }}
          >
            Start understanding your wellbeing
          </h2>

          <p
            style={{
              color: "#718883",
              maxWidth: "600px",
              margin: "0 auto 25px",
              lineHeight: "1.7",
            }}
          >
            Take your first wellbeing check-in and begin building
            your personal wellbeing journey.
          </p>

          <Link
            to="/login"
            style={{
              display: "inline-block",
              textDecoration: "none",
              padding: "14px 28px",
              borderRadius: "12px",
              background: "#138a68",
              color: "white",
              fontWeight: "700",
            }}
          >
            Get Started 🚀
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer
        style={{
          borderTop: "1px solid #dcebe6",
          padding: "35px 20px",
          textAlign: "center",
          color: "#718883",
          background: "#f8fdfb",
        }}
      >
        <div
          style={{
            fontSize: "22px",
            marginBottom: "10px",
            color: "#123b35",
            fontWeight: "800",
          }}
        >
          🧠 Wellbeing Twin
        </div>

        <p>
          Your wellbeing journey, understood through your personal
          patterns.
        </p>

        <small>
          🔐 This system identifies wellbeing patterns and does not
          diagnose mental health conditions.
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
          path="/student-dashboard"
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
          path="/pattern-analysis"
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

        {/* Digital Twin */}
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

export default App;