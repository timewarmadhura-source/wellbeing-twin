import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function TeacherDashboard() {
  const [consent, setConsent] = useState(false);
  const [workloads, setWorkloads] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const teacherConsent =
      localStorage.getItem("teacherConsent") === "true";

    setConsent(teacherConsent);

    const savedWorkloads =
      JSON.parse(localStorage.getItem("academicWorkload")) || [];

    const savedExams =
      JSON.parse(localStorage.getItem("exams")) || [];

    setWorkloads(savedWorkloads);
    setExams(savedExams);
  }, []);

  const latestWorkload =
    workloads.length > 0
      ? workloads[workloads.length - 1]
      : null;

  const getWorkloadLevel = (value) => {
    if (!value) return "Not available";

    if (
      typeof value === "string" &&
      value.toLowerCase().includes("very high")
    ) {
      return "Very High";
    }

    if (
      typeof value === "string" &&
      value.toLowerCase().includes("high")
    ) {
      return "High";
    }

    if (
      typeof value === "string" &&
      value.toLowerCase().includes("moderate")
    ) {
      return "Moderate";
    }

    return value;
  };

  const getDate = (date) => {
    if (!date) return "Not available";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const workloadLevel = latestWorkload
    ? getWorkloadLevel(latestWorkload.workload)
    : "Not available";

  const isHighWorkload =
    workloadLevel === "High" ||
    workloadLevel === "Very High";

  return (
    <DashboardLayout>
      <div className="teacher-page">

        {/* HERO */}
        <section className="teacher-hero">
          <div>
            <span className="page-eyebrow">
              Teacher Portal
            </span>

            <h1>Welcome, Teacher 👋</h1>

            <p>
              Support your student's academic wellbeing
              while respecting their privacy.
            </p>
          </div>

          <div className="teacher-hero-icon">
            👩‍🏫
          </div>
        </section>

        {/* PRIVACY BANNER */}
        <div className="teacher-privacy-banner">
          <div className="teacher-privacy-icon">
            🔐
          </div>

          <div>
            <strong>Student privacy is protected</strong>

            <p>
              Only academic information shared through
              the student's consent settings is displayed.
            </p>
          </div>
        </div>

        {!consent ? (
          /* RESTRICTED */
          <section className="teacher-restricted-card">
            <div className="teacher-restricted-icon">
              🔒
            </div>

            <h2>Academic information is private</h2>

            <p>
              The student has not given permission to share
              selected academic wellbeing information with
              the teacher.
            </p>

            <p className="teacher-small-text">
              Private wellbeing notes and counselling
              information remain protected.
            </p>

            <Link
              to="/privacy"
              className="btn-primary"
            >
              View Privacy Settings
            </Link>
          </section>
        ) : (
          <>
            {/* ACADEMIC OVERVIEW */}
            <section className="teacher-section">

              <div className="section-heading">
                <div>
                  <span className="page-eyebrow">
                    Latest update
                  </span>

                  <h2>Academic Overview 📚</h2>
                </div>

                {latestWorkload && (
                  <span className="teacher-date">
                    {getDate(latestWorkload.date)}
                  </span>
                )}
              </div>

              {latestWorkload ? (
                <>
                  <div className="teacher-metrics-grid">

                    <div className="teacher-metric-card workload-metric">
                      <span className="metric-icon">
                        📊
                      </span>

                      <span className="metric-label">
                        Workload
                      </span>

                      <strong>
                        {workloadLevel}
                      </strong>

                      <small>
                        Current level
                      </small>
                    </div>

                    <div className="teacher-metric-card study-metric">
                      <span className="metric-icon">
                        ⏰
                      </span>

                      <span className="metric-label">
                        Study Hours
                      </span>

                      <strong>
                        {latestWorkload.hours || 0}
                      </strong>

                      <small>
                        Hours reported
                      </small>
                    </div>

                    <div className="teacher-metric-card task-metric">
                      <span className="metric-icon">
                        📝
                      </span>

                      <span className="metric-label">
                        Tasks
                      </span>

                      <strong>
                        {latestWorkload.assignments || 0}
                      </strong>

                      <small>
                        Assignments / tasks
                      </small>
                    </div>

                    <div className="teacher-metric-card update-metric">
                      <span className="metric-icon">
                        📅
                      </span>

                      <span className="metric-label">
                        Last Updated
                      </span>

                      <strong>
                        {getDate(latestWorkload.date)}
                      </strong>

                      <small>
                        Latest report
                      </small>
                    </div>

                  </div>
                </>
              ) : (
                <div className="teacher-empty-card">
                  <div>📚</div>

                  <h3>
                    No academic workload data yet
                  </h3>

                  <p>
                    Academic information will appear here
                    once the student records their workload.
                  </p>
                </div>
              )}
            </section>

            {/* EXAMS */}
            <section className="teacher-section">

              <div className="section-heading">
                <div>
                  <span className="page-eyebrow">
                    Academic schedule
                  </span>

                  <h2>Upcoming Exams 📅</h2>
                </div>

                <span className="teacher-count">
                  {exams.length}{" "}
                  {exams.length === 1 ? "exam" : "exams"}
                </span>
              </div>

              {exams.length === 0 ? (
                <div className="teacher-empty-card">
                  <div>🌱</div>

                  <h3>No upcoming exams</h3>

                  <p>
                    No exam information has been added yet.
                  </p>
                </div>
              ) : (
                <div className="teacher-exam-list">

                  {exams.map((exam, index) => (
                    <div
                      className="teacher-exam-card"
                      key={index}
                    >
                      <div className="exam-date-box">
                        <span>📅</span>
                      </div>

                      <div className="exam-details">
                        <span className="page-eyebrow">
                          Exam
                        </span>

                        <h3>
                          {exam.subject || "Subject"}
                        </h3>

                        <p>
                          {exam.examDate || "Date not available"}
                        </p>
                      </div>

                      <div className="exam-difficulty">
                        <span>
                          Difficulty
                        </span>

                        <strong>
                          {exam.difficulty || "Not specified"}
                        </strong>
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </section>

            {/* INSIGHT */}
            <section
              className={`teacher-insight-card ${
                isHighWorkload
                  ? "teacher-insight-warning"
                  : ""
              }`}
            >
              <div className="teacher-insight-icon">
                {isHighWorkload ? "⚠️" : "💡"}
              </div>

              <div>
                <span className="page-eyebrow">
                  Academic Support Insight
                </span>

                <h2>
                  {isHighWorkload
                    ? "Workload may need attention"
                    : "Academic wellbeing looks steady"}
                </h2>

                <p>
                  {isHighWorkload
                    ? "The student's recent academic workload is high. Consider discussing workload planning, deadlines, or study support."
                    : "No high academic workload has been reported recently. Continue encouraging healthy study habits and balanced routines."}
                </p>
              </div>
            </section>

            {/* SUPPORT */}
            <section className="teacher-support-card">
              <div className="teacher-support-icon">
                🌱
              </div>

              <div>
                <h2>
                  How teachers can support
                </h2>

                <p>
                  Encourage realistic planning, manageable
                  deadlines, regular breaks, and open
                  communication when academic pressure rises.
                </p>
              </div>
            </section>

            {/* PRIVACY */}
            <section className="teacher-section teacher-privacy-card">

              <div className="privacy-card-icon">
                🔐
              </div>

              <div>
                <h3>
                  Privacy Protection
                </h3>

                <p>
                  This dashboard shows only academic
                  information permitted by the student's
                  consent.
                </p>

                <p>
                  Private counselling information and
                  personal check-in notes are not displayed.
                </p>

                <Link
                  to="/privacy"
                  className="text-link"
                >
                  Review privacy settings →
                </Link>
              </div>

            </section>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}

export default TeacherDashboard;