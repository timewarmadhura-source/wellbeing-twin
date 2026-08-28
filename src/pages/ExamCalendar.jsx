import { useState } from "react";
import { Link } from "react-router-dom";

function ExamCalendar() {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [difficulty, setDifficulty] = useState("Moderate");

  const [exams, setExams] = useState(() => {
    return JSON.parse(localStorage.getItem("exams")) || [];
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (subject === "" || examDate === "") {
      alert("Please enter subject and exam date");
      return;
    }

    const newExam = {
      subject,
      examDate,
      difficulty,
    };

    const updatedExams = [...exams, newExam];

    setExams(updatedExams);

    localStorage.setItem(
      "exams",
      JSON.stringify(updatedExams)
    );

    setSubject("");
    setExamDate("");
    setDifficulty("Moderate");

    alert("Exam added successfully!");
  }

  function getDaysLeft(date) {
    const today = new Date();
    const exam = new Date(date);

    const difference =
      exam.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  }

  function getDifficultyColor(level) {
    if (level === "Easy") return "#22c55e";
    if (level === "Moderate") return "#60a5fa";
    if (level === "Difficult") return "#f59e0b";
    return "#ef4444";
  }

  const upcomingExams = exams
    .filter((exam) => getDaysLeft(exam.examDate) >= 0)
    .sort(
      (a, b) =>
        new Date(a.examDate) -
        new Date(b.examDate)
    );

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
          maxWidth: "1100px",
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
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div>
            <p
              style={{
                color: "#a78bfa",
                fontWeight: "bold",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              ACADEMIC PLANNER
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "38px",
              }}
            >
              📅 Exam Calendar
            </h1>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "10px",
              }}
            >
              Organize upcoming exams and help your Digital Twin
              understand academic pressure.
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

        {/* SUMMARY */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
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
            <div style={{ fontSize: "32px" }}>📚</div>

            <p style={{ color: "#94a3b8" }}>
              Total Exams
            </p>

            <h2
              style={{
                fontSize: "32px",
                margin: "8px 0",
              }}
            >
              {exams.length}
            </h2>

            <p style={{ color: "#64748b" }}>
              Added to calendar
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(59,130,246,0.18),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "32px" }}>⏳</div>

            <p style={{ color: "#94a3b8" }}>
              Upcoming Exams
            </p>

            <h2
              style={{
                fontSize: "32px",
                margin: "8px 0",
              }}
            >
              {upcomingExams.length}
            </h2>

            <p style={{ color: "#64748b" }}>
              Future examinations
            </p>
          </div>

          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(145deg,rgba(16,185,129,0.16),rgba(17,25,48,0.85))",
            }}
          >
            <div style={{ fontSize: "32px" }}>🎯</div>

            <p style={{ color: "#94a3b8" }}>
              Nearest Exam
            </p>

            <h2
              style={{
                fontSize: "20px",
                margin: "8px 0",
              }}
            >
              {upcomingExams.length > 0
                ? upcomingExams[0].subject
                : "None"}
            </h2>

            <p style={{ color: "#34d399" }}>
              {upcomingExams.length > 0
                ? `${getDaysLeft(
                    upcomingExams[0].examDate
                  )} days remaining`
                : "No upcoming exams"}
            </p>
          </div>
        </div>

        {/* ADD EXAM */}

        <div
          style={{
            ...cardStyle,
            marginBottom: "25px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            ➕ Add Upcoming Exam
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "25px",
            }}
          >
            Add your exam schedule for academic planning.
          </p>

          <form onSubmit={handleSubmit}>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "18px",
              }}
            >

              <div>
                <label>Subject</label>

                <input
                  type="text"
                  placeholder="Example: Power System"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px",
                    marginTop: "8px",
                    borderRadius: "10px",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    background: "#0d1326",
                    color: "white",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label>Exam Date</label>

                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px",
                    marginTop: "8px",
                    borderRadius: "10px",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    background: "#0d1326",
                    color: "white",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label>Difficulty</label>

                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "13px",
                    marginTop: "8px",
                    borderRadius: "10px",
                    border:
                      "1px solid rgba(255,255,255,0.1)",
                    background: "#0d1326",
                    color: "white",
                    boxSizing: "border-box",
                  }}
                >
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Difficult</option>
                  <option>Very Difficult</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              style={{
                marginTop: "22px",
                padding: "13px 24px",
                border: "none",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Add Exam 📅
            </button>

          </form>
        </div>

        {/* EXAM LIST */}

        <div style={cardStyle}>
          <h2 style={{ marginTop: 0 }}>
            🗓 Upcoming Exam Schedule
          </h2>

          {upcomingExams.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "50px 20px",
                color: "#64748b",
              }}
            >
              <div style={{ fontSize: "55px" }}>
                📭
              </div>

              <h3 style={{ color: "#cbd5e1" }}>
                No upcoming exams
              </h3>

              <p>
                Add your exams above to start planning.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              {upcomingExams.map((exam, index) => {
                const days = getDaysLeft(exam.examDate);

                return (
                  <div
                    key={index}
                    style={{
                      background:
                        "rgba(255,255,255,0.04)",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "16px",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            margin: "0 0 8px",
                            fontSize: "22px",
                          }}
                        >
                          📘 {exam.subject}
                        </h3>

                        <p
                          style={{
                            color: "#94a3b8",
                            margin: 0,
                          }}
                        >
                          📅 {exam.examDate}
                        </p>
                      </div>

                      <div
                        style={{
                          textAlign: "right",
                        }}
                      >
                        <div
                          style={{
                            color:
                              getDifficultyColor(
                                exam.difficulty
                              ),
                            fontWeight: "bold",
                            marginBottom: "8px",
                          }}
                        >
                          {exam.difficulty}
                        </div>

                        <div
                          style={{
                            padding: "8px 14px",
                            borderRadius: "20px",
                            background:
                              "rgba(139,92,246,0.12)",
                            color: "#c4b5fd",
                            display: "inline-block",
                          }}
                        >
                          {days === 0
                            ? "Today"
                            : `${days} Days Left`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
          🧠 Wellbeing Twin • Academic Planning
        </footer>

      </div>
    </div>
  );
}

export default ExamCalendar;