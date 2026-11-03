 import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/landing.css";
import Login from "./Login";
import Signup from "./Signup";


const features = [
  {
    number: "01",
    icon: "bi-kanban",
    title: "Project Management",
    description:
      "Organize projects, define priorities, and keep every team member aligned with shared goals.",
  },
  {
    number: "02",
    icon: "bi-check2-square",
    title: "Task Tracking",
    description:
      "Create tasks, assign ownership, set due dates, and track progress from one workspace.",
  },
  {
    number: "03",
    icon: "bi-people",
    title: "Team Collaboration",
    description:
      "Bring your team together with shared projects, clear responsibilities, and centralized updates.",
  },
  {
    number: "04",
    icon: "bi-graph-up-arrow",
    title: "Reports & Insights",
    description:
      "Understand project progress and task distribution through visual reports and analytics.",
  },
  {
    number: "05",
    icon: "bi-funnel",
    title: "Smart Organization",
    description:
      "Use tags, search, filters, and due dates to find and organize work efficiently.",
  },
  {
    number: "06",
    icon: "bi-shield-lock",
    title: "Secure Workspace",
    description:
      "Access protected areas with authentication and role-aware application routes.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Create a workspace",
    description:
      "Start by creating projects and bringing the relevant people into your workspace.",
  },
  {
    number: "02",
    title: "Break work into tasks",
    description:
      "Turn project goals into manageable tasks with owners, priorities, and due dates.",
  },
  {
    number: "03",
    title: "Collaborate and track",
    description:
      "Keep track of task progress and coordinate work with your team.",
  },
  {
    number: "04",
    title: "Review performance",
    description:
      "Use reports and visual insights to understand how work is progressing.",
  },
];

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "JavaScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "MongoDB", category: "Database" },
  { name: "Mongoose", category: "ODM" },
  { name: "JWT", category: "Authentication" },
  { name: "Chart.js", category: "Visualization" },
  { name: "Bootstrap", category: "UI Framework" },
];

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const authMode =
    location.pathname === "/login"
      ? "login"
      : location.pathname === "/signup"
        ? "signup"
        : null;

  const closeAuth = () => navigate("/", { replace: true });

  const openAuth = (mode) => navigate(`/${mode}`);

  useEffect(() => {
  if (!authMode) return;

  const handleEscape = (event) => {
    if (event.key === "Escape") {
      navigate("/", { replace: true });
    }
  };

  document.addEventListener("keydown", handleEscape);
  document.body.style.overflow = "hidden";

  return () => {
    document.removeEventListener("keydown", handleEscape);
    document.body.style.overflow = "";
  };
}, [authMode, navigate]);

  return (
    <main className="landing-page">
      {/* Navigation */}
      <nav className="landing-navbar">
        <div className="landing-container navbar-inner">
          <Link to="/" className="landing-brand">
            <span className="brand-icon">
              <i className="bi bi-layers-fill"></i>
            </span>
            <span>Workasana<span className="brand-period">.</span></span>
          </Link>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#workflow">How it works</a>
            <a href="#technology">Technology</a>
          </div>

          <div className="nav-actions">
            <button
              className="nav-login"
              onClick={() => openAuth("login")}
            >
              Log in
            </button>
            <button
              className="btn-primary-custom nav-signup"
              onClick={() => openAuth("signup")}
            >
              Get started <i className="bi bi-arrow-up-right"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section">
        <div className="landing-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot"></span>
              YOUR WORK, IN ONE PLACE
            </div>

            <h1>
              Great work starts with
              <span> better organization.</span>
            </h1>

            <p className="hero-description">
              Workasana is a project and task management workspace that helps
              teams organize projects, manage responsibilities, collaborate,
              and understand progress without losing sight of what matters.
            </p>

            <div className="hero-actions">
              <button
                className="btn-primary-custom"
                onClick={() => openAuth("signup")}
              >
                Explore your workspace
                <i className="bi bi-arrow-right"></i>
              </button>

              <a href="#features" className="btn-light-custom">
                Discover features
                <i className="bi bi-play-circle"></i>
              </a>
            </div>

            <div className="hero-note">
              <i className="bi bi-check-circle-fill"></i>
              A unified workspace for projects, tasks, and teams.
            </div>
          </div>

          {/* Illustrative dashboard preview */}
          <div className="hero-visual">
            <div className="preview-glow"></div>

            <div className="dashboard-preview">
              <div className="preview-topbar">
                <div className="preview-brand">
                  <span className="preview-brand-icon">
                    <i className="bi bi-layers-fill"></i>
                  </span>
                  <strong>Workasana</strong>
                </div>

                <div className="preview-top-actions">
                  <i className="bi bi-search"></i>
                  <i className="bi bi-bell"></i>
                  <span className="preview-avatar">S</span>
                </div>
              </div>

              <div className="preview-layout">
                <aside className="preview-sidebar">
                  <span className="preview-sidebar-label">WORKSPACE</span>
                  <div className="sidebar-active">
                    <i className="bi bi-grid"></i> Overview
                  </div>
                  <div>
                    <i className="bi bi-kanban"></i> Projects
                  </div>
                  <div>
                    <i className="bi bi-check2-square"></i> My Tasks
                  </div>
                  <div>
                    <i className="bi bi-people"></i> Teams
                  </div>
                  <div>
                    <i className="bi bi-bar-chart"></i> Reports
                  </div>

                  <span className="preview-sidebar-label preview-sidebar-bottom">
                    PREFERENCES
                  </span>
                  <div>
                    <i className="bi bi-gear"></i> Settings
                  </div>
                </aside>

                <div className="preview-content">
                  <div className="preview-heading">
                    <div>
                      <span className="preview-muted">MONDAY, WORKSPACE</span>
                      <h3>Good morning!</h3>
                      <p>Here is an overview of your work.</p>
                    </div>
                    <span className="preview-date">My workspace</span>
                  </div>

                  <div className="preview-stats">
                    <div className="stat-card">
                      <span>Total projects</span>
                      <strong>08</strong>
                      <small><i className="bi bi-kanban"></i> Your workspace</small>
                    </div>
                    <div className="stat-card">
                      <span>Active tasks</span>
                      <strong>24</strong>
                      <small><i className="bi bi-activity"></i> In progress</small>
                    </div>
                  </div>

                  <div className="preview-task-heading">
                    <strong>Recent tasks</strong>
                    <span>View all <i className="bi bi-arrow-right"></i></span>
                  </div>

                  <div className="preview-task">
                    <span className="task-check">
                      <i className="bi bi-check2"></i>
                    </span>
                    <div className="task-info">
                      <strong>Design system updates</strong>
                      <small>Website redesign</small>
                    </div>
                    <span className="status-progress">In progress</span>
                  </div>

                  <div className="preview-task">
                    <span className="task-check">
                      <i className="bi bi-check2"></i>
                    </span>
                    <div className="task-info">
                      <strong>Review project requirements</strong>
                      <small>Product development</small>
                    </div>
                    <span className="status-review">Review</span>
                  </div>

                  <div className="preview-task">
                    <span className="task-check task-checked">
                      <i className="bi bi-check2"></i>
                    </span>
                    <div className="task-info">
                      <strong>Prepare weekly report</strong>
                      <small>Team operations</small>
                    </div>
                    <span className="status-done">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-label floating-label-top">
              <span className="label-icon purple">
                <i className="bi bi-check2-circle"></i>
              </span>
              <span><strong>Stay organized</strong><small>Keep work moving</small></span>
            </div>

            <div className="floating-label floating-label-bottom">
              <span className="label-icon green">
                <i className="bi bi-people"></i>
              </span>
              <span><strong>Team collaboration</strong><small>Work together</small></span>
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="value-strip">
        <div className="landing-container value-strip-inner">
          <div>
            <i className="bi bi-kanban"></i>
            <span>Organize projects</span>
          </div>
          <div>
            <i className="bi bi-list-check"></i>
            <span>Track tasks</span>
          </div>
          <div>
            <i className="bi bi-people"></i>
            <span>Collaborate as a team</span>
          </div>
          <div>
            <i className="bi bi-bar-chart-line"></i>
            <span>Measure progress</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section features-section" id="features">
        <div className="landing-container">
          <div className="section-heading">
            <span className="section-kicker">BUILT FOR PRODUCTIVE TEAMS</span>
            <h2>
              Everything your work needs.
              <span> Nothing in the way.</span>
            </h2>
            <p>
              From planning to execution, Workasana brings essential
              project-management capabilities into one organized workspace.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.number}>
                <div className="feature-card-top">
                  <span className="feature-icon">
                    <i className={`bi ${feature.icon}`}></i>
                  </span>
                  <span className="feature-number">{feature.number}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-arrow">
                  <i className="bi bi-arrow-up-right"></i>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="workflow-section" id="workflow">
        <div className="landing-container workflow-grid">
          <div className="workflow-intro">
            <span className="section-kicker">A CLEARER WAY TO WORK</span>
            <h2>
              From scattered work
              <span> to shared progress.</span>
            </h2>
            <p>
              A simple workflow helps teams turn ideas into organized,
              trackable work.
            </p>
            <button
              className="btn-primary-custom"
              onClick={() => openAuth("signup")}
            >
              Start organizing
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>

          <div className="workflow-list">
            {workflow.map((item) => (
              <div className="workflow-item" key={item.number}>
                <span className="workflow-number">{item.number}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="landing-section insights-section">
        <div className="landing-container insights-grid">
          <div className="insights-copy">
            <span className="section-kicker">VISIBILITY THAT MATTERS</span>
            <h2>
              Understand progress.
              <span> Make better decisions.</span>
            </h2>
            <p>
              Project reports and visual analytics help make work easier to
              understand. Review task distribution, completion, and project
              progress from a central place.
            </p>

            <ul className="insights-list">
              <li><i className="bi bi-check-circle-fill"></i> Visual task reports</li>
              <li><i className="bi bi-check-circle-fill"></i> Project progress overview</li>
              <li><i className="bi bi-check-circle-fill"></i> Better work visibility</li>
            </ul>
          </div>

          <div className="insights-visual">
            <div className="insight-card">
              <div className="insight-card-heading">
                <div>
                  <span>WORKSPACE OVERVIEW</span>
                  <h3>Task progress</h3>
                </div>
                <i className="bi bi-three-dots"></i>
              </div>

              <div className="insight-total">
                <strong>Project insights</strong>
                <span>Illustrative preview</span>
              </div>

              <div className="chart-bars">
                {[42, 68, 52, 86, 62, 94, 72].map((height, index) => (
                  <div className="chart-column" key={index}>
                    <div
                      className="chart-bar"
                      style={{ height: `${height}%` }}
                    ></div>
                    <small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small>
                  </div>
                ))}
              </div>

              <div className="insight-legend">
                <span><i className="purple-dot"></i> Progress overview</span>
                <span>Sample visualization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="technology-section" id="technology">
        <div className="landing-container">
          <div className="technology-heading">
            <span className="section-kicker">UNDER THE HOOD</span>
            <h2>
              Built with technologies
              <span> made for modern web apps.</span>
            </h2>
            <p>
              A full-stack application built around a component-based frontend,
              REST APIs, persistent data, and secure authentication.
            </p>
          </div>

          <div className="technology-grid">
            {technologies.map((tech) => (
              <div className="technology-card" key={tech.name}>
                <strong>{tech.name}</strong>
                <span>{tech.category}</span>
              </div>
            ))}
          </div>

          <div className="engineering-note">
            <i className="bi bi-code-slash"></i>
            <span>
              Designed as a practical full-stack project with frontend,
              backend, database, and authentication working together.
            </span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="landing-container final-cta">
          <div>
            <span className="cta-kicker">MAKE ROOM FOR BETTER WORK</span>
            <h2>
              Bring your projects,
              <span> tasks, and team together.</span>
            </h2>
            <p>
              Create a more organized way to manage the work that moves your
              team forward.
            </p>
          </div>

          <button
            className="btn-cta-light"
            onClick={() => openAuth("signup")}
          >
            Get started <i className="bi bi-arrow-up-right"></i>
          </button>
        </div>
      </section>

      {/* Footer */}
      
 <footer className="landing-footer">
  <div className="landing-container footer-inner">
    <Link to="/" className="landing-brand footer-brand">
      <span className="brand-icon">
        <i className="bi bi-layers-fill"></i>
      </span>
      <span>
        Workasana<span className="brand-period">.</span>
      </span>
    </Link>

    <p>Bring clarity to the way your team works.</p>

    <div className="footer-links">
      <a href="#features">Features</a>
      <a href="#workflow">Workflow</a>
      <a href="#technology">Technology</a>
      <button onClick={() => openAuth("login")}>Login</button>
    </div>

    <div className="footer-bottom">
      <span className="footer-copyright">
        © {new Date().getFullYear()} Workasana. All rights reserved.
      </span>

      <p className="footer-credit">
        Designed & Built by{" "}
        <a
          href="https://www.linkedin.com/in/sunny-raj-885588313/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sunny Raj <i className="bi bi-linkedin"></i>
        </a>
      </p>
    </div>
  </div>
</footer>
      {/* Stage 1 authentication popup placeholder */}
      
      {/* Actual Authentication Popup */}
{authMode && (
  <div
    className="auth-modal-overlay"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        closeAuth();
      }
    }}
  >
    <div
      className="auth-modal-card"
      role="dialog"
      aria-modal="true"
      aria-label={authMode === "login" ? "Login" : "Sign up"}
    >
      <button
        className="auth-modal-close"
        onClick={closeAuth}
        aria-label="Close popup"
      >
        <i className="bi bi-x-lg"></i>
      </button>

      {authMode === "login" ? (
        <Login isModal />
      ) : (
        <Signup isModal />
      )}
    </div>
  </div>
)}
    </main>
  );
}

export default LandingPage;