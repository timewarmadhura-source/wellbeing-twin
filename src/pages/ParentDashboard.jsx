import { useEffect, useState } from "react";

function ParentDashboard() {
  const [consent, setConsent] = useState(false);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const parentConsent =
      localStorage.getItem("parentConsent") === "true";

    setConsent(parentConsent);

    const checkins =
      JSON.parse(
        localStorage.getItem("wellbeingCheckins")
      ) || [];

    if (checkins.length > 0) {
      setLatest(checkins[checkins.length - 1]);
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>👨‍👩‍👧 Parent Dashboard</h1>

      <p>
        View your student's wellbeing information
        according to their privacy preferences.
      </p>

      <hr />

      {!consent ? (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🔐 Information Restricted</h2>

          <p>
            The student has not given consent to share
            wellbeing information with the parent.
          </p>

          <p>
            Student privacy settings control what
            information can be viewed.
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              marginBottom: "20px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>💚 Wellbeing Overview</h2>

            {latest ? (
              <div>
                <p>
                  <strong>Mood:</strong>{" "}
                  {latest.mood}/5
                </p>

                <p>
                  <strong>Stress:</strong>{" "}
                  {latest.stress}/5
                </p>

                <p>
                  <strong>Sleep:</strong>{" "}
                  {latest.sleep} hours
                </p>

                <p>
                  <strong>Academic Workload:</strong>{" "}
                  {latest.workload}
                </p>

                <p>
                  <strong>Last Check-in:</strong>{" "}
                  {latest.date}
                </p>
              </div>
            ) : (
              <p>
                No wellbeing check-in data available.
              </p>
            )}
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "15px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>🔐 Privacy</h2>

            <p>
              You are viewing only the information
              permitted by the student's consent settings.
            </p>

            <p>
              Private check-in notes and counselling
              information are not displayed here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParentDashboard;