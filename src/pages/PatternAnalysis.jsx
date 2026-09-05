import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function PatternAnalysis() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];
    setCheckins(saved);
  }, []);

  const analysis = useMemo(() => {
    if (!checkins.length) {
      return {
        avgMood: 0,
        avgStress: 0,
        avgSleep: 0,
        avgWorkload: 0,
        insights: [],
      };
    }

    const total = checkins.length;

    const avgMood =
      checkins.reduce((sum, item) => sum + Number(item.mood || 0), 0) / total;

    const avgStress =
      checkins.reduce((sum, item) => sum + Number(item.stress || 0), 0) / total;

    const avgSleep =
      checkins.reduce((sum, item) => sum + Number(item.sleep || 0), 0) / total;

    const avgWorkload =
      checkins.reduce(
        (sum, item) => sum + Number(item.workload || 0),
        0
      ) / total;

    const insights = [];

    if (avgStress >= 4) {
      insights.push({
        icon: "🌿",
        title: "Stress is on the higher side",
        text: "Your recent check-ins show higher stress. Try short breaks, breathing exercises, and a lighter study schedule.",
        type: "warning",
      });
    } else if (avgStress <= 2) {
      insights.push({
        icon: "😊",
        title: "Stress looks manageable",
        text: "Your recent stress levels are relatively low. Keep following the habits that help you stay calm.",
        type: "positive",
      });
    } else {
      insights.push({
        icon: "💚",
        title: "Your stress is moderate",
        text: "Your stress level is fairly balanced. Keep monitoring it during busy academic periods.",
        type: "normal",
      });
    }

    if (avgSleep < 6) {
      insights.push({
        icon: "😴",
        title: "Sleep may need attention",
        text: "Your average sleep is below 6 hours. Try maintaining a regular sleep schedule and reducing late-night study.",
        type: "warning",
      });
    } else {
      insights.push({
        icon: "🌙",
        title: "Sleep pattern looks healthy",
        text: "Your average sleep duration is looking reasonable. Consistent sleep can support concentration and mood.",
        type: "positive",
      });
    }

    if (avgWorkload >= 4) {
      insights.push({
        icon: "📚",
        title: "Academic workload is high",
        text: "Your workload appears high. Breaking large tasks into smaller goals may make studying easier.",
        type: "warning",
      });
    } else {
      insights.push({
        icon: "✨",
        title: "Workload is manageable",
        text: "Your academic workload appears manageable based on your recent check-ins.",
        type: "positive",
      });
    }

    if (avgMood >= 4) {
      insights.push({
        icon: "🌸",
        title: "Positive mood trend",
        text: "Your mood has generally been positive. Continue the activities and routines that make you feel good.",
        type: "positive",
      });
    } else if (avgMood <= 2) {
      insights.push({
        icon: "💙",
        title: "Mood may need some care",
        text: "Your recent mood scores are lower. Give yourself time to rest and consider talking to someone you trust if needed.",
        type: "warning",
      });
    }

    return {
      avgMood,
      avgStress,
      avgSleep,
      avgWorkload,
      insights,
    };
  }, [checkins]);

  const getBarWidth = (value, max = 5) => {
    return `${Math.min((value / max) * 100, 100)}%`;
  };

  if (!checkins.length) {
    return (
      <DashboardLayout>
        <div className="page-header">
          <div>
            <div className="eyebrow">PERSONALIZED INSIGHTS</div>
            <h1>AI Insights</h1>
            <p>
              Understand your wellbeing patterns and receive helpful
              suggestions.
            </p>
          </div>
        </div>

        <div className="empty-state">
          <div className="empty-state-icon">✦</div>
          <h2>No insights yet</h2>
          <p>
            Complete a few wellbeing check-ins first. Your patterns will appear
            here automatically.
          </p>

          <Link to="/checkin" className="primary-button">
            Start Check-in
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <div className="eyebrow">PERSONALIZED INSIGHTS</div>
          <h1>AI Insights</h1>
          <p>
            Simple patterns from your recent wellbeing check-ins.
          </p>
        </div>

        <Link to="/checkin" className="secondary-button">
          + New Check-in
        </Link>
      </div>

      {/* Main insight */}
      <section className="insight-hero">
        <div className="insight-hero-icon">✦</div>

        <div>
          <div className="insight-label">YOUR WELLBEING PATTERN</div>
          <h2>
            {analysis.avgStress >= 4 || analysis.avgSleep < 6
              ? "A little more self-care may help."
              : analysis.avgMood >= 4
              ? "You're building a healthy wellbeing pattern."
              : "Keep checking in with yourself."}
          </h2>

          <p>
            These insights are based on your recent check-in information and
            are designed to help you notice changes in your routine.
          </p>
        </div>
      </section>

      {/* Pattern summary */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Pattern Summary</h2>
            <p>Your average values from recent check-ins.</p>
          </div>
        </div>

        <div className="pattern-grid">
          <div className="pattern-card">
            <div className="pattern-card-top">
              <span className="pattern-icon pattern-mood">😊</span>
              <span>Mood</span>
            </div>

            <strong>{analysis.avgMood.toFixed(1)}/5</strong>

            <div className="pattern-bar">
              <div
                className="pattern-bar-fill"
                style={{ width: getBarWidth(analysis.avgMood) }}
              ></div>
            </div>

            <small>Higher is better</small>
          </div>

          <div className="pattern-card">
            <div className="pattern-card-top">
              <span className="pattern-icon pattern-stress">🧘</span>
              <span>Stress</span>
            </div>

            <strong>{analysis.avgStress.toFixed(1)}/5</strong>

            <div className="pattern-bar">
              <div
                className="pattern-bar-fill"
                style={{ width: getBarWidth(analysis.avgStress) }}
              ></div>
            </div>

            <small>Lower is better</small>
          </div>

          <div className="pattern-card">
            <div className="pattern-card-top">
              <span className="pattern-icon pattern-sleep">🌙</span>
              <span>Sleep</span>
            </div>

            <strong>{analysis.avgSleep.toFixed(1)} hrs</strong>

            <div className="pattern-bar">
              <div
                className="pattern-bar-fill"
                style={{
                  width: `${Math.min((analysis.avgSleep / 8) * 100, 100)}%`,
                }}
              ></div>
            </div>

            <small>Based on your check-ins</small>
          </div>

          <div className="pattern-card">
            <div className="pattern-card-top">
              <span className="pattern-icon pattern-workload">📚</span>
              <span>Workload</span>
            </div>

            <strong>{analysis.avgWorkload.toFixed(1)}/5</strong>

            <div className="pattern-bar">
              <div
                className="pattern-bar-fill"
                style={{ width: getBarWidth(analysis.avgWorkload) }}
              ></div>
            </div>

            <small>Lower is easier to manage</small>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>What I noticed</h2>
            <p>Personalized observations from your recent data.</p>
          </div>
        </div>

        <div className="insights-list">
          {analysis.insights.map((insight, index) => (
            <div
              className={`ai-insight-card ai-insight-${insight.type}`}
              key={index}
            >
              <div className="ai-insight-icon">{insight.icon}</div>

              <div className="ai-insight-content">
                <h3>{insight.title}</h3>
                <p>{insight.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Small steps for you</h2>
            <p>Simple actions based on your current pattern.</p>
          </div>
        </div>

        <div className="recommendation-grid">
          <div className="recommendation-card">
            <span>🌿</span>
            <div>
              <h3>Take short breaks</h3>
              <p>
                Try a 5–10 minute break after focused study sessions.
              </p>
            </div>
          </div>

          <div className="recommendation-card">
            <span>💧</span>
            <div>
              <h3>Look after your routine</h3>
              <p>
                Keep regular meals, hydration, rest, and study times.
              </p>
            </div>
          </div>

          <div className="recommendation-card">
            <span>📝</span>
            <div>
              <h3>Plan smaller tasks</h3>
              <p>
                Divide large academic tasks into smaller achievable goals.
              </p>
            </div>
          </div>

          <div className="recommendation-card">
            <span>💬</span>
            <div>
              <h3>Talk when you need help</h3>
              <p>
                If something feels difficult, consider connecting with a
                counsellor or trusted person.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="page-actions">
        <Link to="/chart" className="secondary-button">
          View Trends
        </Link>

        <Link to="/digital-twin" className="primary-button">
          View Digital Twin
        </Link>
      </div>

      <div className="privacy-note">
        <span>🔒</span>
        <div>
          <strong>Your data stays personal</strong>
          <p>
            These insights are generated from the wellbeing information stored
            in your app.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PatternAnalysis;