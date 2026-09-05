import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function ExamCalendar() {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("exams") || "[]");
    setExams(saved);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddExam = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.date) {
      alert("Please enter the subject and exam date.");
      return;
    }

    const newExam = {
      id: Date.now(),
      subject: formData.subject,
      date: formData.date,
      time: formData.time,
    };

    const updatedExams = [...exams, newExam].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setExams(updatedExams);
    localStorage.setItem("exams", JSON.stringify(updatedExams));

    setFormData({
      subject: "",
      date: "",
      time: "",
    });
  };

  const handleDelete = (id) => {
    const updatedExams = exams.filter((exam) => exam.id !== id);

    setExams(updatedExams);
    localStorage.setItem("exams", JSON.stringify(updatedExams));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysLeft = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const examDate = new Date(date);
    examDate.setHours(0, 0, 0, 0);

    const difference = examDate - today;
    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };

  return (
    <DashboardLayout>
      <div className="exam-page">

        {/* Header */}
        <div className="exam-header">
          <div>
            <div className="eyebrow">ACADEMIC PLANNING</div>
            <h1>Exam Calendar 📅</h1>
            <p>
              Keep track of your upcoming exams and plan your preparation.
            </p>
          </div>

          <Link to="/workload" className="btn btn-secondary">
            View Workload
          </Link>
        </div>

        {/* Add exam */}
        <div className="card exam-add-card">
          <div className="exam-add-heading">
            <div className="exam-icon mint">📝</div>
            <div>
              <h2>Add an exam</h2>
              <p>Add your upcoming exam to your personal calendar.</p>
            </div>
          </div>

          <form className="exam-form" onSubmit={handleAddExam}>
            <div className="exam-field">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Power Electronics"
              />
            </div>

            <div className="exam-field">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="exam-field">
              <label>Time <span>(optional)</span></label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary exam-add-button">
              + Add Exam
            </button>
          </form>
        </div>

        {/* Exam list */}
        <div className="exam-section-header">
          <div>
            <h2>Upcoming exams</h2>
            <p>Your exam schedule at a glance.</p>
          </div>

          <span className="exam-count">
            {exams.length} {exams.length === 1 ? "exam" : "exams"}
          </span>
        </div>

        {exams.length === 0 ? (
          <div className="card exam-empty">
            <div className="exam-empty-icon">📚</div>
            <h2>No exams added yet</h2>
            <p>
              Add your upcoming exams above to keep your academic schedule
              organized.
            </p>
          </div>
        ) : (
          <div className="exam-list">
            {exams.map((exam) => {
              const daysLeft = getDaysLeft(exam.date);

              return (
                <div className="card exam-item" key={exam.id}>

                  <div className="exam-date-box">
                    <span>
                      {new Date(exam.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                      })}
                    </span>

                    <small>
                      {new Date(exam.date).toLocaleDateString("en-IN", {
                        month: "short",
                      })}
                    </small>
                  </div>

                  <div className="exam-info">
                    <h3>{exam.subject}</h3>

                    <p>
                      📅 {formatDate(exam.date)}
                      {exam.time && `  •  ⏰ ${exam.time}`}
                    </p>
                  </div>

                  <div className="exam-actions">

                    <span
                      className={`days-badge ${
                        daysLeft <= 3
                          ? "days-badge-urgent"
                          : daysLeft <= 7
                          ? "days-badge-soon"
                          : ""
                      }`}
                    >
                      {daysLeft < 0
                        ? "Completed"
                        : daysLeft === 0
                        ? "Today"
                        : daysLeft === 1
                        ? "1 day left"
                        : `${daysLeft} days left`}
                    </span>

                    <button
                      className="exam-delete"
                      onClick={() => handleDelete(exam.id)}
                      title="Delete exam"
                    >
                      ×
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Helpful note */}
        <div className="card exam-note">
          <div className="exam-note-icon">💡</div>
          <div>
            <h3>Plan ahead</h3>
            <p>
              Your exam dates can help the Digital Twin understand your
              academic workload and provide more useful wellbeing insights.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default ExamCalendar;