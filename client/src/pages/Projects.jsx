 
// import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import ProjectCard from "../components/ProjectCard";
// import CreateProjectModal from "../components/CreateProjectModal";
// import TaskSearch from "../components/TaskSearch";
// import { useApp } from "../context/AppContext";
// import api from "../services/api";
// import toast from "react-hot-toast";

// const Projects = () => {
//   const { state, dispatch } = useApp();

//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     fetchProjects();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       dispatch({
//         type: "SET_LOADING",
//         payload: true,
//       });

//       const { data } = await api.get("/projects");

//       dispatch({
//         type: "SET_PROJECTS",
//         payload: data,
//       });
//     } catch (error) {
//       toast.error("Failed to load projects");
//       console.log("message:", error);
//     } finally {
//       dispatch({
//         type: "SET_LOADING",
//         payload: false,
//       });
//     }
//   };

//   /*
//    * Search projects by:
//    * 1. Project name
//    * 2. Project description
//    */
//   const filteredProjects = state.projects.filter((project) => {
//     const searchValue = search.toLowerCase().trim();

//     if (!searchValue) {
//       return true;
//     }

//     return (
//       project.name
//         ?.toLowerCase()
//         .includes(searchValue) ||
//       project.description
//         ?.toLowerCase()
//         .includes(searchValue)
//     );
//   });

//   return (
//     <Layout title="Projects">

//       {/* Header */}
//       <div className="content-card mb-4">
//         <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

//           <div>
//             <h4 className="fw-bold mb-1">
//               All Projects
//             </h4>

//             <p className="text-muted mb-0">
//               Manage and track your projects
//             </p>
//           </div>

//           <div className="d-flex align-items-center gap-3 flex-wrap">

//             {/* Search */}
//             <TaskSearch
//               value={search}
//               onChange={setSearch}
//             />

//             {/* Create Project */}
//             <button
//               className="btn btn-primary rounded-pill px-4"
//               onClick={() => setShowModal(true)}
//             >
//               <i className="bi bi-plus-lg me-2"></i>
//               New Project
//             </button>

//           </div>

//         </div>
//       </div>

//       {/* Projects */}
//       {state.loading ? (
//         <div className="content-card text-center py-5">

//           <div className="spinner-border text-primary mb-3"></div>

//           <div className="text-muted">
//             Loading projects...
//           </div>

//         </div>
//       ) : filteredProjects.length === 0 ? (
//         <div className="content-card text-center py-5">

//           <i className="bi bi-folder-x display-4 text-muted"></i>

//           <h5 className="mt-3 fw-bold">
//             {search
//               ? "No projects found"
//               : "No projects found"}
//           </h5>

//           <p className="text-muted">
//             {search
//               ? "Try searching with a different project name."
//               : "Create your first project to get started."}
//           </p>

//           {search ? (
//             <button
//               className="btn btn-outline-secondary rounded-pill px-4"
//               onClick={() => setSearch("")}
//             >
//               Clear Search
//             </button>
//           ) : (
//             <button
//               className="btn btn-primary rounded-pill px-4"
//               onClick={() => setShowModal(true)}
//             >
//               Create Project
//             </button>
//           )}

//         </div>
//       ) : (
//         <>
//           {/* Result Count */}
//           <div className="d-flex justify-content-between align-items-center mb-3">
//             <h5 className="fw-bold mb-0">
//               Projects
//             </h5>

//             <span className="text-muted small">
//               {filteredProjects.length}{" "}
//               {filteredProjects.length === 1
//                 ? "project"
//                 : "projects"}
//             </span>
//           </div>

//           {/* Project Cards */}
//           <div className="row g-4">
//             {filteredProjects.map((project) => (
//               <div
//                 key={project._id}
//                 className="col-12 col-md-6 col-xl-4"
//               >
//                 <ProjectCard project={project} />
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Create Project Modal */}
//       <CreateProjectModal
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//       />

//     </Layout>
//   );
// };

// export default Projects;
// ----------------------------------------------------

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import CreateProjectModal from "../components/CreateProjectModal";
import TaskSearch from "../components/TaskSearch";
import { useApp } from "../context/AppContext";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/projects.css";

const Projects = () => {
  const { state, dispatch } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

 
  const fetchProjects = async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });

      const { data } = await api.get("/projects");

      dispatch({
        type: "SET_PROJECTS",
        payload: data,
      });
    } catch (error) {
      toast.error("Failed to load projects");
      console.error("Failed to fetch projects:", error);
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
    }
  };
   useEffect(() => {
    fetchProjects();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const searchValue = search.toLowerCase().trim();

  const filteredProjects = state.projects.filter((project) => {
    if (!searchValue) return true;

    return (
      project.name?.toLowerCase().includes(searchValue) ||
      project.description?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <Layout
      title="Projects"
      subtitle="Organize your work and keep every project on track"
    >
      <div className="projects-page">

        {/* Page heading */}
        <section className="projects-welcome mb-4">
          <div className="projects-welcome-content">
            <div className="projects-eyebrow">
              <i className="bi bi-grid-fill me-2"></i>
              WORKSPACE
            </div>

            <h2>All Projects</h2>

            <p>
              Bring your team's work together and stay on top of every
              milestone.
            </p>
          </div>

          <div className="projects-heading-icon">
            <i className="bi bi-kanban"></i>
          </div>
        </section>

        {/* Project overview */}
        <section className="projects-overview mb-4">
          <div className="projects-overview-item">
            <div className="projects-overview-icon">
              <i className="bi bi-folder2-open"></i>
            </div>

            <div>
              <div className="projects-overview-label">
                Total Projects
              </div>

              <div className="projects-overview-value">
                {state.projects.length}
              </div>
            </div>
          </div>

          <div className="projects-overview-divider"></div>

          <div className="projects-overview-item">
            <div className="projects-overview-icon projects-overview-icon-purple">
              <i className="bi bi-search"></i>
            </div>

            <div>
              <div className="projects-overview-label">
                Search Results
              </div>

              <div className="projects-overview-value">
                {filteredProjects.length}
              </div>
            </div>
          </div>
        </section>

        {/* Search and create toolbar */}
        <section className="projects-toolbar mb-4">
          <div>
            <h5>Project workspace</h5>
            <p>Find and manage your projects in one place.</p>
          </div>

          <div className="projects-toolbar-actions">
            <div className="projects-search">
              <TaskSearch
                value={search}
                onChange={setSearch}
              />
            </div>

            <button
              type="button"
              className="projects-create-btn"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg"></i>
              <span>New Project</span>
            </button>
          </div>
        </section>

        {/* Project listing */}
        {state.loading ? (
          <div className="projects-state-card">
            <div className="spinner-border text-primary mb-3"></div>

            <h5>Loading projects</h5>

            <p>Please wait while we organize your workspace.</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="projects-state-card">
            <div className="projects-empty-icon">
              <i className="bi bi-folder-x"></i>
            </div>

            <h5>
              {search ? "No matching projects" : "Your workspace is empty"}
            </h5>

            <p>
              {search
                ? "Try a different project name or description."
                : "Create your first project and start organizing your work."}
            </p>

            {search ? (
              <button
                type="button"
                className="projects-secondary-btn"
                onClick={() => setSearch("")}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Clear Search
              </button>
            ) : (
              <button
                type="button"
                className="projects-create-btn"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-lg"></i>
                Create Project
              </button>
            )}
          </div>
        ) : (
          <section className="projects-list-section">
            <div className="projects-list-heading">
              <div>
                <h5>Your Projects</h5>
                <p>Everything your team is currently working on.</p>
              </div>

              <span className="projects-count">
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "Project" : "Projects"}
              </span>
            </div>

            <div className="row g-4">
              {filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="col-12 col-md-6 col-xl-4"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Create project modal */}
      <CreateProjectModal
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </Layout>
  );
};

export default Projects;
