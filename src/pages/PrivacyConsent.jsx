import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function PrivacyConsent() {
  const [consent, setConsent] = useState({
    wellbeing: true,
    academic: true,
    insights: true,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("privacyConsent"));

    if (saved) {
      setConsent(saved);
    }
  }, []);

  const updateConsent = (key) => {
    const updated = {
      ...consent,
      [key]: !consent[key],
    };

    setConsent(updated);
    localStorage.setItem("privacyConsent", JSON.stringify(updated));
  };

  const clearWellbeingData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your wellbeing check-in data?"
    );

    if (confirmed) {
      localStorage.removeItem("wellbeingCheckins");
      alert("Your wellbeing check-in data has been deleted.");
    }
  };

  const clearAllAppData = () => {
    const confirmed = window.confirm(
      "This will remove your saved wellbeing, exam and workload data. Continue?"
    );

    if (confirmed) {
      localStorage.removeItem("wellbeingCheckins");
      localStorage.removeItem("exams");
      localStorage.removeItem("academicWorkload");

      alert("Your saved app data has been cleared.");
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <div className="eyebrow">YOUR PRIVACY</div>
          <h1>Privacy & Consent</h1>
          <p>
            You are in control of the information you share with the app.
          </p>
        </div>
      </div>

      {/* Privacy hero */}
      <section className="privacy-hero">
        <div className="privacy-hero-icon">🔒</div>

        <div>
          <span>YOUR DATA, YOUR CHOICE</span>
          <h2>Your wellbeing information belongs to you.</h2>
          <p>
            Wellbeing Twin is designed to give you control over the information
            used by your personal wellbeing dashboard.
          </p>
        </div>
      </section>

      {/* Consent settings */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Consent Settings</h2>
            <p>Choose what information the app can use.</p>
          </div>
        </div>

        <div className="consent-list">
          <div className="consent-card">
            <div className="consent-icon green">💚</div>

            <div className="consent-content">
              <h3>Wellbeing information</h3>
              <p>
                Allows the app to store your mood, stress, sleep and workload
                check-ins.
              </p>
            </div>

            <button
              className={`toggle-button ${
                consent.wellbeing ? "toggle-on" : ""
              }`}
              onClick={() => updateConsent("wellbeing")}
              aria-label="Toggle wellbeing consent"
            >
              <span></span>
            </button>
          </div>

          <div className="consent-card">
            <div className="consent-icon blue">📚</div>

            <div className="consent-content">
              <h3>Academic information</h3>
              <p>
                Allows the app to store your exam calendar and academic
                workload information.
              </p>
            </div>

            <button
              className={`toggle-button ${
                consent.academic ? "toggle-on" : ""
              }`}
              onClick={() => updateConsent("academic")}
              aria-label="Toggle academic consent"
            >
              <span></span>
            </button>
          </div>

          <div className="consent-card">
            <div className="consent-icon purple">✦</div>

            <div className="consent-content">
              <h3>Personalized insights</h3>
              <p>
                Allows the app to use your saved check-ins to generate
                personalized wellbeing observations.
              </p>
            </div>

            <button
              className={`toggle-button ${
                consent.insights ? "toggle-on" : ""
              }`}
              onClick={() => updateConsent("insights")}
              aria-label="Toggle personalized insights consent"
            >
              <span></span>
            </button>
          </div>
        </div>
      </section>

      {/* What is stored */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>What is stored?</h2>
            <p>Information currently used by your local app.</p>
          </div>
        </div>

        <div className="privacy-info-grid">
          <div className="privacy-info-card">
            <span>😊</span>
            <div>
              <strong>Wellbeing check-ins</strong>
              <p>Mood, stress, sleep, workload and optional notes.</p>
            </div>
          </div>

          <div className="privacy-info-card">
            <span>📅</span>
            <div>
              <strong>Exam calendar</strong>
              <p>Your saved subjects, exam dates and times.</p>
            </div>
          </div>

          <div className="privacy-info-card">
            <span>📝</span>
            <div>
              <strong>Academic workload</strong>
              <p>Your study tasks, hours and deadlines.</p>
            </div>
          </div>

          <div className="privacy-info-card">
            <span>✦</span>
            <div>
              <strong>Wellbeing insights</strong>
              <p>Patterns calculated from your saved check-in information.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Data controls */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <h2>Manage Your Data</h2>
            <p>You can remove your saved information at any time.</p>
          </div>
        </div>

        <div className="data-actions">
          <div className="data-action-card">
            <div>
              <h3>Delete wellbeing data</h3>
              <p>
                Remove all saved mood, stress, sleep and workload check-ins.
              </p>
            </div>

            <button
              className="danger-button"
              onClick={clearWellbeingData}
            >
              Delete
            </button>
          </div>

          <div className="data-action-card">
            <div>
              <h3>Clear all app data</h3>
              <p>
                Remove wellbeing check-ins, exams and academic workload data.
              </p>
            </div>

            <button
              className="danger-button"
              onClick={clearAllAppData}
            >
              Clear All
            </button>
          </div>
        </div>
      </section>

      {/* Privacy promise */}
      <div className="privacy-promise">
        <div className="privacy-promise-icon">🛡️</div>

        <div>
          <h3>Privacy first</h3>
          <p>
            This project currently stores your information in your browser
            using local storage. A production version should add proper
            authentication, secure storage, encryption and clear data-sharing
            policies.
          </p>
        </div>
      </div>

      <div className="page-actions">
        <Link to="/student-dashboard" className="primary-button">
          Back to Dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
}

export default PrivacyConsent;