import { Link } from "react-router-dom";
import { useState } from "react";

function CounsellorConnect() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Please describe how you are feeling.");
      return;
    }

    setSubmitted(true);
    setMessage("");
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
              🧑‍⚕️
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "30px",
                }}
              >
                Counsellor Support
              </h1>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#94a3b8",
                }}
              >
                Connect with someone who can support you
              </p>
            </div>
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
        </header>


        {/* HERO */}
        <section
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.15))",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "22px",
                background:
                  "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
              }}
            >
              💙
            </div>

            <div>
              <p
                style={{
                  color: "#a78bfa",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                YOU ARE NOT ALONE
              </p>

              <h2
                style={{
                  margin: "0 0 10px",
                  fontSize: "28px",
                }}
              >
                Need someone to talk to?
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.7",
                  maxWidth: "700px",
                }}
              >
                If your wellbeing pattern shows increased
                stress or you simply want support, you can
                reach out to a counsellor.
              </p>
            </div>
          </div>
        </section>


        {/* SUPPORT OPTIONS */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "18px",
            marginBottom: "22px",
          }}
        >

          <div style={cardStyle}>
            <div style={{ fontSize: "38px" }}>
              💬
            </div>

            <h2>Talk to a Counsellor</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              Share what you are experiencing and request
              support from a counsellor.
            </p>

            <div
              style={{
                marginTop: "18px",
                padding: "12px",
                borderRadius: "10px",
                background:
                  "rgba(16,185,129,0.1)",
                color: "#34d399",
              }}
            >
              ● Confidential Support
            </div>
          </div>


          <div style={cardStyle}>
            <div style={{ fontSize: "38px" }}>
              📅
            </div>

            <h2>Request an Appointment</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              Send a request to arrange a suitable
              counselling session.
            </p>

            <div
              style={{
                marginTop: "18px",
                padding: "12px",
                borderRadius: "10px",
                background:
                  "rgba(59,130,246,0.1)",
                color: "#93c5fd",
              }}
            >
              🕐 Flexible Scheduling
            </div>
          </div>


          <div style={cardStyle}>
            <div style={{ fontSize: "38px" }}>
              🔐
            </div>

            <h2>Your Privacy</h2>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.7",
              }}
            >
              Your wellbeing information should be handled
              responsibly and only shared with appropriate
              consent.
            </p>

            <div
              style={{
                marginTop: "18px",
                padding: "12px",
                borderRadius: "10px",
                background:
                  "rgba(139,92,246,0.1)",
                color: "#c4b5fd",
              }}
            >
              🛡️ Privacy First
            </div>
          </div>

        </section>


        {/* CONTACT FORM */}
        <section style={{ ...cardStyle, marginBottom: "22px" }}>
          <h2
            style={{
              color: "#c4b5fd",
              fontSize: "25px",
            }}
          >
            📝 Request Support
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "22px",
            }}
          >
            You can briefly describe what you would like
            help with.
          </p>

          {submitted ? (
            <div
              style={{
                background: "rgba(16,185,129,0.12)",
                border:
                  "1px solid rgba(16,185,129,0.25)",
                padding: "22px",
                borderRadius: "14px",
              }}
            >
              <div style={{ fontSize: "35px" }}>
                ✅
              </div>

              <h3 style={{ color: "#34d399" }}>
                Support Request Sent
              </h3>

              <p style={{ color: "#cbd5e1" }}>
                Your request has been recorded. A
                counsellor can review it and provide
                appropriate support.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                style={{
                  ...primaryButton,
                  marginTop: "10px",
                }}
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#cbd5e1",
                  fontWeight: "600",
                }}
              >
                How are you feeling?
              </label>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Write a few words about what you are experiencing..."
                rows="6"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "15px",
                  borderRadius: "12px",
                  border:
                    "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "15px",
                  outline: "none",
                  resize: "vertical",
                }}
              />

              <button
                type="submit"
                style={{
                  ...primaryButton,
                  marginTop: "15px",
                }}
              >
                📨 Request Counsellor Support
              </button>

            </form>
          )}
        </section>


        {/* EMERGENCY NOTICE */}
        <section
          style={{
            ...cardStyle,
            background:
              "rgba(127,29,29,0.18)",
            border:
              "1px solid rgba(248,113,113,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontSize: "30px" }}>
              🚨
            </div>

            <div>
              <h2 style={{ color: "#fca5a5" }}>
                Need immediate help?
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.7",
                }}
              >
                This application is not an emergency
                service. If you are in immediate danger or
                need urgent help, contact your local
                emergency service or a trusted person
                immediately.
              </p>
            </div>
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
            Supporting students through personal
            wellbeing insights.
          </span>
          <br />
          <br />
          🔐 This system identifies wellbeing patterns and
          does not diagnose mental health conditions.
        </footer>

      </div>
    </div>
  );
}

export default CounsellorConnect;