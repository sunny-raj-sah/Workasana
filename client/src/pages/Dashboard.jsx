import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
import TaskSearch from "../components/TaskSearch";
import "../styles/dashboard.css";

const quickLinks = [
  {
    title: "Projects",
    description: "View and organize projects",
    to: "/projects",
    icon: "bi-folder2-open",
    className: "dashboard-quick-purple",
  },
  {
    title: "Teams",
    description: "Manage your collaborators",
    to: "/teams",
    icon: "bi-people",
    className: "dashboard-quick-blue",
  },
  {
    title: "Reports",
    description: "Track workspace performance",
    to: "/reports",
    icon: "bi-bar-chart-line",
    className: "dashboard-quick-green",
  },
  {
    title: "Settings",
    description: "Manage your account",
    to: "/settings",
    icon: "bi-gear",
    className: "dashboard-quick-orange",
  },
];

const statusOptions = [
  { label: "All tasks", value: "" },
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
  { label: "Blocked", value: "Blocked" },
];

const normalizeStatus = (status) => {
  if (status === "Todo") return "To Do";
  return status || "To Do";
};

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("In Progress");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch dashboard data when the page mounts.
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [projectsRes, tasksRes] = await Promise.all([
          api.get("/projects"),
          api.get("/tasks"),
        ]);

        setProjects(
          Array.isArray(projectsRes.data) ? projectsRes.data : []
        );

        setTasks(Array.isArray(tasksRes.data) ? tasksRes.data : []);
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // Calculate summary statistics.
  const stats = useMemo(() => {
    const completed = tasks.filter(
      (task) => normalizeStatus(task.status) === "Completed"
    ).length;

    const inProgress = tasks.filter(
      (task) => normalizeStatus(task.status) === "In Progress"
    ).length;

    const todo = tasks.filter(
      (task) => normalizeStatus(task.status) === "To Do"
    ).length;

    const blocked = tasks.filter(
      (task) => normalizeStatus(task.status) === "Blocked"
    ).length;

    return {
      completed,
      inProgress,
      todo,
      blocked,
      pending: tasks.length - completed,
      completionRate: tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : 0,
    };
  }, [tasks]);

  // Filter tasks by status and search term.
  const filteredTasks = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return tasks.filter((task) => {
      const taskStatus = normalizeStatus(task.status);

      const matchesStatus = !filter || taskStatus === filter;

      const taskName = (task.title || task.name || "").toLowerCase();
      const projectName = (task.project?.name || "").toLowerCase();
      const teamName = (task.team?.name || "").toLowerCase();

      const matchesSearch =
        !search ||
        taskName.includes(search) ||
        projectName.includes(search) ||
        teamName.includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [tasks, filter, searchTerm]);

  // Show five tasks by default, but show all matching results during search.
  const displayedTasks = searchTerm.trim()
    ? filteredTasks
    : filteredTasks.slice(0, 5);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "dashboard-priority-high";
      case "Medium":
        return "dashboard-priority-medium";
      case "Low":
        return "dashboard-priority-low";
      default:
        return "dashboard-priority-default";
    }
  };

  const getStatusClass = (status) => {
    switch (normalizeStatus(status)) {
      case "Completed":
        return "dashboard-status-completed";
      case "In Progress":
        return "dashboard-status-progress";
      case "Blocked":
        return "dashboard-status-blocked";
      default:
        return "dashboard-status-todo";
    }
  };

  const getStatusIcon = (status) => {
    switch (normalizeStatus(status)) {
      case "Completed":
        return "bi-check-circle-fill";
      case "In Progress":
        return "bi-arrow-repeat";
      case "Blocked":
        return "bi-exclamation-circle-fill";
      default:
        return "bi-circle";
    }
  };

  return (
    <Layout
      title="Dashboard"
      subtitle="Your workspace overview, tasks, and team activity"
    >
      <div className="dashboard-page">
        {loading ? (
          <div className="dashboard-state-card">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5>Preparing your workspace</h5>
            <p>We're loading your projects and tasks.</p>
          </div>
        ) : (
          <>
            {/* Welcome banner */}
            <section className="dashboard-welcome mb-4">
              <div className="dashboard-welcome-content">
                <div className="dashboard-welcome-label">
                  <i className="bi bi-stars me-2"></i>
                  YOUR WORKSPACE
                </div>

                <h2>Make every task count.</h2>

                <p>
                  Keep your projects organized, stay on top of your tasks,
                  and move your team's work forward.
                </p>

                <Link to="/projects" className="btn dashboard-primary-btn">
                  Explore projects
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>

              <div className="dashboard-welcome-illustration">
                <div className="dashboard-illustration-main">
                  <i className="bi bi-kanban-fill"></i>
                </div>

                <div className="dashboard-floating-icon dashboard-floating-one">
                  <i className="bi bi-check2-circle"></i>
                </div>

                <div className="dashboard-floating-icon dashboard-floating-two">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>

                <div className="dashboard-floating-icon dashboard-floating-three">
                  <i className="bi bi-stars"></i>
                </div>
              </div>
            </section>

            {/* Summary cards */}
            <section className="dashboard-stats-grid mb-4">
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon dashboard-stat-purple">
                  <i className="bi bi-folder2-open"></i>
                </div>
                <div>
                  <span className="dashboard-stat-label">Total projects</span>
                  <h3>{projects.length}</h3>
                  <p>Projects in your workspace</p>
                </div>
              </div>

              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon dashboard-stat-blue">
                  <i className="bi bi-list-check"></i>
                </div>
                <div>
                  <span className="dashboard-stat-label">Total tasks</span>
                  <h3>{tasks.length}</h3>
                  <p>Tasks across projects</p>
                </div>
              </div>

              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon dashboard-stat-green">
                  <i className="bi bi-check2-circle"></i>
                </div>
                <div>
                  <span className="dashboard-stat-label">Completed</span>
                  <h3>{stats.completed}</h3>
                  <p>Successfully completed</p>
                </div>
              </div>

              <div className="dashboard-stat-card">
                <div className="dashboard-stat-icon dashboard-stat-orange">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div>
                  <span className="dashboard-stat-label">Pending tasks</span>
                  <h3>{stats.pending}</h3>
                  <p>Tasks yet to be completed</p>
                </div>
              </div>
            </section>

            {/* Completion progress */}
            <section className="dashboard-progress-card mb-4">
              <div className="dashboard-section-heading">
                <div>
                  <h5>Overall task progress</h5>
                  <p>See how much work has been completed.</p>
                </div>

                <span className="dashboard-progress-value">
                  {stats.completionRate}%
                </span>
              </div>

              <div
                className="progress dashboard-progress-track"
                role="progressbar"
                aria-label="Overall task completion"
                aria-valuenow={stats.completionRate}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar dashboard-progress-fill"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>

              <div className="dashboard-progress-details">
                <span>
                  <i className="dashboard-progress-dot dashboard-dot-completed"></i>
                  Completed <strong>{stats.completed}</strong>
                </span>
                <span>
                  <i className="dashboard-progress-dot dashboard-dot-progress"></i>
                  In Progress <strong>{stats.inProgress}</strong>
                </span>
                <span>
                  <i className="dashboard-progress-dot dashboard-dot-todo"></i>
                  To Do <strong>{stats.todo}</strong>
                </span>
                <span>
                  <i className="dashboard-progress-dot dashboard-dot-blocked"></i>
                  Blocked <strong>{stats.blocked}</strong>
                </span>
              </div>
            </section>

            {/* Quick links */}
            <section className="dashboard-quick-section mb-4">
              <div className="dashboard-section-heading">
                <div>
                  <h5>Quick links</h5>
                  <p>Jump straight to the areas you use most.</p>
                </div>
              </div>

              <div className="dashboard-quick-grid">
                {quickLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="dashboard-quick-card"
                  >
                    <div className={`dashboard-quick-icon ${item.className}`}>
                      <i className={`bi ${item.icon}`}></i>
                    </div>

                    <div className="dashboard-quick-content">
                      <h6>{item.title}</h6>
                      <p>{item.description}</p>
                    </div>

                    <i className="bi bi-arrow-up-right dashboard-quick-arrow"></i>
                  </Link>
                ))}
              </div>
            </section>

            {/* Task search and recent tasks */}
            <section className="dashboard-tasks-card">
              <div className="dashboard-tasks-header">
                <div>
                  <h5>Recent tasks</h5>
                  <p>
                    {searchTerm.trim()
                      ? `${filteredTasks.length} matching task(s)`
                      : "Stay up to date with your latest work."}
                  </p>
                </div>

                <div className="dashboard-task-filters">
                  <div className="dashboard-search">
                    <TaskSearch
                      value={searchTerm}
                      onChange={setSearchTerm}
                    />
                  </div>

                  <select
                    className="form-select dashboard-status-select"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    aria-label="Filter tasks by status"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {displayedTasks.length === 0 ? (
                <div className="dashboard-empty-state">
                  <div className="dashboard-empty-icon">
                    <i className="bi bi-search"></i>
                  </div>

                  <h6>No tasks found</h6>

                  <p>
                    {searchTerm.trim()
                      ? "Try another search term or change the status filter."
                      : "There are no tasks matching this status yet."}
                  </p>

                  {(searchTerm.trim() || filter) && (
                    <button
                      type="button"
                      className="btn dashboard-clear-btn"
                      onClick={() => {
                        setSearchTerm("");
                        setFilter("");
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="dashboard-task-list">
                  {displayedTasks.map((task) => {
                    const taskTitle = task.title || task.name || "Untitled task";

                    return (
                      <article className="dashboard-task-item" key={task._id}>
                        <div className="dashboard-task-main">
                          <div className="dashboard-task-icon">
                            <i className="bi bi-list-task"></i>
                          </div>

                          <div className="dashboard-task-information">
                            <div className="dashboard-task-title-row">
                              <h6>{taskTitle}</h6>

                              <span
                                className={`dashboard-priority-badge ${getPriorityClass(
                                  task.priority
                                )}`}
                              >
                                {task.priority || "Normal"}
                              </span>
                            </div>

                            <div className="dashboard-task-meta">
                              <span>
                                <i className="bi bi-folder2-open"></i>
                                {task.project?.name || "No project"}
                              </span>

                              <span>
                                <i className="bi bi-people"></i>
                                {task.team?.name || "No team"}
                              </span>

                              <span>
                                <i className="bi bi-calendar-event"></i>
                                {task.dueDate
                                  ? new Date(task.dueDate).toLocaleDateString()
                                  : "No due date"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`dashboard-status-badge ${getStatusClass(
                            task.status
                          )}`}
                        >
                          <i className={`bi ${getStatusIcon(task.status)}`}></i>
                          {normalizeStatus(task.status)}
                        </span>
                      </article>
                    );
                  })}
                </div>
              )}

              {!searchTerm.trim() && filteredTasks.length > 5 && (
                <div className="dashboard-task-footer">
                  <span>
                    Showing 5 of {filteredTasks.length} matching tasks
                  </span>
                  <Link to="/projects">
                    Explore projects
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;