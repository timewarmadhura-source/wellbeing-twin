import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function DigitalTwin() {
  const [latest, setLatest] = useState(null);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

    setCheckins(saved);

    if (saved.length > 0) {
      setLatest(saved[saved.length - 1]);
    }
  }, []);

  const getValue = (key, fallback = 0) => {
    if (!latest || latest[key] === undefined || latest[key] === "") {
      return fallback;
    }

    return Number(latest[key]);
  };

  const mood = getValue("mood");
  const stress = getValue("stress");
  const sleep = getValue("sleep");
  const workload = getValue("workload");

  const moodEmojis = {
    1: "😞",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😄",
  };

  const moodNames = {
    1: "Very Low",
    2: "Low",
    3: "Okay",
    4: "Good",
    5: "Excellent",
  };

  /*
    Calculate a simple wellbeing score.
    Higher mood and sleep improve the score.
    Higher stress and workload reduce the score.
  */

  const moodScore = mood ? mood * 20 : 0;
  const sleepScore = sleep ? Math.min(sleep / 8, 1) * 100 : 0;
  const stressScore = stress ? 100 - stress * 10 : 0;
  const workloadScore = workload ? 100 - workload * 10 : 0;

  const wellbeingScore = latest
    ? Math.round(
        (moodScore + sleepScore + stressScore + workloadScore) / 4
      )
    : 0;

  const getStatus = () => {
    if (!latest) return "No data yet";
    if (wellbeingScore >= 75) return "Doing well";
    if (wellbeingScore >= 50) return "Needs attention";
    return "Needs care";
  };

  const getInsight = () => {
    if (!latest) {
      return "Complete your first wellbeing check-in to create your digital twin.";
    }

    if (stress >= 8) {
      return "Your stress level is quite high. Consider taking a short break and giving yourself some recovery time.";
    }

    if (sleep > 0 && sleep < 6) {
      return "Your sleep is lower than recommended. Getting enough rest may help improve your mood and concentration.";
    }

    if (workload >= 8) {
      return "Your academic workload looks high. Try breaking large tasks into smaller study sessions.";
    }

    if (mood >= 4) {
      return "Your recent wellbeing indicators look positive. Keep following the habits that are helping you.";
    }

    return "Your wellbeing looks balanced, but regular check-ins will help your digital twin understand your patterns better.";
  };

  return (
    <DashboardLayout>
      <div className="twin-page">

        {/* Header */}

        <div className="twin-header">
          <div>
            <p className="eyebrow">YOUR DIGITAL PROFILE</p>

            <h1>Your Digital Twin 🌱</h1>

            <p>
              A simple view of your current wellbeing based on your check-ins.
            </p>
          </div>

          <Link to="/checkin" className="btn btn-primary">
            + New Check-in
          </Link>
        </div>


        {/* Main Twin Card */}

        <div className="card twin-main-card">

          <div className="twin-main-left">

            <div className="twin-avatar-large">
              🌱
            </div>

            <div>
              <span className="twin-label">
                CURRENT WELLBEING
              </span>

              <div className="twin-score">
                {wellbeingScore}
                <span>/100</span>
              </div>

              <div className="twin-status">
                <span className="status-dot"></span>
                {getStatus()}
              </div>
            </div>

          </div>

          <div className="twin-circle-wrapper">

            <div
              className="twin-score-circle"
              style={{
                "--score": `${wellbeingScore * 3.6}deg`,
              }}
            >
              <div className="twin-circle-inner">
                <strong>{wellbeingScore}</strong>
                <span>Wellbeing</span>
              </div>
            </div>

          </div>

        </div>


        {/* Metrics */}

        <div className="twin-section">

          <div className="dashboard-section-title">
            <div>
              <h2>Wellbeing snapshot</h2>
              <p>Your latest check-in indicators</p>
            </div>
          </div>

          <div className="twin-metrics-grid">

            <div className="card twin-metric-card mint-card">

              <div className="twin-metric-icon">
                {moodEmojis[mood] || "🙂"}
              </div>

              <div>
                <span>Mood</span>

                <strong>
                  {mood ? moodNames[mood] : "No data"}
                </strong>

                {mood > 0 && (
                  <small>{mood}/5</small>
                )}
              </div>

            </div>


            <div className="card twin-metric-card blue-card">

              <div className="twin-metric-icon">
                😴
              </div>

              <div>
                <span>Sleep</span>

                <strong>
                  {sleep ? `${sleep} hrs` : "No data"}
                </strong>

                <small>
                  {sleep >= 7
                    ? "Good rest"
                    : sleep > 0
                    ? "Needs more rest"
                    : ""}
                </small>
              </div>

            </div>


            <div className="card twin-metric-card pink-card">

              <div className="twin-metric-icon">
                🧠
              </div>

              <div>
                <span>Stress</span>

                <strong>
                  {stress ? `${stress}/10` : "No data"}
                </strong>

                <small>
                  {stress >= 7
                    ? "High"
                    : stress > 0
                    ? "Manageable"
                    : ""}
                </small>
              </div>

            </div>


            <div className="card twin-metric-card purple-card">

              <div className="twin-metric-icon">
                📚
              </div>

              <div>
                <span>Workload</span>

                <strong>
                  {workload ? `${workload}/10` : "No data"}
                </strong>

                <small>
                  {workload >= 7
                    ? "High"
                    : workload > 0
                    ? "Balanced"
                    : ""}
                </small>
              </div>

            </div>

          </div>

        </div>


        {/* Insight */}

        <div className="card twin-insight-card">

          <div className="twin-insight-icon">
            💡
          </div>

          <div>
            <span className="twin-insight-label">
              PERSONALIZED INSIGHT
            </span>

            <h2>
              What your digital twin is noticing
            </h2>

            <p>
              {getInsight()}
            </p>
          </div>

        </div>


        {/* Twin Information */}

        <div className="twin-bottom-grid">

          <div className="card twin-info-card">

            <div className="twin-info-icon">
              📊
            </div>

            <div>
              <h3>Check-in history</h3>

              <p>
                Your digital twin currently has{" "}
                <strong>{checkins.length}</strong>{" "}
                wellbeing check-in
                {checkins.length !== 1 ? "s" : ""}.
              </p>

              <Link to="/history">
                View history →
              </Link>
            </div>

          </div>


          <div className="card twin-info-card">

            <div className="twin-info-icon">
              📈
            </div>

            <div>
              <h3>See your trends</h3>

              <p>
                Understand how your mood, stress, sleep and workload change
                over time.
              </p>

              <Link to="/chart">
                View trends →
              </Link>
            </div>

          </div>

        </div>


        {/* Explanation */}

        <div className="card twin-note">

          <span>🌿</span>

          <div>
            <strong>What is your Digital Twin?</strong>

            <p>
              Your Digital Twin is a digital representation of your wellbeing
              patterns. It uses the information you provide during check-ins
              to help you understand yourself better.
            </p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default DigitalTwin;