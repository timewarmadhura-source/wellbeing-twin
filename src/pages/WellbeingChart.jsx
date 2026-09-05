import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function WellbeingChart() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("wellbeingCheckins")
      ) || [];

      setCheckins(Array.isArray(saved) ? saved : []);
    } catch (error) {
      console.error("Error loading wellbeing trends:", error);
      setCheckins([]);
    }
  }, []);

  const recentCheckins = useMemo(() => {
    return [...checkins]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7);
  }, [checkins]);

  const averages = useMemo(() => {
    if (!checkins.length) {
      return {
        mood: 0,
        stress: 0,
        sleep: 0,
        workload: 0,
      };
    }

    const total = checkins.length;

    return {
      mood:
        checkins.reduce(
          (sum, item) => sum + Number(item.mood || 0),
          0
        ) / total,

      stress:
        checkins.reduce(
          (sum, item) => sum + Number(item.stress || 0),
          0
        ) / total,

      sleep:
        checkins.reduce(
          (sum, item) => sum + Number(item.sleep || 0),
          0
        ) / total,

      workload:
        checkins.reduce(
          (sum, item) => sum + Number(item.workload || 0),
          0
        ) / total,
    };
  }, [checkins]);

  const getMoodEmoji = (value) => {
    const emojis = {
      1: "😊",
      2: "🙂",
      3: "😐",
      4: "😟",
      5: "😣",
    };

    return emojis[value] || "🙂";
  };

  const getDateLabel = (date) => {
    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
    } catch {
      return "";
    }
  };

  const getTrend = (key) => {
    if (recentCheckins.length < 2) {
      return "Not enough data";
    }

    const first = Number(recentCheckins[0][key] || 0);
    const last = Number(
      recentCheckins[recentCheckins.length - 1][key] || 0
    );

    if (last > first) return "Increasing";
    if (last < first) return "Decreasing";

    return "Stable";
  };

  const getTrendIcon = (trend) => {
    if (trend === "Increasing") return "↗";
    if (trend === "Decreasing") return "↘";
    if (trend === "Stable") return "→";

    return "•";
  };

  const getMoodMessage = () => {
    if (averages.mood <= 0) {
      return "Complete a few check-ins to discover your mood patterns.";
    }

    if (averages.mood <= 2) {
      return "Your recent mood looks positive. Keep doing the things that help you feel good.";
    }

    if (averages.mood <= 3) {
      return "Your mood has been mixed recently. Regular check-ins can help you understand what affects it.";
    }

    return "Your recent mood may need some attention. Remember to give yourself time to rest and recharge.";
  };

  /* =========================================================
     EMPTY STATE
     ========================================================= */

  if (!checkins.length) {
    return (
      <DashboardLayout>
        <div className="trends-page">

          <section className="trends-hero">
            <div>
              <span className="eyebrow">
                YOUR WELLBEING JOURNEY
              </span>

              <h1>My Wellbeing Trends</h1>

              <p>
                Understand how your mood, stress, sleep and
                workload change over time.
              </p>
            </div>
          </section>

          <section className="trends-empty">

            <div className="trends-empty-icon">
              📈
            </div>

            <span className="card-kicker">
              YOUR PATTERNS WILL APPEAR HERE
            </span>

            <h2>No trend data yet</h2>

            <p>
              Complete a few wellbeing check-ins and your
              personal trends will start appearing here.
            </p>

            <Link
              to="/checkin"
              className="primary-button"
            >
              Start Check-in →
            </Link>

          </section>

        </div>
      </DashboardLayout>
    );
  }

  /* =========================================================
     MAIN PAGE
     ========================================================= */

  return (
    <DashboardLayout>
      <div className="trends-page">

        {/* =====================================================
            HEADER
            ===================================================== */}

        <section className="trends-hero">

          <div>
            <span className="eyebrow">
              YOUR WELLBEING JOURNEY
            </span>

            <h1>My Wellbeing Trends</h1>

            <p>
              See how your wellbeing changes over time and
              discover patterns that may help you understand
              yourself better.
            </p>
          </div>

          <Link
            to="/checkin"
            className="primary-button"
          >
            + New Check-in
          </Link>

        </section>


        {/* =====================================================
            OVERVIEW
            ===================================================== */}

        <section className="trends-overview-card">

          <div className="trends-overview-icon">
            🌿
          </div>

          <div>

            <span className="card-kicker">
              YOUR WELLBEING AT A GLANCE
            </span>

            <h2>
              Here's what your check-ins are telling you.
            </h2>

            <p>
              {getMoodMessage()}
            </p>

          </div>

        </section>


        {/* =====================================================
            SUMMARY CARDS
            ===================================================== */}

        <section className="trend-summary">

          <div className="trend-summary-card trend-green">

            <div className="trend-icon">
              😊
            </div>

            <div>
              <span>Average Mood</span>

              <strong>
                {averages.mood.toFixed(1)}
                <small>/5</small>
              </strong>
            </div>

          </div>


          <div className="trend-summary-card trend-pink">

            <div className="trend-icon">
              🧘
            </div>

            <div>
              <span>Average Stress</span>

              <strong>
                {averages.stress.toFixed(1)}
                <small>/5</small>
              </strong>
            </div>

          </div>


          <div className="trend-summary-card trend-blue">

            <div className="trend-icon">
              🌙
            </div>

            <div>
              <span>Average Sleep</span>

              <strong>
                {averages.sleep.toFixed(1)}
                <small> hrs</small>
              </strong>
            </div>

          </div>


          <div className="trend-summary-card trend-yellow">

            <div className="trend-icon">
              📚
            </div>

            <div>
              <span>Average Workload</span>

              <strong>
                {averages.workload.toFixed(1)}
                <small>/5</small>
              </strong>
            </div>

          </div>

        </section>


        {/* =====================================================
            MOOD TREND
            ===================================================== */}

        <section className="trend-main-card">

          <div className="trend-card-header">

            <div>
              <span className="card-kicker">
                RECENT PATTERN
              </span>

              <h2>Your Mood Journey</h2>

              <p>
                Your last {recentCheckins.length} check-ins
                shown from oldest to newest.
              </p>
            </div>

            <div className="trend-period">
              Last {recentCheckins.length}
            </div>

          </div>


          <div className="trend-chart">

            {recentCheckins.map((item, index) => {

              const mood = Number(item.mood || 0);

              const height =
                mood > 0
                  ? Math.max(mood * 18, 12)
                  : 12;

              return (
                <div
                  className="trend-column"
                  key={item.id || index}
                >

                  <div className="trend-value">
                    {mood || "—"}
                  </div>

                  <div className="trend-bar-area">

                    <div
                      className="trend-bar"
                      style={{
                        height: `${height}%`,
                      }}
                    >
                      <span>
                        {getMoodEmoji(mood)}
                      </span>
                    </div>

                  </div>

                  <div className="trend-date">
                    {getDateLabel(item.date)}
                  </div>

                </div>
              );
            })}

          </div>


          <div className="trend-legend">

            <span>
              <i className="legend-dot mood-dot"></i>
              Mood score
            </span>

            <span>
              1 = lowest
            </span>

            <span>
              5 = highest
            </span>

          </div>

        </section>


        {/* =====================================================
            WHAT IS CHANGING
            ===================================================== */}

        <section className="trend-pattern-section">

          <div className="section-heading">

            <div>
              <span className="card-kicker">
                NOTICE THE CHANGES
              </span>

              <h2>What's changing?</h2>

              <p>
                A simple look at the direction of your recent
                wellbeing patterns.
              </p>
            </div>

          </div>


          <div className="trend-pattern-grid">

            {[
              ["😊", "Mood", "mood", "green"],
              ["🧘", "Stress", "stress", "pink"],
              ["🌙", "Sleep", "sleep", "blue"],
              ["📚", "Workload", "workload", "yellow"],
            ].map(([emoji, label, key, colorClass]) => {

              const trend = getTrend(key);

              return (
                <div
                  className={`trend-pattern-card ${colorClass}`}
                  key={key}
                >

                  <div className="trend-pattern-top">

                    <div className="trend-pattern-emoji">
                      {emoji}
                    </div>

                    <div>
                      <strong>{label}</strong>

                      <small>
                        Recent direction
                      </small>
                    </div>

                  </div>


                  <div className="trend-direction">

                    <span>
                      {getTrendIcon(trend)}
                    </span>

                    <strong>
                      {trend}
                    </strong>

                  </div>

                </div>
              );
            })}

          </div>

        </section>


        {/* =====================================================
            PERSONAL INSIGHT
            ===================================================== */}

        <section className="trend-insight">

          <div className="trend-insight-icon">
            💡
          </div>

          <div>

            <span className="card-kicker">
              PERSONAL INSIGHT
            </span>

            <h2>
              {averages.mood <= 2
                ? "Your overall mood looks positive."
                : averages.stress >= 4
                ? "Your stress level may need some attention."
                : averages.sleep < 6
                ? "Getting more consistent sleep may support your wellbeing."
                : "Keep checking in to understand your wellbeing better."}
            </h2>

            <p>
              Trends become more useful as you continue
              completing regular check-ins.
            </p>

          </div>

        </section>


        {/* =====================================================
            UNDERSTANDING YOUR DATA
            ===================================================== */}

        <section className="trend-understanding">

          <div className="trend-understanding-icon">
            🌱
          </div>

          <div>

            <span className="card-kicker">
              A SMALL REMINDER
            </span>

            <h2>
              Your wellbeing isn't a number.
            </h2>

            <p>
              These trends are simply a way to notice patterns.
              They don't define how you're doing. Use them as
              a gentle guide to understand yourself better.
            </p>

          </div>

        </section>


        {/* =====================================================
            ACTIONS
            ===================================================== */}

        <div className="trend-actions">

          <Link
            to="/history"
            className="secondary-button"
          >
            View Full History
          </Link>

          <Link
            to="/digital-twin"
            className="primary-button"
          >
            🧬 View Digital Twin
          </Link>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default WellbeingChart;