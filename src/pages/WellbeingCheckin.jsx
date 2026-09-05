import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function WellbeingCheckin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mood: "",
    stress: "",
    sleep: "",
    workload: "",
    notes: "",
  });

  const moods = [
    { value: 1, emoji: "😊", label: "Good" },
    { value: 2, emoji: "🙂", label: "Okay" },
    { value: 3, emoji: "😐", label: "Not great" },
    { value: 4, emoji: "😟", label: "Difficult" },
    { value: 5, emoji: "😣", label: "Very difficult" },
  ];

  const levels = [
    { value: 1, label: "Very low" },
    { value: 2, label: "Low" },
    { value: 3, label: "Moderate" },
    { value: 4, label: "High" },
    { value: 5, label: "Very high" },
  ];

  const handleMoodSelect = (value) => {
    setFormData((previous) => ({
      ...previous,
      mood: value,
    }));
  };

  const handleStressSelect = (value) => {
    setFormData((previous) => ({
      ...previous,
      stress: value,
    }));
  };

  const handleWorkloadSelect = (value) => {
    setFormData((previous) => ({
      ...previous,
      workload: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check required fields
    if (
      formData.mood === "" ||
      formData.stress === "" ||
      formData.sleep === "" ||
      formData.workload === ""
    ) {
      alert("Please complete all required fields.");
      return;
    }

    // Get existing check-ins
    let existingCheckins = [];

    try {
      const savedData = localStorage.getItem("wellbeingCheckins");

      if (savedData) {
        const parsedData = JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
          existingCheckins = parsedData;
        }
      }
    } catch (error) {
      console.error("Error reading saved check-ins:", error);
      existingCheckins = [];
    }

    // Create new check-in
    const newCheckin = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: Number(formData.mood),
      stress: Number(formData.stress),
      sleep: Number(formData.sleep),
      workload: Number(formData.workload),
      notes: formData.notes.trim(),
    };

    // Add new check-in to existing data
    const updatedCheckins = [
      ...existingCheckins,
      newCheckin,
    ];

    // Save to browser
    try {
      localStorage.setItem(
        "wellbeingCheckins",
        JSON.stringify(updatedCheckins)
      );

      // Verify that data was actually saved
      const verification = localStorage.getItem(
        "wellbeingCheckins"
      );

      if (!verification) {
        alert("Unable to save your check-in.");
        return;
      }

      console.log(
        "Check-in saved successfully:",
        newCheckin
      );

      console.log(
        "All saved check-ins:",
        JSON.parse(verification)
      );

      alert("Your wellbeing check-in has been saved 💚");

      // Go to dashboard
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Error saving check-in:", error);
      alert(
        "Something went wrong while saving your check-in."
      );
    }
  };

  return (
    <DashboardLayout>
      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="page-header">
        <div>
          <div className="eyebrow">
            DAILY WELLBEING
          </div>

          <h1>
            How are you feeling today?
          </h1>

          <p>
            Take a moment to check in with yourself.
            There are no right or wrong answers.
          </p>
        </div>
      </div>

      {/* =====================================================
          CHECK-IN FORM
          ===================================================== */}

      <form
        className="checkin-form"
        onSubmit={handleSubmit}
      >
        {/* =================================================
            01 MOOD
            ================================================= */}

        <section className="checkin-card">
          <div className="checkin-card-header">

            <div className="checkin-number">
              01
            </div>

            <div>
              <span className="checkin-label">
                MOOD
              </span>

              <h2>
                How are you feeling right now?
              </h2>

              <p>
                Choose the option that feels closest
                to you.
              </p>
            </div>

          </div>

          <div className="mood-options">

            {moods.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`mood-option ${
                  Number(formData.mood) === item.value
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleMoodSelect(item.value)
                }
              >
                <span className="mood-emoji">
                  {item.emoji}
                </span>

                <span className="mood-label">
                  {item.label}
                </span>
              </button>
            ))}

          </div>
        </section>

        {/* =================================================
            02 STRESS
            ================================================= */}

        <section className="checkin-card">
          <div className="checkin-card-header">

            <div className="checkin-number">
              02
            </div>

            <div>
              <span className="checkin-label">
                STRESS
              </span>

              <h2>
                How stressed do you feel?
              </h2>

              <p>
                Think about your current academic and
                personal pressure.
              </p>
            </div>

          </div>

          <div className="level-options">

            {levels.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`level-option ${
                  Number(formData.stress) === item.value
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleStressSelect(item.value)
                }
              >
                <span className="level-number">
                  {item.value}
                </span>

                <span>
                  {item.label}
                </span>
              </button>
            ))}

          </div>
        </section>

        {/* =================================================
            03 SLEEP
            ================================================= */}

        <section className="checkin-card">
          <div className="checkin-card-header">

            <div className="checkin-number">
              03
            </div>

            <div>
              <span className="checkin-label">
                SLEEP
              </span>

              <h2>
                How many hours did you sleep?
              </h2>

              <p>
                Enter approximately how long you slept
                last night.
              </p>
            </div>

          </div>

          <div className="sleep-input-wrapper">

            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={formData.sleep}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  sleep: event.target.value,
                }))
              }
              placeholder="e.g. 7.5"
              className="checkin-input"
            />

            <span className="input-unit">
              hours
            </span>

          </div>
        </section>

        {/* =================================================
            04 ACADEMIC WORKLOAD
            ================================================= */}

        <section className="checkin-card">
          <div className="checkin-card-header">

            <div className="checkin-number">
              04
            </div>

            <div>
              <span className="checkin-label">
                ACADEMIC WORKLOAD
              </span>

              <h2>
                How heavy is your workload?
              </h2>

              <p>
                Consider assignments, exams and your
                current study load.
              </p>
            </div>

          </div>

          <div className="level-options">

            {levels.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`level-option ${
                  Number(formData.workload) === item.value
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  handleWorkloadSelect(item.value)
                }
              >
                <span className="level-number">
                  {item.value}
                </span>

                <span>
                  {item.label}
                </span>
              </button>
            ))}

          </div>
        </section>

        {/* =================================================
            05 NOTES
            ================================================= */}

        <section className="checkin-card">
          <div className="checkin-card-header">

            <div className="checkin-number">
              05
            </div>

            <div>
              <span className="checkin-label">
                OPTIONAL
              </span>

              <h2>
                Anything else on your mind?
              </h2>

              <p>
                You can add a note about how your day
                is going.
              </p>
            </div>

          </div>

          <textarea
            className="checkin-textarea"
            value={formData.notes}
            onChange={(event) =>
              setFormData((previous) => ({
                ...previous,
                notes: event.target.value,
              }))
            }
            placeholder="Write anything you'd like to remember..."
            rows="5"
          />

        </section>

        {/* =================================================
            PRIVACY
            ================================================= */}

        <div className="checkin-privacy">

          <span>
            🔒
          </span>

          <div>
            <strong>
              Your check-in is private
            </strong>

            <p>
              Your responses are saved in this app to
              help you understand your wellbeing patterns
              and personalized insights.
            </p>
          </div>

        </div>

        {/* =================================================
            ACTION BUTTONS
            ================================================= */}

        <div className="checkin-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() =>
              navigate("/student-dashboard")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            Save Check-in →
          </button>

        </div>

      </form>
    </DashboardLayout>
  );
}

export default WellbeingCheckin;