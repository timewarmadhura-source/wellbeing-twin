import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function StudentDashboard() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("wellbeingCheckins");

      if (savedData) {
        const parsedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          setCheckins(parsedData);
        }
      }
    } catch (error) {
      console.error("Error loading wellbeing data:", error);
      setCheckins([]);
    }
  }, []);

  const latestCheckin = useMemo(() => {
    if (!checkins.length) return null;

    return [...checkins].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    })[0];
  }, [checkins]);

  const moodInfo = {
    1: { emoji: "😊", label: "Good" },
    2: { emoji: "🙂", label: "Okay" },
    3: { emoji: "😐", label: "Not great" },
    4: { emoji: "😟", label: "Difficult" },
    5: { emoji: "😣", label: "Very difficult" },
  };

  const levelInfo = {
    1: "Very low",
    2: "Low",
    3: "Moderate",
    4: "High",
    5: "Very high",
  };

  const getWellbeingStatus = () => {
    if (!latestCheckin) {
      return {
        title: "Let's check in",
        message:
          "Take a moment to tell us how you're feeling today.",
        emoji: "🌱",
      };
    }

    const mood = Number(latestCheckin.mood);
    const stress = Number(latestCheckin.stress);
    const sleep = Number(latestCheckin.sleep);
    const workload = Number(latestCheckin.workload);

    if (mood <= 2 && stress <= 2 && sleep >= 7) {
      return {
        title: "You're doing well",
        message:
          "Your recent check-in shows some positive wellbeing signals. Keep taking care of yourself.",
        emoji: "🌿",
      };
    }

    if (stress >= 4 || workload >= 4 || sleep < 6) {
      return {
        title: "You may need a little support",
        message:
          "Your recent responses suggest that things may feel a little heavy. Small breaks and support can help.",
        emoji: "💚",
      };
    }

    return {
      title: "You're doing okay",
      message:
        "Your wellbeing looks fairly balanced. Keep checking in with yourself regularly.",
      emoji: "🌼",
    };
  };

  const wellbeingStatus = getWellbeingStatus();

  const formatDate = (date) => {
    if (!date) return "";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="student-dashboard">

        {/* =====================================================
            WELCOME HEADER
            ===================================================== */}

        <section className="dashboard-welcome">
          <div>
            <div className="eyebrow">STUDENT WELLBEING</div>

            <h1>Hi, Madhura! 👋</h1>

            <p>
              Welcome back. Let's see how you're doing today.
            </p>
          </div>

          <div className="dashboard-date">
            <span>Today</span>
            <strong>
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}
            </strong>
          </div>
        </section>


        {/* =====================================================
            TODAY'S FEELING
            ===================================================== */}

        <section className="today-feeling-card">

          <div className="today-feeling-content">

            <div className="today-feeling-icon">
              {latestCheckin
                ? moodInfo[Number(latestCheckin.mood)]?.emoji || "😊"
                : "🌱"}
            </div>

            <div>
              <span className="card-kicker">
                HOW ARE THINGS FEELING TODAY?
              </span>

              <h2>
                {latestCheckin
                  ? `You're feeling ${
                      moodInfo[Number(latestCheckin.mood)]?.label?.toLowerCase() ||
                      "okay"
                    }`
                  : "Let's check in with yourself"}
              </h2>

              <p>
                {latestCheckin
                  ? `Your last check-in was on ${formatDate(
                      latestCheckin.date
                    )}.`
                  : "A quick check-in helps your wellbeing twin understand your day."}
              </p>
            </div>

          </div>

          <Link
            to="/checkin"
            className="primary-button dashboard-checkin-button"
          >
            {latestCheckin ? "Update Check-in →" : "Start Check-in →"}
          </Link>

        </section>


        {/* =====================================================
            QUICK METRICS
            ===================================================== */}

        <section className="dashboard-metrics">

          <div className="metric-card metric-mood">
            <div className="metric-card-top">
              <span className="metric-icon">😊</span>
              <span className="metric-label">MOOD</span>
            </div>

            <strong>
              {latestCheckin
                ? moodInfo[Number(latestCheckin.mood)]?.label || "—"
                : "—"}
            </strong>

            <p>
              {latestCheckin
                ? "Latest check-in"
                : "No check-in yet"}
            </p>
          </div>


          <div className="metric-card metric-stress">
            <div className="metric-card-top">
              <span className="metric-icon">🫶</span>
              <span className="metric-label">STRESS</span>
            </div>

            <strong>
              {latestCheckin
                ? levelInfo[Number(latestCheckin.stress)] || "—"
                : "—"}
            </strong>

            <p>
              {latestCheckin
                ? "Current level"
                : "Add a check-in"}
            </p>
          </div>


          <div className="metric-card metric-sleep">
            <div className="metric-card-top">
              <span className="metric-icon">🌙</span>
              <span className="metric-label">SLEEP</span>
            </div>

            <strong>
              {latestCheckin
                ? `${latestCheckin.sleep} hrs`
                : "—"}
            </strong>

            <p>
              {latestCheckin
                ? "Last night"
                : "Add your sleep"}
            </p>
          </div>


          <div className="metric-card metric-workload">
            <div className="metric-card-top">
              <span className="metric-icon">📚</span>
              <span className="metric-label">WORKLOAD</span>
            </div>

            <strong>
              {latestCheckin
                ? levelInfo[Number(latestCheckin.workload)] || "—"
                : "—"}
            </strong>

            <p>
              {latestCheckin
                ? "Academic load"
                : "Add a check-in"}
            </p>
          </div>

        </section>


        {/* =====================================================
            WELLBEING INSIGHT
            ===================================================== */}

        <section className="dashboard-two-column">

          <div className="dashboard-card wellbeing-insight-card">

            <div className="dashboard-card-heading">
              <div className="dashboard-card-icon green">
                {wellbeingStatus.emoji}
              </div>

              <div>
                <span className="card-kicker">
                  YOUR WELLBEING
                </span>

                <h2>{wellbeingStatus.title}</h2>
              </div>
            </div>

            <p className="dashboard-card-text">
              {wellbeingStatus.message}
            </p>

            <Link
              to="/pattern-analysis"
              className="text-link"
            >
              View AI Insights →
            </Link>

          </div>


          {/* =====================================================
              DIGITAL TWIN
              ===================================================== */}

          <div className="dashboard-card digital-twin-card">

            <div className="dashboard-card-heading">
              <div className="dashboard-card-icon blue">
                🧬
              </div>

              <div>
                <span className="card-kicker">
                  YOUR DIGITAL TWIN
                </span>

                <h2>Digital Wellbeing Twin</h2>
              </div>
            </div>

            <p className="dashboard-card-text">
              Your digital twin learns from your wellbeing
              check-ins to help you understand your patterns.
            </p>

            <Link
              to="/digital-twin"
              className="secondary-button"
            >
              Explore My Twin →
            </Link>

          </div>

        </section>


        {/* =====================================================
            QUICK ACTIONS
            ===================================================== */}

        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <span className="card-kicker">QUICK ACTIONS</span>
              <h2>Take care of yourself</h2>
            </div>
          </div>


          <div className="quick-action-grid">

            <Link
              to="/checkin"
              className="quick-action-card quick-action-green"
            >
              <div className="quick-action-icon">
                💚
              </div>

              <div>
                <h3>Daily Check-in</h3>
                <p>
                  Tell us how you're feeling today.
                </p>
              </div>

              <span className="quick-action-arrow">
                →
              </span>
            </Link>


            <Link
              to="/chart"
              className="quick-action-card quick-action-blue"
            >
              <div className="quick-action-icon">
                📊
              </div>

              <div>
                <h3>View My Trends</h3>
                <p>
                  See how your wellbeing changes over time.
                </p>
              </div>

              <span className="quick-action-arrow">
                →
              </span>
            </Link>


            <Link
              to="/counsellor-connect"
              className="quick-action-card quick-action-pink"
            >
              <div className="quick-action-icon">
                💬
              </div>

              <div>
                <h3>Talk Privately</h3>
                <p>
                  Connect with a counsellor when you need support.
                </p>
              </div>

              <span className="quick-action-arrow">
                →
              </span>
            </Link>


            <Link
              to="/pattern-analysis"
              className="quick-action-card quick-action-purple"
            >
              <div className="quick-action-icon">
                ✨
              </div>

              <div>
                <h3>AI Insights</h3>
                <p>
                  Understand patterns in your wellbeing data.
                </p>
              </div>

              <span className="quick-action-arrow">
                →
              </span>
            </Link>

          </div>

        </section>


        {/* =====================================================
            2-MINUTE RESET
            ===================================================== */}

        <section className="reset-card">

          <div className="reset-icon">
            🌿
          </div>

          <div className="reset-content">
            <span className="card-kicker">
              TAKE A SMALL BREAK
            </span>

            <h2>2-minute reset</h2>

            <p>
              Pause, breathe, stretch and give yourself
              a small moment away from your workload.
            </p>
          </div>

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              alert(
                "Take a slow breath in for 4 seconds, hold for 2 seconds, and breathe out for 6 seconds. Repeat a few times. 🌿"
              )
            }
          >
            Start Reset
          </button>

        </section>


        {/* =====================================================
            RECENT ACTIVITY
            ===================================================== */}

        <section className="dashboard-card recent-activity-card">

          <div className="section-heading">
            <div>
              <span className="card-kicker">
                YOUR ACTIVITY
              </span>

              <h2>Recent wellbeing activity</h2>
            </div>

            <Link
              to="/history"
              className="text-link"
            >
              View all →
            </Link>
          </div>


          {checkins.length === 0 ? (
            <div className="dashboard-empty-state">
              <div>🌱</div>

              <h3>No check-ins yet</h3>

              <p>
                Your wellbeing activity will appear here
                after your first check-in.
              </p>

              <Link
                to="/checkin"
                className="primary-button"
              >
                Start My First Check-in
              </Link>
            </div>
          ) : (
            <div className="recent-checkin">

              <div className="recent-checkin-icon">
                {moodInfo[Number(latestCheckin?.mood)]?.emoji || "😊"}
              </div>

              <div className="recent-checkin-info">

                <strong>
                  {moodInfo[Number(latestCheckin?.mood)]?.label ||
                    "Wellbeing check-in"}
                </strong>

                <span>
                  {latestCheckin
                    ? formatDate(latestCheckin.date)
                    : ""}
                </span>

              </div>

              <div className="recent-checkin-values">

                <span>
                  Stress:{" "}
                  {latestCheckin?.stress || "—"}
                </span>

                <span>
                  Sleep:{" "}
                  {latestCheckin?.sleep || "—"} hrs
                </span>

                <span>
                  Workload:{" "}
                  {latestCheckin?.workload || "—"}
                </span>

              </div>

            </div>
          )}

        </section>


        {/* =====================================================
            PRIVACY NOTE
            ===================================================== */}

        <div className="dashboard-privacy-note">

          <span>🔒</span>

          <div>
            <strong>Your wellbeing data is private</strong>

            <p>
              Your check-ins are stored in this app and
              are used to personalize your wellbeing experience.
            </p>
          </div>

          <Link
            to="/privacy"
            className="text-link"
          >
            Privacy & Consent →
          </Link>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;