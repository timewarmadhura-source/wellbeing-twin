import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function WellbeingHistory() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("wellbeingCheckins")
      ) || [];

      // Create a new array before reversing so localStorage data
      // itself is never mutated.
      setCheckins(
        [...saved].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
    } catch (error) {
      console.error("Error loading check-in history:", error);
      setCheckins([]);
    }
  }, []);

  const moodLabels = {
    1: "Good",
    2: "Okay",
    3: "Not great",
    4: "Difficult",
    5: "Very difficult",
  };

  const moodEmojis = {
    1: "😊",
    2: "🙂",
    3: "😐",
    4: "😟",
    5: "😣",
  };

  const levelLabels = {
    1: "Very low",
    2: "Low",
    3: "Moderate",
    4: "High",
    5: "Very high",
  };

  const getDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Unknown date";
    }
  };

  const getTime = (date) => {
    try {
      return new Date(date).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  const getLevelLabel = (value) => {
    return levelLabels[value] || "Not recorded";
  };

  const latest = checkins[0];

  return (
    <DashboardLayout>
      <div className="history-page">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <section className="history-hero">

          <div className="history-hero-text">
            <span className="eyebrow">
              YOUR WELLBEING JOURNEY
            </span>

            <h1>My Check-in History</h1>

            <p>
              Look back at your wellbeing journey and notice
              how your mood, stress, sleep and workload change
              over time.
            </p>
          </div>

          <Link
            to="/checkin"
            className="primary-button history-new-button"
          >
            + New Check-in
          </Link>

        </section>


        {/* =====================================================
            EMPTY STATE
            ===================================================== */}

        {checkins.length === 0 ? (

          <section className="history-empty">

            <div className="history-empty-illustration">
              🌱
            </div>

            <span className="card-kicker">
              YOUR JOURNEY STARTS HERE
            </span>

            <h2>No check-ins yet</h2>

            <p>
              Your wellbeing history will appear here after
              you complete your first check-in.
            </p>

            <Link
              to="/checkin"
              className="primary-button"
            >
              Start Your First Check-in →
            </Link>

          </section>

        ) : (

          <>

            {/* =================================================
                SUMMARY
                ================================================= */}

            <section className="history-summary">

              <div className="history-summary-card history-summary-green">

                <div className="history-summary-icon">
                  📝
                </div>

                <div>
                  <span>Total check-ins</span>
                  <strong>{checkins.length}</strong>
                </div>

              </div>


              <div className="history-summary-card history-summary-blue">

                <div className="history-summary-icon">
                  {moodEmojis[latest?.mood] || "😊"}
                </div>

                <div>
                  <span>Latest mood</span>
                  <strong>
                    {moodLabels[latest?.mood] || "Not recorded"}
                  </strong>
                </div>

              </div>


              <div className="history-summary-card history-summary-purple">

                <div className="history-summary-icon">
                  🌙
                </div>

                <div>
                  <span>Latest sleep</span>
                  <strong>
                    {latest?.sleep
                      ? `${latest.sleep} hrs`
                      : "Not recorded"}
                  </strong>
                </div>

              </div>


              <div className="history-summary-card history-summary-yellow">

                <div className="history-summary-icon">
                  📚
                </div>

                <div>
                  <span>Latest workload</span>
                  <strong>
                    {getLevelLabel(latest?.workload)}
                  </strong>
                </div>

              </div>

            </section>


            {/* =================================================
                HISTORY SECTION
                ================================================= */}

            <section className="history-main-card">

              <div className="history-main-header">

                <div>
                  <span className="card-kicker">
                    YOUR WELLBEING
                  </span>

                  <h2>Previous Check-ins</h2>

                  <p>
                    Your most recent check-ins are shown first.
                  </p>
                </div>

                <Link
                  to="/chart"
                  className="history-view-trends"
                >
                  View Trends →
                </Link>

              </div>


              {/* =================================================
                  CHECK-IN LIST
                  ================================================= */}

              <div className="history-list">

                {checkins.map((checkin, index) => (

                  <article
                    className={`history-entry ${
                      index === 0
                        ? "history-entry-latest"
                        : ""
                    }`}
                    key={checkin.id || index}
                  >

                    {/* DATE */}

                    <div className="history-entry-date">

                      <div className="history-calendar-icon">
                        📅
                      </div>

                      <div>
                        <strong>
                          {getDate(checkin.date)}
                        </strong>

                        <span>
                          {getTime(checkin.date)}
                        </span>

                        {index === 0 && (
                          <small>
                            Latest
                          </small>
                        )}
                      </div>

                    </div>


                    {/* MOOD */}

                    <div className="history-entry-mood">

                      <div className="history-mood-circle">
                        {moodEmojis[checkin.mood] || "🙂"}
                      </div>

                      <div>
                        <span>Mood</span>

                        <strong>
                          {moodLabels[checkin.mood] ||
                            "Not recorded"}
                        </strong>
                      </div>

                    </div>


                    {/* METRICS */}

                    <div className="history-entry-metrics">

                      <div className="history-entry-metric">

                        <div className="history-metric-icon stress">
                          🧘
                        </div>

                        <div>
                          <span>Stress</span>

                          <strong>
                            {getLevelLabel(checkin.stress)}
                          </strong>
                        </div>

                      </div>


                      <div className="history-entry-metric">

                        <div className="history-metric-icon sleep">
                          🌙
                        </div>

                        <div>
                          <span>Sleep</span>

                          <strong>
                            {checkin.sleep
                              ? `${checkin.sleep} hrs`
                              : "Not recorded"}
                          </strong>
                        </div>

                      </div>


                      <div className="history-entry-metric">

                        <div className="history-metric-icon workload">
                          📚
                        </div>

                        <div>
                          <span>Workload</span>

                          <strong>
                            {getLevelLabel(checkin.workload)}
                          </strong>
                        </div>

                      </div>

                    </div>


                    {/* NOTE */}

                    {checkin.notes && (

                      <div className="history-entry-note">

                        <span>💭</span>

                        <div>
                          <small>
                            Your note
                          </small>

                          <p>
                            {checkin.notes}
                          </p>
                        </div>

                      </div>

                    )}

                  </article>

                ))}

              </div>

            </section>


            {/* =================================================
                UNDERSTAND YOUR PATTERNS
                ================================================= */}

            <section className="history-insight-card">

              <div className="history-insight-icon">
                ✨
              </div>

              <div className="history-insight-content">

                <span className="card-kicker">
                  UNDERSTAND YOUR PATTERNS
                </span>

                <h2>
                  Your history can tell a story.
                </h2>

                <p>
                  Looking at your check-ins over time can help
                  you notice connections between your mood,
                  stress, sleep and academic workload.
                </p>

              </div>

              <Link
                to="/pattern-analysis"
                className="secondary-button"
              >
                View AI Insights →
              </Link>

            </section>


            {/* =================================================
                BOTTOM ACTIONS
                ================================================= */}

            <section className="history-bottom-actions">

              <Link
                to="/chart"
                className="secondary-button"
              >
                📊 View Wellbeing Trends
              </Link>

              <Link
                to="/digital-twin"
                className="primary-button"
              >
                🧬 View Digital Twin
              </Link>

            </section>


            {/* =================================================
                PRIVACY
                ================================================= */}

            <div className="history-privacy">

              <div className="history-privacy-icon">
                🔒
              </div>

              <div>

                <strong>
                  Your history is private
                </strong>

                <p>
                  Your check-in information is stored locally
                  in your app and is used to show your personal
                  wellbeing patterns.
                </p>

              </div>

              <Link
                to="/privacy"
                className="text-link"
              >
                Privacy & Consent →
              </Link>

            </div>

          </>

        )}

      </div>
    </DashboardLayout>
  );
}

export default WellbeingHistory;