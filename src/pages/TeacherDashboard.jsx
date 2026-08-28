import { useEffect, useState } from "react";

function TeacherDashboard() {
  const [consent, setConsent] = useState(false);
  const [workloads, setWorkloads] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const teacherConsent =
      localStorage.getItem("teacherConsent") === "true";

    setConsent(teacherConsent);

    const savedWorkloads =
      JSON.parse(
        localStorage.getItem("academicWorkload")
      ) || [];

    const savedExams =
      JSON.parse(localStorage.getItem("exams")) || [];

    setWorkloads(savedWorkloads);
    setExams(savedExams);
  }, []);

  const latestWorkload =
    workloads.length > 0
      ? workloads[workloads.length - 1]
      : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>👨‍🏫 Teacher Dashboard</h1>

      <p>
        Academic wellbeing information is displayed
        according to student consent.
      </p>

      <hr />

      {!consent ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🔐 Information Restricted</h2>

          <p>
            The student has not given permission to share
            selected academic wellbeing information with
            the teacher.
          </p>

          <p>
            Private wellbeing notes and counselling
            information remain protected.
          </p>
        </div>
      ) : (
        <div>

          {/* Academic Overview */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>📚 Academic Overview</h2>

            {latestWorkload ? (
              <div>
                <p>
                  <strong>Current Workload:</strong>{" "}
                  {latestWorkload.workload}
                </p>

                <p>
                  <strong>Study Hours:</strong>{" "}
                  {latestWorkload.hours}
                </p>

                <p>
                  <strong>Assignments / Tasks:</strong>{" "}
                  {latestWorkload.assignments}
                </p>

                <p>
                  <strong>Last Updated:</strong>{" "}
                  {latestWorkload.date}
                </p>
              </div>
            ) : (
              <p>
                No academic workload information
                available.
              </p>
            )}
          </div>

          {/* Exam Information */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>📅 Upcoming Exams</h2>

            {exams.length === 0 ? (
              <p>No upcoming exams available.</p>
            ) : (
              exams.map((exam, index) => (
                <div
                  key={index}
                  style={{
                    background: "#f5f7fb",
                    padding: "15px",
                    marginTop: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <p>
                    <strong>Subject:</strong>{" "}
                    {exam.subject}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {exam.examDate}
                  </p>

                  <p>
                    <strong>Difficulty:</strong>{" "}
                    {exam.difficulty}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Teacher Insight */}
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>💡 Academic Support Insight</h2>

            {latestWorkload &&
            (latestWorkload.workload === "High" ||
              latestWorkload.workload ===
                "Very High") ? (
              <p>
                ⚠ The student's recent academic workload
                is high. Consider discussing workload
                planning or study support.
              </p>
            ) : (
              <p>
                ✅ No high academic workload has been
                reported recently.
              </p>
            )}
          </div>

          {/* Privacy */}
          <div
            style={{
              background: "#f3f4f6",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3>🔐 Privacy Protection</h3>

            <p>
              This dashboard shows only academic
              information permitted by the student's
              consent.
            </p>

            <p>
              Private counselling information and
              personal check-in notes are not displayed.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;