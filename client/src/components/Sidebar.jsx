// import { NavLink,Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <div className="sidebar-brand">

//         <Link to="/dashboard" className="text-white">
//          <i className="bi bi-kanban-fill me-2"></i>
//         <span>Workasana</span>
//         </Link>
//       </div>

//       <nav className="sidebar-menu">
//         <NavLink to="/dashboard" className="sidebar-link">
//           <i className="bi bi-speedometer2"></i>
//           <span>Dashboard</span>
//         </NavLink>

//         <NavLink to="/projects" className="sidebar-link">
//           <i className="bi bi-folder-fill"></i>
//           <span>Projects</span>
//         </NavLink>

//         <NavLink to="/teams" className="sidebar-link">
//           <i className="bi bi-people-fill"></i>
//           <span>Teams</span>
//         </NavLink>

//         <NavLink to="/reports" className="sidebar-link">
//           <i className="bi bi-bar-chart-fill"></i>
//           <span>Reports</span>
//         </NavLink>

//         <NavLink to="/settings" className="sidebar-link">
//           <i className="bi bi-gear-fill"></i>
//           <span>Settings</span>
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;

// -----------------------------------------------------


import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/sidebar.css";

const navigationItems = [
  { to: "/dashboard", label: "Dashboard", icon: "bi-grid-1x2-fill", end: true },
  { to: "/projects", label: "Projects", icon: "bi-folder2-open" },
  { to: "/teams", label: "Teams", icon: "bi-people" },
  { to: "/reports", label: "Reports", icon: "bi-bar-chart-line" },
  { to: "/settings", label: "Settings", icon: "bi-gear" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        type="button"
        className="sidebar-mobile-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation"
      >
        <i className="bi bi-list"></i>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`sidebar sidebar-modern ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <Link
            to="/dashboard"
            className="sidebar-brand-link"
            onClick={closeSidebar}
          >
            <span className="sidebar-brand-icon">
              <i className="bi bi-layers-fill"></i>
            </span>

            <span className="sidebar-brand-name">
              Workasana<span>.</span>
            </span>
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={closeSidebar}
            aria-label="Close navigation"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <nav className="sidebar-menu">
          <div className="sidebar-section-label">WORKSPACE</div>

          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
              }
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
              <i className="bi bi-chevron-right sidebar-link-arrow"></i>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-icon">
            <i className="bi bi-stars"></i>
          </div>

          <div>
            <div className="sidebar-bottom-title">
              Stay organized.
            </div>
            <div className="sidebar-bottom-text">
              Make teamwork simpler.
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
