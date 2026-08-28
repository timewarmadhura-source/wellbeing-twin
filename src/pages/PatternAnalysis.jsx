import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PatternAnalysis() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const checkins =
      JSON.parse(localStorage.getItem("wellbeingCheckins")) || [];

    const exams =
      JSON.parse(localStorage.getItem("exams")) || [];

    const workloads =
      JSON.parse(localStorage.getItem("academicWorkload")) || [];

    if (checkins.length < 2) {
      setAnalysis({
        status: "Not Enough Data",
        message:
          "Complete at least two wellbeing check-ins so your Digital Twin can understand your personal pattern.",
        changes: [],
        averages: null,
      });
      return;
    }

    const recent = checkins[checkins.length - 1];
    const previous = checkins.slice(0, -1);

    const average = (values) => {
      if (values.length === 0) return 0;

      return (
        values.reduce(
          (sum, value) => sum + Number(value),
          0
        ) / values.length
      );
    };

    const averageMood = average(
      previous.map((item) => item.mood)
    );

    const averageStress = average(
      previous.map((item) => item.stress)
    );

    const averageSleep = average(
      previous.map((item) => item.sleep)
    );

    const moodChange =
      Number(recent.mood) - averageMood;

    const stressChange =
      Number(recent.stress) - averageStress;

    const sleepChange =
      Number(recent.sleep) - averageSleep;

    const changes = [];

    if (moodChange <= -0.8) {
      changes.push(
        "Your mood has decreased compared with your usual pattern."
      );
    }

    if (stressChange >= 0.8) {
      changes.push(
        "Your stress has increased compared with your usual pattern."
      );
    }

    if (sleepChange <= -1) {
      changes.push(
        "Your sleep duration has decreased compared with your usual pattern."
      );
    }

    if (
      recent.workload === "High" ||
      recent.workload === "Very High"
    ) {
      changes.push(
        "Your current academic workload is high."
      );
    }

    const today = new Date();

    const upcomingExams = exams.filter((exam) => {
      const examDate = new Date(exam.examDate);

      return examDate >= today;
    });

    if (upcomingExams.length > 0) {
      changes.push(
        `You have ${upcomingExams.length} upcoming exam(s).`
      );
    }

    if (workloads.length > 0) {
      const latestWorkload =
        workloads[workloads.length - 1];

      if (
        latestWorkload.workload === "High" ||
        latestWorkload.workload === "Very High"
      ) {
        changes.push(
          "Your recent academic workload records also show increased workload."
        );
      }
    }

    let status = "Pattern Stable";

    if (changes.length > 0) {
      status = "Pattern Change Detected";
    }

    setAnalysis({
      status,
      message:
        changes.length > 0
          ? "Your recent wellbeing pattern is different from your usual pattern."
          : "Your recent wellbeing pattern is currently similar to your usual pattern.",
      changes,
      averages: {
        mood: averageMood,
        stress: averageStress,
        sleep: averageSleep,
      },
      recent,
    });
  }, []);

  if (!analysis) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f7fb",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>🧠 Analyzing your wellbeing pattern...</h2>
      </div>
    );
  }

  const patternChanged =
    analysis.status === "Pattern Change Detected";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef4ff, #f8f1ff, #eefbf7)",
        fontFamily: "Arial, sans-serif",
        color: "#1f2937",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                color: "#312e81",
              }}
            >
              🧠 Pattern Analysis
            </h1>

            <p style={{ color: "#6b7280" }}>
              Your Digital Twin is analyzing changes in
              your personal wellbeing pattern.
            </p>
          </div>

          <Link to="/student">
            <button
              style={{
                padding: "12px 20px",
                background: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              ← Dashboard
            </button>
          </Link>
        </div>


        {/* Status */}
        <div
          style={{
            background: patternChanged
              ? "#fff7ed"
              : "#ecfdf5",
            padding: "30px",
            borderRadius: "22px",
            marginBottom: "25px",
            borderLeft: patternChanged
              ? "6px solid #f59e0b"
              : "6px solid #10b981",
            boxShadow:
              "0 7px 22px rgba(0,0,0,0.07)",
          }}
        >
          <div style={{ fontSize: "45px" }}>
            {patternChanged ? "⚠️" : "✅"}
          </div>

          <h2
            style={{
              color: patternChanged
                ? "#b45309"
                : "#047857",
            }}
          >
            {analysis.status}
          </h2>

          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            {analysis.message}
          </p>
        </div>


        {/* Not Enough Data */}
        {!analysis.averages && (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "20px",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.07)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "50px" }}>📊</div>

            <h2>More data is needed</h2>

            <p style={{ color: "#6b7280" }}>
              Your Digital Twin needs at least two
              check-ins before it can compare your recent
              wellbeing with your personal baseline.
            </p>

            <Link to="/checkin">
              <button
                style={{
                  marginTop: "15px",
                  padding: "13px 22px",
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                📝 Complete Check-in
              </button>
            </Link>
          </div>
        )}


        {/* Analysis Data */}
        {analysis.averages && (
          <>
            {/* Comparison */}
            <div
              style={{
                background: "white",
                padding: "28px",
                borderRadius: "20px",
                boxShadow:
                  "0 6px 20px rgba(0,0,0,0.07)",
                marginBottom: "25px",
              }}
            >
              <h2 style={{ color: "#312e81" }}>
                📊 Personal Baseline vs Latest
              </h2>

              <p style={{ color: "#6b7280" }}>
                The system compares your latest check-in
                with your previous personal pattern.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "15px",
                  marginTop: "20px",
                }}
              >

                {/* Mood */}
                <div
                  style={{
                    background: "#eef2ff",
                    padding: "20px",
                    borderRadius: "14px",
                  }}
                >
                  <div style={{ fontSize: "28px" }}>
                    😊
                  </div>

                  <strong>Mood</strong>

                  <p>
                    Baseline:{" "}
                    {analysis.averages.mood.toFixed(1)}
                  </p>

                  <h3>
                    Latest: {analysis.recent.mood} / 5
                  </h3>
                </div>


                {/* Stress */}
                <div
                  style={{
                    background: "#fff7ed",
                    padding: "20px",
                    borderRadius: "14px",
                  }}
                >
                  <div style={{ fontSize: "28px" }}>
                    😟
                  </div>

                  <strong>Stress</strong>

                  <p>
                    Baseline:{" "}
                    {analysis.averages.stress.toFixed(1)}
                  </p>

                  <h3>
                    Latest: {analysis.recent.stress} / 5
                  </h3>
                </div>


                {/* Sleep */}
                <div
                  style={{
                    background: "#ecfdf5",
                    padding: "20px",
                    borderRadius: "14px",
                  }}
                >
                  <div style={{ fontSize: "28px" }}>
                    😴
                  </div>

                  <strong>Sleep</strong>

                  <p>
                    Baseline:{" "}
                    {analysis.averages.sleep.toFixed(1)}
                    {" "}hrs
                  </p>

                  <h3>
                    Latest: {analysis.recent.sleep} hrs
                  </h3>
                </div>

              </div>
            </div>


            {/* Changes */}
            <div
              style={{
                background: "white",
                padding: "28px",
                borderRadius: "20px",
                boxShadow:
                  "0 6px 20px rgba(0,0,0,0.07)",
                marginBottom: "25px",
              }}
            >
              <h2 style={{ color: "#312e81" }}>
                🔎 What Did the System Detect?
              </h2>

              {analysis.changes.length > 0 ? (
                <div>
                  {analysis.changes.map(
                    (change, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#fff7ed",
                          padding: "16px",
                          borderRadius: "12px",
                          marginBottom: "10px",
                          borderLeft:
                            "4px solid #f59e0b",
                        }}
                      >
                        ⚠️ {change}
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div
                  style={{
                    background: "#ecfdf5",
                    padding: "18px",
                    borderRadius: "12px",
                    color: "#047857",
                  }}
                >
                  ✅ No significant changes were
                  detected in your recent pattern.
                </div>
              )}
            </div>


            {/* Support */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #312e81, #4f46e5)",
                color: "white",
                padding: "30px",
                borderRadius: "20px",
                marginBottom: "25px",
              }}
            >
              <h2>💡 What Can You Do?</h2>

              <p style={{ lineHeight: "1.7" }}>
                Regular check-ins can help you understand
                how your mood, stress, sleep and academic
                workload change together.
              </p>

              {patternChanged && (
                <p style={{ lineHeight: "1.7" }}>
                  Consider taking a short break, reviewing
                  your workload, maintaining a healthy
                  routine, or talking to someone you trust.
                </p>
              )}

              <Link to="/counsellor-connect">
                <button
                  style={{
                    marginTop: "10px",
                    padding: "13px 20px",
                    background: "white",
                    color: "#4338ca",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  🧑‍⚕️ Connect with Counsellor
                </button>
              </Link>
            </div>
          </>
        )}


        {/* How It Works */}
        <div
          style={{
            background: "white",
            padding: "28px",
            borderRadius: "20px",
            boxShadow:
              "0 6px 20px rgba(0,0,0,0.07)",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ color: "#312e81" }}>
            🔬 How the Digital Twin Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
            }}
          >
            <div>
              <h3>1️⃣ Collect</h3>
              <p style={{ color: "#6b7280" }}>
                Collect wellbeing information through
                regular check-ins.
              </p>
            </div>

            <div>
              <h3>2️⃣ Compare</h3>
              <p style={{ color: "#6b7280" }}>
                Compare recent values with the student's
                personal baseline.
              </p>
            </div>

            <div>
              <h3>3️⃣ Detect</h3>
              <p style={{ color: "#6b7280" }}>
                Identify meaningful changes in mood,
                stress, sleep and workload.
              </p>
            </div>

            <div>
              <h3>4️⃣ Support</h3>
              <p style={{ color: "#6b7280" }}>
                Provide helpful insights and encourage
                appropriate support when needed.
              </p>
            </div>
          </div>
        </div>


        {/* Disclaimer */}
        <div
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "13px",
            padding: "15px",
          }}
        >
          🔐 This system identifies wellbeing patterns
          and does not diagnose mental health conditions.
        </div>

      </div>
    </div>
  );
}

export default PatternAnalysis;