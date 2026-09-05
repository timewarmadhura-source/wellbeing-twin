import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function ParentDashboard() {
  const [consent, setConsent] = useState(false);
  const [latest, setLatest] = useState(null);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const parentConsent =
      localStorage.getItem("parentConsent") === "true";

    setConsent(parentConsent);

    const savedCheckins =
      JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

    setCheckins(savedCheckins);

    if (savedCheckins.length > 0) {
      setLatest(savedCheckins[savedCheckins.length - 1]);
    }
  }, []);

  const getMood = (value) => {
    const moods = {
      1: "😊 Very Good",
      2: "🙂 Good",
      3: "😐 Okay",
      4: "😟 Low",
      5: "😣 Very Low",
    };

    return moods[value] || "Not available";
  };

  const getLevel = (value) => {
    if (value <= 2) return "Low";
    if (value === 3) return "Moderate";
    return "High";
  };

  const getDate = (date) => {
    if (!date) return "Not available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="parent-page">

        {/* HEADER */}
        <section className="parent-hero">
          <div>
            <span className="page-eyebrow">Parent Portal</span>

            <h1>Welcome, Parent 👋</h1>

            <p>
              Stay connected with your student's wellbeing
              while respecting their privacy.
            </p>
          </div>

          <div className="parent-hero-icon">
            👨‍👩‍👧
          </div>
        </section>

        {/* PRIVACY NOTICE */}
        <div className="parent-privacy-banner">
          <div className="parent-privacy-icon">🔐</div>

          <div>
            <strong>Privacy comes first</strong>
            <p>
              You can only view information that your student
              has permitted you to access.
            </p>
          </div>
        </div>

        {!consent ? (
          /* RESTRICTED STATE */
          <section className="parent-restricted-card">
            <div className="parent-restricted-icon">
              🔒
            </div>

            <h2>Information is currently private</h2>

            <p>
              Your student has not given consent to share
              wellbeing information with you at this time.
            </p>

            <p className="parent-small-text">
              Their privacy settings control what information
              parents can access.
            </p>

            <Link to="/privacy" className="btn-primary">
              View Privacy Settings
            </Link>
          </section>
        ) : (
          <>
            {/* OVERVIEW */}
            <section className="parent-section">
              <div className="section-heading">
                <div>
                  <span className="page-eyebrow">Latest update</span>
                  <h2>Wellbeing Overview 💚</h2>
                </div>

                {latest && (
                  <span className="parent-date">
                    {getDate(latest.date)}
                  </span>
                )}
              </div>

              {latest ? (
                <>
                  <div className="parent-metrics-grid">

                    <div className="parent-metric-card mood-card">
                      <span className="metric-icon">😊</span>
                      <span className="metric-label">Mood</span>
                      <strong>{getMood(latest.mood)}</strong>
                      <small>{latest.mood}/5</small>
                    </div>

                    <div className="parent-metric-card stress-card">
                      <span className="metric-icon">🌿</span>
                      <span className="metric-label">Stress</span>
                      <strong>{getLevel(latest.stress)}</strong>
                      <small>{latest.stress}/5</small>
                    </div>

                    <div className="parent-metric-card sleep-card">
                      <span className="metric-icon">😴</span>
                      <span className="metric-label">Sleep</span>
                      <strong>{latest.sleep} hrs</strong>
                      <small>Last check-in</small>
                    </div>

                    <div className="parent-metric-card workload-card">
                      <span className="metric-icon">📚</span>
                      <span className="metric-label">Workload</span>
                      <strong>{getLevel(latest.workload)}</strong>
                      <small>{latest.workload}/5</small>
                    </div>

                  </div>

                  {/* CHECK-IN SUMMARY */}
                  <div className="parent-summary-card">
                    <div>
                      <span className="page-eyebrow">
                        Check-in summary
                      </span>

                      <h3>
                        Your student completed a wellbeing check-in.
                      </h3>

                      <p>
                        This information is shared according to
                        their consent preferences.
                      </p>
                    </div>

                    <div className="parent-summary-count">
                      <strong>{checkins.length}</strong>
                      <span>Total check-ins</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="parent-empty-card">
                  <div>🌱</div>
                  <h3>No wellbeing check-ins yet</h3>

                  <p>
                    Once your student completes a check-in,
                    permitted information will appear here.
                  </p>
                </div>
              )}
            </section>

            {/* SUPPORT CARD */}
            <section className="parent-support-card">
              <div className="parent-support-icon">
                💚
              </div>

              <div>
                <h2>How you can support</h2>

                <p>
                  A simple conversation, encouragement, or
                  listening without judgement can make a big
                  difference.
                </p>
              </div>
            </section>

            {/* PRIVACY */}
            <section className="parent-section parent-privacy-card">
              <div className="privacy-card-icon">
                🔐
              </div>

              <div>
                <h3>Your privacy agreement</h3>

                <p>
                  Private check-in notes and counselling
                  conversations are not displayed on the
                  parent dashboard.
                </p>

                <Link to="/privacy" className="text-link">
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

export default ParentDashboard;