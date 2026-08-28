import { useState } from "react";
import { Link } from "react-router-dom";

function AcademicWorkload() {
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");
  const [workload, setWorkload] = useState("Moderate");
  const [tasks, setTasks] = useState("");

  const [records, setRecords] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("academicWorkload")) || []
    );
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (subject === "" || hours === "") {
      alert("Please enter subject and study hours");
      return;
    }

    const newRecord = {
      subject,
      hours: Number(hours),
      workload,
      tasks,
      date: new Date().toLocaleDateString(),
    };

    const updatedRecords = [...records, newRecord];

    setRecords(updatedRecords);

    localStorage.setItem(
      "academicWorkload",
      JSON.stringify(updatedRecords)
    );

    setSubject("");
    setHours("");
    setWorkload("Moderate");
    setTasks("");

    alert("Academic workload added successfully!");
  }

  const totalHours = records.reduce(
    (total, item) => total + Number(item.hours),
    0
  );

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
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div>
            <div
              style={{
                color: "#a78bfa",
                fontSize: "14px",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              ACADEMIC WELLBEING
            </div>

            <h1
              style={{
                margin: "8px 0",
                fontSize: "38px",
              }}
            >
              📚 Academic Workload
            </h1>

            <p
              style={{
                color: "#94a3b8",
                lineHeight: "1.6",
              }}
            >
              Track your study workload and understand how
              academics may affect your wellbeing.
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
              background: "rgba(17,25,48,0.78)",
              border: "1px solid rgba(139,92,246,0.2)",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ fontSize: "30px" }}>⏱️</div>

            <p style={{ color: "#94a3b8" }}>
              Total Study Hours
            </p>

            <h2
              style={{
                fontSize: "32px",
                margin: "8px 0",
              }}
            >
              {totalHours} hrs
            </h2>

            <p style={{ color: "#64748b" }}>
              Recorded workload
            </p>
          </div>

          <div
            style={{
              background: "rgba(17,25,48,0.78)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: "18px",
              padding: "22px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ fontSize: "30px" }}>📖</div>

            <p style={{ color: "#94a3b8" }}>
              Subjects Recorded
            </p>

            <h2
              style={{
                fontSize: "32px",
                margin: "8px 0",
              }}
            >
              {records.length}
            </h2>

            <p style={{ color: "#64748b" }}>
              Workload entries
            </p>
          </div>
        </div>


        {/* ADD WORKLOAD */}
        <div
          style={{
            background: "rgba(17,25,48,0.82)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "22px",
            padding: "30px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            ➕ Add Academic Workload
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "25px",
            }}
          >
            Enter your current academic activities.
          </p>

          <form onSubmit={handleSubmit}>

            {/* SUBJECT */}
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Subject
            </label>

            <input
              type="text"
              placeholder="Example: Power Systems"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                boxSizing: "border-box",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#0d1326",
                color: "white",
                outline: "none",
                marginBottom: "20px",
              }}
            />

            {/* HOURS */}
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Study Hours
            </label>

            <input
              type="number"
              min="0"
              max="24"
              placeholder="Example: 3"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                boxSizing: "border-box",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#0d1326",
                color: "white",
                outline: "none",
                marginBottom: "20px",
              }}
            />

            {/* WORKLOAD */}
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Workload Level
            </label>

            <select
              value={workload}
              onChange={(e) => setWorkload(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                boxSizing: "border-box",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#0d1326",
                color: "white",
                outline: "none",
                marginBottom: "20px",
              }}
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
              <option>Very High</option>
            </select>

            {/* TASKS */}
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Tasks / Assignments
            </label>

            <textarea
              rows="4"
              placeholder="Example: Assignment, practical, project work..."
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              style={{
                width: "100%",
                padding: "13px",
                boxSizing: "border-box",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "#0d1326",
                color: "white",
                outline: "none",
                resize: "vertical",
                marginBottom: "20px",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "13px 24px",
                border: "none",
                borderRadius: "10px",
                background:
                  "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow:
                  "0 8px 25px rgba(79,70,229,0.3)",
              }}
            >
              ➕ Add Workload
            </button>

          </form>
        </div>


        {/* RECORDS */}
        <div
          style={{
            background: "rgba(17,25,48,0.82)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "22px",
            padding: "30px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            📋 Workload Records
          </h2>

          {records.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "45px 20px",
                color: "#64748b",
              }}
            >
              <div style={{ fontSize: "50px" }}>
                📚
              </div>

              <h3 style={{ color: "#cbd5e1" }}>
                No workload records yet
              </h3>

              <p>
                Add your academic workload above to start
                tracking your study pattern.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              {records.map((record, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border:
                      "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "15px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 6px",
                        }}
                      >
                        📖 {record.subject}
                      </h3>

                      <p
                        style={{
                          color: "#94a3b8",
                          margin: 0,
                        }}
                      >
                        📅 {record.date}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: "8px 13px",
                        borderRadius: "20px",
                        background:
                          "rgba(139,92,246,0.15)",
                        color: "#c4b5fd",
                      }}
                    >
                      {record.workload}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "25px",
                      flexWrap: "wrap",
                      marginTop: "18px",
                    }}
                  >
                    <span>
                      ⏱️{" "}
                      <strong>{record.hours}</strong>{" "}
                      hours
                    </span>
                  </div>

                  {record.tasks && (
                    <p
                      style={{
                        color: "#94a3b8",
                        marginTop: "15px",
                        lineHeight: "1.6",
                      }}
                    >
                      📝 {record.tasks}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>


        {/* FOOTER */}
        <div
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px",
            padding: "30px 10px",
          }}
        >
          🧠 Wellbeing Twin • Academic Workload
        </div>

      </div>
    </div>
  );
}

export default AcademicWorkload;