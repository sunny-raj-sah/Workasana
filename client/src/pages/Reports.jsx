// import { useEffect, useMemo, useState } from "react";
// import Layout from "../components/Layout";
// import api from "../services/api";
// import toast from "react-hot-toast";
// import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from "chart.js";

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// );

// const Reports = () => {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const [projectsRes, tasksRes] = await Promise.all([
//         api.get("/projects"),
//         api.get("/tasks"),
//       ]);

//       setProjects(projectsRes.data);
//       setTasks(tasksRes.data);
//     } catch (error) {
//       toast.error("Failed to load reports");
//       console.log("message:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const stats = useMemo(() => {
//     const completed = tasks.filter((t) => t.status === "Completed").length;
//     const inProgress = tasks.filter((t) => t.status === "In Progress").length;
//     const todo = tasks.filter((t) => t.status === "To Do").length;
//     const blocked = tasks.filter((t) => t.status === "Blocked").length;

//     return {
//       completed,
//       inProgress,
//       todo,
//       blocked,
//       completionRate: tasks.length
//         ? Math.round((completed / tasks.length) * 100)
//         : 0,
//     };
//   }, [tasks]);

//   const pieData = {
//     labels: ["Completed", "In Progress", "To Do", "Blocked"],
//     datasets: [
//       {
//         data: [stats.completed, stats.inProgress, stats.todo, stats.blocked],
//         backgroundColor: ["#198754", "#0d6efd", "#6c757d", "#dc3545"],
//         borderWidth: 0,
//       },
//     ],
//   };

//   const tasksByTeam = useMemo(() => {
//     const map = {};

//     tasks.forEach((task) => {
//       const teamName = task.team?.name || "Unknown";
//       map[teamName] = (map[teamName] || 0) + 1;
//     });

//     return map;
//   }, [tasks]);

//   const barData = {
//     labels: Object.keys(tasksByTeam),
//     datasets: [
//       {
//         label: "Tasks",
//         data: Object.values(tasksByTeam),
//         backgroundColor: "#0d6efd",
//         borderRadius: 8,
//       },
//     ],
//   };

//   if (loading) {
//     return (
//       <Layout title="Reports">
//         <div className="content-card text-center py-5">
//           <div className="spinner-border text-primary mb-3"></div>
//           <div className="text-muted">Loading reports...</div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title="Reports"
//     subtitle="Track progress and performance">
//       <div className="row g-4 mb-4">
//         <div className="col-12 col-md-6 col-xl-3">
//           <div className="content-card h-100">
//             <div className="text-muted small mb-2">Projects</div>
//             <h3 className="fw-bold mb-0">{projects.length}</h3>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-xl-3">
//           <div className="content-card h-100">
//             <div className="text-muted small mb-2">Tasks</div>
//             <h3 className="fw-bold mb-0">{tasks.length}</h3>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-xl-3">
//           <div className="content-card h-100">
//             <div className="text-muted small mb-2">Completed</div>
//             <h3 className="fw-bold mb-0 text-success">{stats.completed}</h3>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-xl-3">
//           <div className="content-card h-100">
//             <div className="text-muted small mb-2">Completion Rate</div>
//             <h3 className="fw-bold mb-0 text-primary">
//               {stats.completionRate}%
//             </h3>
//           </div>
//         </div>
//       </div>

//       <div className="row g-4 mb-4">
//         <div className="col-12 col-lg-5">
//           <div className="content-card h-100">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h5 className="fw-bold mb-0">Tasks by Status</h5>
//               <i className="bi bi-pie-chart text-muted"></i>
//             </div>  
//             <div className="d-flex justify-content-center align-items-center p-3">
//               <div style={{ width: "100%", maxWidth: 320 }}>
//                 <Pie data={pieData} />
//               </div>
//             </div>
//           </div>
//         </div>
          
//          <div className="col-12 col-lg-7">
//   <div className="content-card h-100">
//     <div className="d-flex justify-content-between align-items-center mb-3">
//       <h5 className="fw-bold mb-0">Tasks by Team</h5>
//       <i className="bi bi-bar-chart text-muted"></i>
//     </div>
//              {/* FIXED HEIGHT CONTAINER */}
//     <div style={{ height: "320px", position: "relative" }}>
//       <Bar
//         data={barData}
//         options={{
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { display: false },
//           },
//           scales: {
//             y: {
//               beginAtZero: true,
//               ticks: { precision: 0 },
//               grid: { color: "rgba(0,0,0,0.05)" },
//             },
//             x: {
//               grid: { display: false },
//             },
//           },
//         }}
//       />
//     </div>
//   </div>
// </div>
//  </div>
//       <div className="content-card">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5 className="fw-bold mb-0">Recent Activity</h5>
//           <span className="text-muted small">Latest 5 tasks</span>
//         </div>

//         {tasks.length === 0 ? (
//           <div className="text-center py-5">
//             <i className="bi bi-activity display-4 text-muted"></i>
//             <p className="text-muted mt-3 mb-0">No activity available</p>
//           </div>
//         ) : (
//           tasks.slice(0, 5).map((task) => (
//             <div
//               key={task._id}
//               className="d-flex justify-content-between align-items-center py-3 border-bottom"
//             >
//               <div>
//                 <div className="fw-semibold">{task.name}</div>
//                 <div className="text-muted small">
//                   {task.project?.name} • {task.team?.name}
//                 </div>
//               </div>

//               <span
//                 className={`badge ${
//                   task.status === "Completed"
//                     ? "bg-success"
//                     : task.status === "Blocked"
//                       ? "bg-danger"
//                       : task.status === "In Progress"
//                         ? "bg-primary"
//                         : "bg-secondary"
//                 } rounded-pill px-3 py-2`}
//               >
//                 {task.status}
//               </span>
//             </div>
//           ))
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default Reports;
// ----------------------------------------------------------------

import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "../styles/reports.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Reports = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch report data when the page mounts.
  useEffect(() => {
    const loadData = async () => {
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
        toast.error("Failed to load reports");
        console.error("Failed to load reports:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate task statistics.
  const stats = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.status === "Completed"
    ).length;

    const inProgress = tasks.filter(
      (task) => task.status === "In Progress"
    ).length;

    const todo = tasks.filter(
      (task) => task.status === "To Do"
    ).length;

    const blocked = tasks.filter(
      (task) => task.status === "Blocked"
    ).length;

    return {
      completed,
      inProgress,
      todo,
      blocked,
      completionRate: tasks.length
        ? Math.round((completed / tasks.length) * 100)
        : 0,
    };
  }, [tasks]);

  // Prepare pie chart data.
  const pieData = useMemo(
    () => ({
      labels: ["Completed", "In Progress", "To Do", "Blocked"],
      datasets: [
        {
          data: [
            stats.completed,
            stats.inProgress,
            stats.todo,
            stats.blocked,
          ],
          backgroundColor: [
            "#35A879",
            "#635BFF",
            "#A6A3B5",
            "#E36B75",
          ],
          hoverBackgroundColor: [
            "#27845B",
            "#4B43D4",
            "#858397",
            "#CA4D59",
          ],
          borderWidth: 3,
          borderColor: "#fffefa",
          hoverOffset: 7,
        },
      ],
    }),
    [stats]
  );

  // Group tasks by team.
  const tasksByTeam = useMemo(() => {
    const teamMap = {};

    tasks.forEach((task) => {
      const teamName = task.team?.name || "Unknown";
      teamMap[teamName] = (teamMap[teamName] || 0) + 1;
    });

    return teamMap;
  }, [tasks]);

  // Prepare bar chart data.
  const barData = useMemo(
    () => ({
      labels: Object.keys(tasksByTeam),
      datasets: [
        {
          label: "Tasks",
          data: Object.values(tasksByTeam),
          backgroundColor: "#635BFF",
          hoverBackgroundColor: "#4B43D4",
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 48,
        },
      ],
    }),
    [tasksByTeam]
  );

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          color: "#77768B",
          font: {
            size: 11,
            family: "inherit",
          },
        },
      },
      tooltip: {
        backgroundColor: "#151A2D",
        padding: 12,
        cornerRadius: 9,
        titleFont: {
          size: 12,
        },
        bodyFont: {
          size: 12,
        },
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          color: "#9998A6",
          padding: 10,
        },
        grid: {
          color: "rgba(21, 26, 45, 0.06)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: "#858397",
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const recentTasks = tasks.slice(0, 5);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "report-status-completed";
      case "In Progress":
        return "report-status-progress";
      case "Blocked":
        return "report-status-blocked";
      default:
        return "report-status-todo";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
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
      title="Reports"
      subtitle="Track progress and understand your team's performance"
    >
      <div className="reports-page">
        {/* Welcome banner */}
        <section className="reports-welcome mb-4">
          <div className="reports-welcome-content">
            <div className="reports-welcome-label">
              <i className="bi bi-bar-chart-line-fill me-2"></i>
              WORKSPACE INSIGHTS
            </div>

            <h2>See the progress behind your team's work.</h2>

            <p>
              Get a clearer picture of your projects, task completion,
              and team activity — all in one place.
            </p>
          </div>

          <div className="reports-welcome-illustration">
            <div className="reports-illustration-main">
              <i className="bi bi-graph-up-arrow"></i>
            </div>

            <div className="reports-floating-icon reports-floating-one">
              <i className="bi bi-pie-chart-fill"></i>
            </div>

            <div className="reports-floating-icon reports-floating-two">
              <i className="bi bi-check2-circle"></i>
            </div>

            <div className="reports-floating-icon reports-floating-three">
              <i className="bi bi-stars"></i>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="reports-state-card">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5>Preparing your reports</h5>
            <p>We're collecting your latest workspace data.</p>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <section className="reports-stats-grid mb-4">
              <div className="report-stat-card">
                <div className="report-stat-icon report-icon-purple">
                  <i className="bi bi-folder2-open"></i>
                </div>
                <div>
                  <span className="report-stat-label">Total projects</span>
                  <h3>{projects.length}</h3>
                  <p>Projects in workspace</p>
                </div>
              </div>

              <div className="report-stat-card">
                <div className="report-stat-icon report-icon-blue">
                  <i className="bi bi-list-check"></i>
                </div>
                <div>
                  <span className="report-stat-label">Total tasks</span>
                  <h3>{tasks.length}</h3>
                  <p>Tasks across projects</p>
                </div>
              </div>

              <div className="report-stat-card">
                <div className="report-stat-icon report-icon-green">
                  <i className="bi bi-check2-circle"></i>
                </div>
                <div>
                  <span className="report-stat-label">Completed</span>
                  <h3>{stats.completed}</h3>
                  <p>Successfully completed</p>
                </div>
              </div>

              <div className="report-stat-card">
                <div className="report-stat-icon report-icon-orange">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <div>
                  <span className="report-stat-label">Completion rate</span>
                  <h3>{stats.completionRate}%</h3>
                  <p>Overall task completion</p>
                </div>
              </div>
            </section>

            {/* Task progress */}
            <section className="report-progress-card mb-4">
              <div className="report-section-heading">
                <div>
                  <h5>Task progress</h5>
                  <p>A quick overview of your current workload.</p>
                </div>

                <span className="report-progress-percentage">
                  {stats.completionRate}% complete
                </span>
              </div>

              <div
                className="progress report-progress-track"
                role="progressbar"
                aria-label="Task completion rate"
                aria-valuenow={stats.completionRate}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar report-progress-fill"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>

              <div className="report-progress-legend">
                <span>
                  <i className="report-dot report-dot-completed"></i>
                  Completed <strong>{stats.completed}</strong>
                </span>
                <span>
                  <i className="report-dot report-dot-progress"></i>
                  In Progress <strong>{stats.inProgress}</strong>
                </span>
                <span>
                  <i className="report-dot report-dot-todo"></i>
                  To Do <strong>{stats.todo}</strong>
                </span>
                <span>
                  <i className="report-dot report-dot-blocked"></i>
                  Blocked <strong>{stats.blocked}</strong>
                </span>
              </div>
            </section>

            {/* Charts */}
            <section className="row g-4 mb-4">
              <div className="col-12 col-lg-5">
                <div className="report-chart-card h-100">
                  <div className="report-section-heading">
                    <div>
                      <h5>Tasks by status</h5>
                      <p>Distribution of your task statuses.</p>
                    </div>
                    <div className="report-heading-icon">
                      <i className="bi bi-pie-chart-fill"></i>
                    </div>
                  </div>

                  {tasks.length === 0 ? (
                    <div className="report-chart-empty">
                      <i className="bi bi-pie-chart"></i>
                      <p>No task data available yet.</p>
                    </div>
                  ) : (
                    <div className="report-pie-container">
                      <Pie data={pieData} options={chartOptions} />
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12 col-lg-7">
                <div className="report-chart-card h-100">
                  <div className="report-section-heading">
                    <div>
                      <h5>Tasks by team</h5>
                      <p>Compare task distribution across teams.</p>
                    </div>
                    <div className="report-heading-icon">
                      <i className="bi bi-bar-chart-fill"></i>
                    </div>
                  </div>

                  {tasks.length === 0 ? (
                    <div className="report-chart-empty">
                      <i className="bi bi-bar-chart"></i>
                      <p>No task data available yet.</p>
                    </div>
                  ) : (
                    <div className="report-bar-container">
                      <Bar data={barData} options={barOptions} />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Recent activity */}
            <section className="report-activity-card">
              <div className="report-section-heading report-activity-heading">
                <div>
                  <h5>Recent activity</h5>
                  <p>Take a look at the latest tasks in your workspace.</p>
                </div>

                <span className="report-activity-count">
                  Latest {Math.min(tasks.length, 5)} tasks
                </span>
              </div>

              {recentTasks.length === 0 ? (
                <div className="report-activity-empty">
                  <div className="report-activity-empty-icon">
                    <i className="bi bi-activity"></i>
                  </div>
                  <h6>No activity yet</h6>
                  <p>Tasks will appear here once they are added.</p>
                </div>
              ) : (
                <div className="report-activity-list">
                  {recentTasks.map((task) => (
                    <div className="report-activity-item" key={task._id}>
                      <div className="report-activity-task-icon">
                        <i className="bi bi-list-task"></i>
                      </div>

                      <div className="report-activity-task-details">
                        <h6>{task.name || "Untitled task"}</h6>
                        <p>
                          <span>{task.project?.name || "No project"}</span>
                          <span className="report-activity-separator">•</span>
                          <span>{task.team?.name || "No team"}</span>
                        </p>
                      </div>

                      <span
                        className={`report-status-badge ${getStatusClass(
                          task.status
                        )}`}
                      >
                        <i className={`bi ${getStatusIcon(task.status)}`}></i>
                        {task.status || "To Do"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Reports;