//  import { useEffect, useState } from "react";
// import Layout from "../components/Layout";
// import TeamModal from "../components/TeamModal";
// import api from "../services/api";
// import toast from "react-hot-toast";

// const Teams = () => {
//   const [teams, setTeams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedTeam, setSelectedTeam] = useState(null);

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     loadTeams();
//   }, []);

//   const loadTeams = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/teams");
//       setTeams(data);
//     } catch (error) {
//       toast.error("Failed to load teams");
//       console.log("message:", error)
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaved = (team, isEdit) => {
//     if (isEdit) {
//       setTeams((prev) =>
//         prev.map((t) => (t._id === team._id ? team : t))
//       );
//     } else {
//       setTeams((prev) => [team, ...prev]);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this team?")) return;

//     try {
//       await api.delete(`/teams/${id}`);
//       setTeams((prev) => prev.filter((t) => t._id !== id));
//       toast.success("Team deleted");
//     } catch (error) {
//       toast.error("Failed to delete team");
//       console.log("message:", error)
//     }
//   };

//   return (
//     <Layout title="Teams"
//     subtitle="Create and manage your teams">
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div>
//           <h5 className="fw-bold mb-1">Team Management</h5>
//           <p className="text-muted mb-0">Create and manage your teams</p>
//         </div>

//         <button
//           className="btn btn-primary rounded-pill px-4"
//           onClick={() => {
//             setSelectedTeam(null);
//             setShowModal(true);
//           }}
//         >
//           <i className="bi bi-plus-lg me-2"></i>
//           New Team
//         </button>
//       </div>

//       {loading ? (
//         <div className="content-card text-center py-5">
//           <div className="spinner-border text-primary mb-3"></div>
//           <div className="text-muted">Loading teams...</div>
//         </div>
//       ) : teams.length === 0 ? (
//         <div className="content-card text-center py-5">
//           <i className="bi bi-people display-4 text-muted"></i>
//           <h5 className="mt-3 fw-bold">No teams found</h5>
//           <p className="text-muted">Create your first team to get started.</p>
//           <button
//             className="btn btn-primary rounded-pill px-4"
//             onClick={() => setShowModal(true)}
//           >
//             Create Team
//           </button>
//         </div>
//       ) : (
//         <div className="row g-4">
//           {teams.map((team) => (
//             <div key={team._id} className="col-12 col-md-6 col-xl-4">
//               <div className="content-card h-100">
//                 <div className="d-flex justify-content-between align-items-start mb-3">
//                   <div className="rounded-4 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center" style={{ width: 48, height: 48 }}>
//                     <i className="bi bi-people-fill fs-4"></i>
//                   </div>

//                   <div className="dropdown">
//                     <button className="btn btn-light btn-sm rounded-pill" data-bs-toggle="dropdown">
//                       <i className="bi bi-three-dots"></i>
//                     </button>

//                     <ul className="dropdown-menu dropdown-menu-end">
//                       <li>
//                         <button
//                           className="dropdown-item"
//                           onClick={() => {
//                             setSelectedTeam(team);
//                             setShowModal(true);
//                           }}
//                         >
//                           <i className="bi bi-pencil me-2"></i>
//                           Edit
//                         </button>
//                       </li>

//                       <li><hr className="dropdown-divider" /></li>

//                       <li>
//                         <button
//                           className="dropdown-item text-danger"
//                           onClick={() => handleDelete(team._id)}
//                         >
//                           <i className="bi bi-trash me-2"></i>
//                           Delete
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>

//                 <h5 className="fw-bold mb-2">{team.name}</h5>

//                 <p className="text-muted small mb-4">
//                   {team.description || "No description provided"}
//                 </p>

//                 <div className="d-flex justify-content-between align-items-center mt-auto">
//                   <small className="text-muted">Team</small>
//                   <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">
//                     Active
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <TeamModal
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         team={selectedTeam}
//         onSaved={handleSaved}
//       />
//     </Layout>
//   );
// };

// export default Teams;

// -----------------------------------------

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TeamModal from "../components/TeamModal";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/teams.css";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Load teams when the page mounts.
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data } = await api.get("/teams");
        setTeams(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Failed to load teams");
        console.error("Failed to load teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Open the modal for creating a new team.
  const handleCreateTeam = () => {
    setSelectedTeam(null);
    setShowModal(true);
  };

  // Open the modal for editing an existing team.
  const handleEditTeam = (team) => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  // Update the list after a team is created or edited.
  const handleSaved = (team, isEdit) => {
    if (isEdit) {
      setTeams((previousTeams) =>
        previousTeams.map((existingTeam) =>
          existingTeam._id === team._id ? team : existingTeam
        )
      );
    } else {
      setTeams((previousTeams) => [team, ...previousTeams]);
    }

    handleCloseModal();
  };

  // Delete a team.
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/teams/${id}`);

      setTeams((previousTeams) =>
        previousTeams.filter((team) => team._id !== id)
      );

      toast.success("Team deleted successfully");
    } catch (error) {
      toast.error("Failed to delete team");
      console.error("Failed to delete team:", error);
    }
  };

  return (
    <Layout
      title="Teams"
      subtitle="Bring people together and manage your workspace"
    >
      <div className="teams-page">
        {/* Welcome section */}
        <section className="teams-welcome mb-4">
          <div className="teams-welcome-content">
            <div className="teams-welcome-label">
              <i className="bi bi-people-fill me-2"></i>
              YOUR WORKSPACE
            </div>

            <h2>Better work starts with a great team.</h2>

            <p>
              Organize your people, bring projects together, and make
              collaboration simpler.
            </p>

            <button
              type="button"
              className="btn teams-primary-btn"
              onClick={handleCreateTeam}
            >
              <i className="bi bi-plus-lg me-2"></i>
              Create a team
            </button>
          </div>

          <div className="teams-welcome-illustration">
            <div className="teams-illustration-circle">
              <i className="bi bi-people-fill"></i>
            </div>
            <div className="teams-floating-icon teams-floating-one">
              <i className="bi bi-chat-dots-fill"></i>
            </div>
            <div className="teams-floating-icon teams-floating-two">
              <i className="bi bi-check2-circle"></i>
            </div>
            <div className="teams-floating-icon teams-floating-three">
              <i className="bi bi-stars"></i>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="teams-overview mb-4">
          <div className="teams-overview-card">
            <div className="teams-overview-icon">
              <i className="bi bi-people-fill"></i>
            </div>

            <div>
              <span className="teams-overview-label">Total teams</span>
              <h3>{loading ? "—" : teams.length}</h3>
              <p>Teams in your workspace</p>
            </div>
          </div>

          <div className="teams-overview-card">
            <div className="teams-overview-icon teams-overview-icon-purple">
              <i className="bi bi-diagram-3-fill"></i>
            </div>

            <div>
              <span className="teams-overview-label">Workspace</span>
              <h3>Collaboration</h3>
              <p>Work better, together</p>
            </div>
          </div>
        </section>

        {/* Team list heading */}
        <div className="teams-section-heading">
          <div>
            <h4>Your teams</h4>
            <p>Manage the teams in your workspace.</p>
          </div>

          <button
            type="button"
            className="btn teams-outline-btn"
            onClick={handleCreateTeam}
          >
            <i className="bi bi-plus-lg me-2"></i>
            New team
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="teams-state-card">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5>Loading your teams</h5>
            <p>Please wait while we fetch your workspace teams.</p>
          </div>
        ) : teams.length === 0 ? (
          /* Empty state */
          <div className="teams-state-card">
            <div className="teams-empty-icon">
              <i className="bi bi-people"></i>
            </div>

            <h5>No teams yet</h5>

            <p>
              You haven't created any teams. Start by creating your first
              team and bring your collaborators together.
            </p>

            <button
              type="button"
              className="btn teams-primary-btn"
              onClick={handleCreateTeam}
            >
              <i className="bi bi-plus-lg me-2"></i>
              Create your first team
            </button>
          </div>
        ) : (
          /* Teams grid */
          <div className="row g-4 teams-grid">
            {teams.map((team) => (
              <div key={team._id} className="col-12 col-md-6 col-xl-4">
                <article className="team-card h-100">
                  <div className="team-card-top">
                    <div className="team-card-icon">
                      <i className="bi bi-people-fill"></i>
                    </div>

                    <div className="dropdown">
                      <button
                        type="button"
                        className="team-menu-btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        aria-label={`Actions for ${team.name}`}
                      >
                        <i className="bi bi-three-dots"></i>
                      </button>

                      <ul className="dropdown-menu dropdown-menu-end team-dropdown">
                        <li>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => handleEditTeam(team)}
                          >
                            <i className="bi bi-pencil me-2"></i>
                            Edit team
                          </button>
                        </li>

                        <li>
                          <hr className="dropdown-divider" />
                        </li>

                        <li>
                          <button
                            type="button"
                            className="dropdown-item text-danger"
                            onClick={() => handleDelete(team._id)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            Delete team
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="team-card-content">
                    <span className="team-card-eyebrow">WORKSPACE TEAM</span>

                    <h5>{team.name || "Untitled team"}</h5>

                    <p>
                      {team.description?.trim() ||
                        "No description has been added for this team yet."}
                    </p>
                  </div>

                  <div className="team-card-footer">
                    <div className="team-card-type">
                      <i className="bi bi-people me-2"></i>
                      Team
                    </div>

                    <span className="team-active-badge">
                      <span></span>
                      Active
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}

        {/* Create/Edit modal */}
        <TeamModal
          show={showModal}
          handleClose={handleCloseModal}
          team={selectedTeam}
          onSaved={handleSaved}
        />
      </div>
    </Layout>
  );
};

export default Teams;