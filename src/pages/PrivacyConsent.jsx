import { useState } from "react";
import { Link } from "react-router-dom";

function PrivacyConsent() {
  const [consent, setConsent] = useState(() => {
    return localStorage.getItem("privacyConsent") === "true";
  });

  function handleConsent() {
    const newValue = !consent;

    setConsent(newValue);

    localStorage.setItem(
      "privacyConsent",
      newValue.toString()
    );
  }

  const cardStyle = {
    background: "rgba(17,25,48,0.82)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px",
    padding: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    backdropFilter: "blur(12px)",
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
          maxWidth: "1050px",
          margin: "auto",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div>
            <p
              style={{
                color: "#a78bfa",
                fontWeight: "bold",
                fontSize: "13px",
                letterSpacing: "1px",
              }}
            >
              PRIVACY CENTER
            </p>

            <h1
              style={{
                margin: "8px 0",
                fontSize: "38px",
              }}
            >
              🔐 Privacy & Consent
            </h1>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.6",
              }}
            >
              Understand how your wellbeing information is
              used by the Digital Twin.
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
                padding: "12px 20px",
                borderRadius: "10px",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                cursor: "pointer",
              }}
            >
              ← Dashboard
            </button>
          </Link>
        </div>


        {/* CONSENT STATUS */}

        <div
          style={{
            ...cardStyle,
            marginBottom: "20px",
            background: consent
              ? "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(17,25,48,0.85))"
              : "linear-gradient(135deg,rgba(245,158,11,0.15),rgba(17,25,48,0.85))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                background: consent
                  ? "rgba(16,185,129,0.15)"
                  : "rgba(245,158,11,0.15)",
              }}
            >
              {consent ? "✅" : "⚠️"}
            </div>

            <div>
              <h2 style={{ margin: 0 }}>
                {consent
                  ? "Consent Active"
                  : "Consent Not Provided"}
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  marginTop: "7px",
                }}
              >
                {consent
                  ? "You have allowed the system to use your wellbeing data for pattern analysis."
                  : "Please review the information below before providing consent."}
              </p>
            </div>
          </div>
        </div>


        {/* DATA COLLECTION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "20px",
            marginBottom: "20px",
          }}
        >

          <div style={cardStyle}>
            <div style={{ fontSize: "35px" }}>
              📊
            </div>

            <h2>What Data Is Collected?</h2>

            <ul
              style={{
                color: "#94a3b8",
                lineHeight: "2",
                paddingLeft: "20px",
              }}
            >
              <li>Mood ratings</li>
              <li>Stress levels</li>
              <li>Sleep duration</li>
              <li>Academic workload</li>
              <li>Exam information</li>
              <li>Optional personal notes</li>
            </ul>
          </div>


          <div style={cardStyle}>
            <div style={{ fontSize: "35px" }}>
              🧠
            </div>

            <h2>Why Is It Used?</h2>

            <ul
              style={{
                color: "#94a3b8",
                lineHeight: "2",
                paddingLeft: "20px",
              }}
            >
              <li>Understand personal patterns</li>
              <li>Build a wellbeing baseline</li>
              <li>Identify significant changes</li>
              <li>Connect academic pressure with wellbeing</li>
              <li>Provide supportive insights</li>
            </ul>
          </div>

        </div>


        {/* SECURITY */}

        <div
          style={{
            ...cardStyle,
            marginBottom: "20px",
          }}
        >
          <h2>🛡️ Your Data & Control</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >

            <div
              style={{
                padding: "18px",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <h3>🔒 Privacy</h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.6",
                }}
              >
                Your wellbeing information should be
                handled responsibly and only used for
                appropriate purposes.
              </p>
            </div>


            <div
              style={{
                padding: "18px",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <h3>🎛️ Your Choice</h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.6",
                }}
              >
                You can change your consent preference
                at any time.
              </p>
            </div>


            <div
              style={{
                padding: "18px",
                borderRadius: "14px",
                background:
                  "rgba(255,255,255,0.04)",
              }}
            >
              <h3>🧾 Transparency</h3>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.6",
                }}
              >
                The system explains what information is
                considered during wellbeing analysis.
              </p>
            </div>

          </div>
        </div>


        {/* CONSENT */}

        <div
          style={{
            ...cardStyle,
            marginBottom: "20px",
          }}
        >
          <h2>✋ Consent Preference</h2>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: "1.7",
              marginBottom: "20px",
            }}
          >
            By enabling consent, you acknowledge that the
            wellbeing information you provide can be used
            by this prototype to demonstrate personal
            wellbeing pattern analysis.
          </p>

          <button
            onClick={handleConsent}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "10px",
              background: consent
                ? "#dc2626"
                : "linear-gradient(135deg,#8b5cf6,#3b82f6)",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {consent
              ? "Disable Consent"
              : "Give Consent"}
          </button>
        </div>


        {/* IMPORTANT NOTICE */}

        <div
          style={{
            ...cardStyle,
            border:
              "1px solid rgba(245,158,11,0.25)",
            background:
              "rgba(245,158,11,0.06)",
          }}
        >
          <h2>⚠️ Important Notice</h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.8",
            }}
          >
            This Digital Twin is a student project
            prototype designed to identify wellbeing
            patterns. It is not a medical diagnostic
            system and should not replace professional
            healthcare or counselling.
          </p>
        </div>


        {/* FOOTER */}

        <footer
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            padding: "30px",
          }}
        >
          🔐 Wellbeing Twin • Privacy Center
        </footer>

      </div>
    </div>
  );
}

export default PrivacyConsent;