//  import Sidebar from "./Sidebar";
// import { useAuth } from "../context/AuthContext";

// const Layout = ({
//   title,
//   subtitle,
//   children,
//   showAddButton = false,
//   addButtonText = "+ Add Task",
//   onAddClick,
// }) => {
//   const { state } = useAuth();

//   const user = state?.user;

//   const initials = user?.name
//     ? user.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase()
//     : "U";

//   return (
//     <div className="app-layout">
//       <Sidebar />

//       <main className="main-content">
//         <div className="topbar">
//           <div>
//             <div className="topbar-title">{title}</div>
//             <div className="text-muted">
//               {subtitle || "Manage your workspace efficiently"}
//             </div>
//           </div>

//           <div className="d-flex align-items-center gap-3">
//             {showAddButton && (
//               <button
//                 className="btn btn-primary rounded-pill px-4"
//                 onClick={onAddClick}
//               >
//                 {addButtonText}
//               </button>
//             )}

//             <div className="d-flex align-items-center gap-2">
//               <div
//                 className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-semibold"
//                 style={{ width: 40, height: 40 }}
//               >
//                 {initials}
//               </div>

//               <div className="d-none d-md-block">
//                 <div className="fw-semibold">{user?.name || "Guest User"}</div>
//                 <small className="text-muted">
//                   {user?.role || "Workspace Member"}
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>

//         {children}
//       </main>
//     </div>
//   );
// };

// export default Layout;

// --------------------------------------------------


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
          <div className="topbar-heading">
            <div className="topbar-title">{title}</div>

            <div className="text-muted topbar-subtitle">
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
