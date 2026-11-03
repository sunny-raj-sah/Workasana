// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import api from "../services/api";
// import { useApp } from "../context/AppContext";

// const ProjectCard = ({ project }) => {
//   const { dispatch } = useApp();

//   const handleDelete = async () => {
//     if (!window.confirm("Delete this project?")) return;

//     try {
//       await api.delete(`/projects/${project._id}`);

//       dispatch({ type: "REMOVE_PROJECT", payload: project._id });

//       toast.success("Project deleted");
//     } catch (error) {
//       toast.error("Failed to delete project");
//       console.log("message :",error)
//     }
//   };

//   return (
//     <div className="content-card h-100">
//       <div className="d-flex justify-content-between align-items-start mb-3">
//         <div className="rounded-4 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
//           <i className="bi bi-folder-fill fs-4"></i>
//         </div>

//         <button className="btn btn-light btn-sm rounded-pill" onClick={handleDelete}>
//           <i className="bi bi-trash"></i>
//         </button>
//       </div>

//       <h5 className="fw-bold mb-2">{project.name}</h5>

//       <p className="text-muted small mb-4">
//         {project.description || "No description provided"}
//       </p>

//       <div className="d-flex justify-content-between align-items-center mt-auto">
//         <small className="text-muted">
//           {new Date(project.createdAt).toLocaleDateString()}
//         </small>

//         <Link to={`/projects/${project._id}`} className="btn btn-primary btn-sm rounded-pill px-3">
//           Open
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

// ----------------------------------------------------------------------


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { useApp } from "../context/AppContext";

const ProjectCard = ({ project }) => {
  const { dispatch } = useApp();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      return;
    }

    try {
      await api.delete(`/projects/${project._id}`);

      dispatch({
        type: "REMOVE_PROJECT",
        payload: project._id,
      });

      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error("Failed to delete project");
      console.error("Project deletion error:", error);
    }
  };

  const createdDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date unavailable";

  return (
    <div
      className="card h-100 border-0 rounded-4 overflow-hidden"
      style={{
        backgroundColor: "#FFFEFA",
        boxShadow: "0 5px 24px rgba(21, 26, 45, 0.06)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div className="card-body p-4 d-flex flex-column">
        {/* Project Header */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div
            className="rounded-4 d-flex align-items-center justify-content-center"
            style={{
              width: "52px",
              height: "52px",
              backgroundColor: "#EFEDFF",
              color: "#635BFF",
            }}
          >
            <i className="bi bi-folder2-open fs-3"></i>
          </div>

          <button
            type="button"
            className="btn btn-light border-0 rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "36px",
              height: "36px",
              color: "#9292A0",
              backgroundColor: "#F7F5EF",
            }}
            onClick={handleDelete}
            title="Delete project"
            aria-label={`Delete ${project.name}`}
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>

        {/* Project Information */}
        <div className="mb-4">
          <h5
            className="fw-bold mb-2"
            style={{ color: "#151A2D", letterSpacing: "-0.3px" }}
          >
            {project.name || "Untitled Project"}
          </h5>

          <p
            className="small mb-0"
            style={{
              color: "#777789",
              lineHeight: "1.7",
              minHeight: "48px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description || "No description provided for this project."}
          </p>
        </div>

        {/* Project Footer */}
        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i
              className="bi bi-calendar3"
              style={{ color: "#8B85E8" }}
            ></i>
            <small className="text-muted">{createdDate}</small>
          </div>

          <Link
            to={`/projects/${project._id}`}
            className="btn btn-sm rounded-pill px-3 fw-semibold text-decoration-none"
            style={{
              backgroundColor: "#635BFF",
              color: "#FFFFFF",
              border: "none",
            }}
          >
            Open Project
            <i className="bi bi-arrow-up-right ms-2"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
