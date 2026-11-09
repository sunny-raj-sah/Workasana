 

import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = ({
  title,
  subtitle,
  children,
  showAddButton = false,
  addButtonText = "+ Add Task",
  onAddClick,
}) => {
  const { state } = useAuth();

  const user = state?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <div className="topbar">
          <div className="topbar-heading"  style={{
    minWidth: 0,
    width: "100%",
  }}>
            <div className="topbar-title  text-center text-md-start">{title}</div>

          <div
  className="text-muted topbar-subtitle mx-auto mx-md-0"
  style={{
    whiteSpace: "nowrap",
    display: "block",
    width: "max-content",
  }}
>
  {subtitle || "Manage your workspace efficiently"}
</div>
          </div>

          <div className="topbar-actions">
            {showAddButton && (
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4"
                onClick={onAddClick}
              >
                {addButtonText}
              </button>
            )}

            <div className="topbar-user">
              <Link
                to="/settings"
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-semibold text-decoration-none"
  style={{
    width: 42,
    height: 42,
    minWidth: 42,
    fontSize: "0.9rem",
  }}
                title="Go to Settings"
                aria-label="Open user settings"
              >
                {initials}
              </Link>

              <Link
                to="/settings"
                className="topbar-user-info"
                title="Go to Settings"
              >
                <div className="topbar-user-name">
                  {user?.name || "Guest User"}
                </div>

                <small className="text-muted">
                  {user?.role || "Workspace Member"}
                </small>
              </Link>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};

export default Layout;
