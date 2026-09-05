import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

function AcademicWorkload() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    task: "",
    hours: "",
    deadline: "",
  });

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("academicWorkload")) || [];
    setTasks(savedTasks);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.task || !formData.hours) {
      alert("Please fill subject, task and study hours.");
      return;
    }

    const newTask = {
      id: Date.now(),
      subject: formData.subject,
      task: formData.task,
      hours: Number(formData.hours),
      deadline: formData.deadline,
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    localStorage.setItem("academicWorkload", JSON.stringify(updatedTasks));

    setFormData({
      subject: "",
      task: "",
      hours: "",
      deadline: "",
    });
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
    localStorage.setItem("academicWorkload", JSON.stringify(updatedTasks));
  };

  const totalHours = tasks.reduce((sum, task) => sum + Number(task.hours), 0);

  const subjectCount = new Set(tasks.map((task) => task.subject)).size;

  return (
    <DashboardLayout>
      <div className="workload-page">

        <div className="workload-header">
          <div>
            <p className="eyebrow">ACADEMIC PLANNER</p>
            <h1>Academic Workload 📚</h1>
            <p>
              Organize your study tasks and keep your workload balanced.
            </p>
          </div>

          <Link to="/exams" className="btn btn-secondary">
            📅 Exam Calendar
          </Link>
        </div>

        <div className="workload-summary">

          <div className="workload-summary-card mint">
            <span className="workload-summary-icon">📚</span>
            <div>
              <span>Total Tasks</span>
              <strong>{tasks.length}</strong>
            </div>
          </div>

          <div className="workload-summary-card blue">
            <span className="workload-summary-icon">⏱️</span>
            <div>
              <span>Total Study Hours</span>
              <strong>{totalHours} hrs</strong>
            </div>
          </div>

          <div className="workload-summary-card purple">
            <span className="workload-summary-icon">📖</span>
            <div>
              <span>Subjects</span>
              <strong>{subjectCount}</strong>
            </div>
          </div>

        </div>

        <div className="workload-layout">

          <div className="card workload-form-card">

            <div className="section-header">
              <div>
                <h2>Add Study Task</h2>
                <p>Plan what you need to complete.</p>
              </div>

              <span className="section-icon">✏️</span>
            </div>

            <form onSubmit={addTask} className="workload-form">

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Power Electronics"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Task</label>
                <input
                  type="text"
                  name="task"
                  placeholder="e.g. Complete assignment"
                  value={formData.task}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Study Hours</label>
                  <input
                    type="number"
                    name="hours"
                    min="0.5"
                    step="0.5"
                    placeholder="2"
                    value={formData.hours}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <button type="submit" className="btn btn-primary workload-add-btn">
                + Add Task
              </button>

            </form>
          </div>

          <div className="card workload-list-card">

            <div className="section-header">
              <div>
                <h2>Your Study Plan</h2>
                <p>{tasks.length} task(s) planned</p>
              </div>

              <span className="section-icon">🌱</span>
            </div>

            {tasks.length === 0 ? (
              <div className="workload-empty">
                <div className="workload-empty-icon">📝</div>
                <h3>No study tasks yet</h3>
                <p>
                  Add your subjects and study tasks to build your academic plan.
                </p>
              </div>
            ) : (
              <div className="workload-list">

                {tasks.map((task) => (
                  <div className="workload-item" key={task.id}>

                    <div className="workload-item-icon">
                      📘
                    </div>

                    <div className="workload-item-content">
                      <div className="workload-item-top">
                        <span className="workload-subject">
                          {task.subject}
                        </span>

                        <button
                          className="workload-delete"
                          onClick={() => deleteTask(task.id)}
                          title="Delete task"
                        >
                          🗑️
                        </button>
                      </div>

                      <h3>{task.task}</h3>

                      <div className="workload-item-details">

                        <span>
                          ⏱️ {task.hours} hour
                          {task.hours !== 1 ? "s" : ""}
                        </span>

                        {task.deadline && (
                          <span>
                            📅 {task.deadline}
                          </span>
                        )}

                      </div>
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        <div className="card workload-tip">
          <div className="workload-tip-icon">💡</div>

          <div>
            <strong>Healthy study tip</strong>
            <p>
              Break large tasks into smaller sessions and take short breaks
              between study periods. A balanced workload can help you stay
              productive without feeling overwhelmed.
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

export default AcademicWorkload;