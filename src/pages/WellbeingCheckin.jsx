import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function WellbeingCheckin() {
  const navigate = useNavigate();

  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(3);
  const [sleep, setSleep] = useState(7);
  const [workload, setWorkload] = useState("Moderate");
  const [note, setNote] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const checkin = {
      date: new Date().toLocaleDateString(),
      mood: Number(mood),
      stress: Number(stress),
      sleep: Number(sleep),
      workload,
      note,
    };

    const existingCheckins =
      JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

    existingCheckins.push(checkin);

    localStorage.setItem(
      "wellbeingCheckins",
      JSON.stringify(existingCheckins)
    );

    alert("✅ Your wellbeing check-in has been saved!");

    navigate("/student");
  }

  const cardStyle = {
    background: "rgba(17, 25, 48, 0.82)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    backdropFilter: "blur(12px)",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "13px",
    boxSizing: "border-box",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    fontSize: "15px",
    outline: "none",
  };

  const buttonStyle = {
    padding: "14px 25px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#8b5cf6,#3b82f6)",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
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
          maxWidth: "900px",
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
            <div
              style={{
                color: "#a78bfa",
                fontWeight: "600",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              WELLBEING TRACKER
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "36px",
              }}
            >
              📝 Daily Check-in
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
              }}
            >
              Tell your Digital Twin how you are feeling today.
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
        </div>

        {/* INTRO CARD */}

        <div
          style={{
            ...cardStyle,
            background:
              "linear-gradient(135deg, rgba(79,70,229,0.25), rgba(37,99,235,0.12))",
          }}
        >
          <h2>🧠 Why this check-in matters</h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7",
            }}
          >
            Your answers help your Digital Twin understand
            your personal wellbeing pattern over time.
            There are no right or wrong answers.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handleSubmit}>
          {/* MOOD */}

          <div style={cardStyle}>
            <div style={{ fontSize: "35px" }}>😊</div>

            <h2>How is your mood today?</h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px",
              }}
            >
              1 = Very Low &nbsp; • &nbsp; 5 = Excellent
            </p>

            <input
              type="range"
              min="1"
              max="5"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              style={{
                width: "100%",
                accentColor: "#8b5cf6",
              }}
            />

            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#c4b5fd",
              }}
            >
              {mood} / 5
            </div>
          </div>

          {/* STRESS */}

          <div style={cardStyle}>
            <div style={{ fontSize: "35px" }}>⚡</div>

            <h2>How stressed do you feel?</h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "20px",
              }}
            >
              1 = Very Relaxed &nbsp; • &nbsp; 5 = Very Stressed
            </p>

            <input
              type="range"
              min="1"
              max="5"
              value={stress}
              onChange={(e) => setStress(e.target.value)}
              style={{
                width: "100%",
                accentColor: "#f59e0b",
              }}
            />

            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#fbbf24",
              }}
            >
              {stress} / 5
            </div>
          </div>

          {/* SLEEP */}

          <div style={cardStyle}>
            <div style={{ fontSize: "35px" }}>😴</div>

            <h2>How many hours did you sleep?</h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "15px",
              }}
            >
              Enter the approximate number of hours you slept.
            </p>

            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              style={inputStyle}
            />

            <p
              style={{
                color: "#60a5fa",
                marginTop: "12px",
              }}
            >
              Current value: <strong>{sleep} hours</strong>
            </p>
          </div>

          {/* WORKLOAD */}

          <div style={cardStyle}>
            <div style={{ fontSize: "35px" }}>📚</div>

            <h2>How is your academic workload?</h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "15px",
              }}
            >
              Select the workload that best describes your day.
            </p>

            <select
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
              style={inputStyle}
            >
              <option
                value="Low"
                style={{ color: "black" }}
              >
                Low
              </option>

              <option
                value="Moderate"
                style={{ color: "black" }}
              >
                Moderate
              </option>

              <option
                value="High"
                style={{ color: "black" }}
              >
                High
              </option>

              <option
                value="Very High"
                style={{ color: "black" }}
              >
                Very High
              </option>
            </select>
          </div>

          {/* NOTE */}

          <div style={cardStyle}>
            <div style={{ fontSize: "35px" }}>💬</div>

            <h2>Anything you want to share?</h2>

            <p
              style={{
                color: "#94a3b8",
                marginBottom: "15px",
              }}
            >
              This is optional. You can write about your day,
              studies, sleep, stress or anything else.
            </p>

            <textarea
              rows="5"
              placeholder="Write something about your day..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                ...inputStyle,
                resize: "vertical",
                fontFamily: "Arial, sans-serif",
              }}
            />
          </div>

          {/* SUMMARY */}

          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(17,25,48,0.85))",
            }}
          >
            <h2>📊 Today's Check-in</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(150px,1fr))",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <div>
                <p style={{ color: "#94a3b8" }}>Mood</p>
                <strong style={{ fontSize: "20px" }}>
                  😊 {mood}/5
                </strong>
              </div>

              <div>
                <p style={{ color: "#94a3b8" }}>Stress</p>
                <strong style={{ fontSize: "20px" }}>
                  ⚡ {stress}/5
                </strong>
              </div>

              <div>
                <p style={{ color: "#94a3b8" }}>Sleep</p>
                <strong style={{ fontSize: "20px" }}>
                  😴 {sleep} hrs
                </strong>
              </div>

              <div>
                <p style={{ color: "#94a3b8" }}>Workload</p>
                <strong style={{ fontSize: "20px" }}>
                  📚 {workload}
                </strong>
              </div>
            </div>
          </div>

          {/* SAVE BUTTON */}

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
              marginBottom: "40px",
            }}
          >
            <button type="submit" style={buttonStyle}>
              Save Check-in ✓
            </button>

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "15px",
              }}
            >
              Your information is stored locally in this prototype.
            </p>
          </div>
        </form>

        {/* FOOTER */}

        <footer
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            paddingBottom: "20px",
          }}
        >
          🧠 Wellbeing Twin
          <br />
          Understanding your personal wellbeing patterns.
        </footer>
      </div>
    </div>
  );
}

export default WellbeingCheckin;