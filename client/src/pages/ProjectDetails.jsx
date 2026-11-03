  
//  import { useEffect, useMemo, useState } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import Layout from "../components/Layout";
// import TaskCard from "../components/TaskCard";
// import CreateTaskModal from "../components/CreateTaskModal";
// import api from "../services/api";
// import toast from "react-hot-toast";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const [project, setProject] = useState(null);
//   const [projectTasks, setProjectTasks] = useState([]);
//   const [allTasks, setAllTasks] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [activeFilter, setActiveFilter] = useState(null);

//   // URL filters
//   const ownerFilter = searchParams.get("owner") || "";
//   const teamFilter = searchParams.get("team") || "";
//   const tagFilter = searchParams.get("tag") || "";
//   const projectFilter = searchParams.get("project") || "";
//   const statusFilter = searchParams.get("status") || "";

//   // Check whether any filter is applied
//   const hasFilters =
//     ownerFilter ||
//     teamFilter ||
//     tagFilter ||
//     projectFilter ||
//     statusFilter;

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/immutability
//     loadProject();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const loadProject = async () => {
//     try {
//       setLoading(true);

//       const [projectRes, projectTasksRes, allTasksRes] =
//         await Promise.all([
//           api.get(`/projects/${id}`),

//           // Current project's tasks
//           api.get(`/tasks?project=${id}`),

//           // ALL tasks
//           api.get("/tasks"),
//         ]);

//       console.log("project data:", projectRes.data);
//       console.log("project tasks:", projectTasksRes.data);
//       console.log("all tasks:", allTasksRes.data);

//       setProject(projectRes.data);
//       setProjectTasks(projectTasksRes.data);
//       setAllTasks(allTasksRes.data);
//     } catch (error) {
//       toast.error("Failed to load project");
//       console.log("message:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /*
//    * Filter options are created from ALL tasks.
//    *
//    * This is important because when a filter is selected,
//    * we want to search across all tasks.
//    */
//   const filterOptions = useMemo(() => {
//     const owners = [];
//     const teams = [];
//     const projects = [];
//     const tags = [];

//     allTasks.forEach((task) => {
//       // Owners
//       task.owners?.forEach((owner) => {
//         if (
//           owner?.name &&
//           !owners.some(
//             (item) => item.name === owner.name
//           )
//         ) {
//           owners.push({
//             _id: owner._id,
//             name: owner.name,
//           });
//         }
//       });

//       // Teams
//       if (
//         task.team?.name &&
//         !teams.some(
//           (item) => item.name === task.team.name
//         )
//       ) {
//         teams.push({
//           _id: task.team._id,
//           name: task.team.name,
//         });
//       }

//       // Projects
//       if (
//         task.project?.name &&
//         !projects.some(
//           (item) => item.name === task.project.name
//         )
//       ) {
//         projects.push({
//           _id: task.project._id,
//           name: task.project.name,
//         });
//       }

//       // Tags
//       task.tags?.forEach((tag) => {
//         if (!tags.includes(tag)) {
//           tags.push(tag);
//         }
//       });
//     });

//     return {
//       owners,
//       teams,
//       projects,
//       tags,
//     };
//   }, [allTasks]);

//   /*
//    * IMPORTANT:
//    *
//    * No filter:
//    *     show only current project's tasks.
//    *
//    * Filter applied:
//    *     search through ALL tasks.
//    */
//   const displayedTasks = useMemo(() => {
//     // No filter -> project tasks
//     if (!hasFilters) {
//       return projectTasks;
//     }

//     // Filter -> all tasks
//     return allTasks.filter((task) => {
//       const matchesOwner =
//         !ownerFilter ||
//         task.owners?.some(
//           (owner) => owner.name === ownerFilter
//         );

//       const matchesTeam =
//         !teamFilter ||
//         task.team?.name === teamFilter;

//       const matchesTag =
//         !tagFilter ||
//         task.tags?.includes(tagFilter);

//       const matchesProject =
//         !projectFilter ||
//         task.project?.name === projectFilter;

//       const matchesStatus =
//         !statusFilter ||
//         task.status === statusFilter;

//       return (
//         matchesOwner &&
//         matchesTeam &&
//         matchesTag &&
//         matchesProject &&
//         matchesStatus
//       );
//     });
//   }, [
//     hasFilters,
//     projectTasks,
//     allTasks,
//     ownerFilter,
//     teamFilter,
//     tagFilter,
//     projectFilter,
//     statusFilter,
//   ]);

//   /*
//    * Update URL when filter is selected.
//    */
//   const handleFilterSelect = (key, value) => {
//     const params = new URLSearchParams(searchParams);

//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }

//     setSearchParams(params);
//     setActiveFilter(null);
//   };

//   /*
//    * Clear all filters.
//    *
//    * This returns the page to the project's tasks.
//    */
//   const clearFilters = () => {
//     setSearchParams({});
//     setActiveFilter(null);
//   };

//   /*
//    * Task created from CreateTaskModal.
//    *
//    * Since the modal creates a task for the current project,
//    * add it to projectTasks and allTasks.
//    */
//   const handleTaskCreated = (task) => {
//     setProjectTasks((prev) => [task, ...prev]);

//     setAllTasks((prev) => [task, ...prev]);

//     setShowModal(false);
//   };

//   /*
//    * Update task status.
//    */
//   const handleStatusChange = (updatedTask) => {
//     setProjectTasks((prev) =>
//       prev.map((task) =>
//         task._id === updatedTask._id
//           ? updatedTask
//           : task
//       )
//     );

//     setAllTasks((prev) =>
//       prev.map((task) =>
//         task._id === updatedTask._id
//           ? updatedTask
//           : task
//       )
//     );
//   };

//   /*
//    * Close dropdown when clicking outside.
//    */
//   useEffect(() => {
//     const handleClickOutside = () => {
//       setActiveFilter(null);
//     };

//     if (activeFilter) {
//       document.addEventListener(
//         "click",
//         handleClickOutside
//       );
//     }

//     return () => {
//       document.removeEventListener(
//         "click",
//         handleClickOutside
//       );
//     };
//   }, [activeFilter]);

//   if (loading) {
//     return (
//       <Layout title="Project Details">
//         <div className="content-card text-center py-5">
//           <div className="spinner-border text-primary mb-3"></div>

//           <div className="text-muted">
//             Loading project...
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout title={project?.name || "Project Details"}>

//       {/* Project Header */}
//       <div className="content-card mb-4">
//         <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

//           <div>
//             <h4 className="fw-bold mb-2">
//               {project?.name}
//             </h4>

//             <p className="text-muted mb-3">
//               {project?.description ||
//                 "No description available"}
//             </p>

//             <div className="d-flex gap-4 flex-wrap text-muted small">

//               <span>
//                 <i className="bi bi-list-task me-1"></i>
//                 {projectTasks.length} Tasks
//               </span>

//               <span>
//                 <i className="bi bi-check-circle me-1"></i>
//                 {
//                   projectTasks.filter(
//                     (task) =>
//                       task.status === "Completed"
//                   ).length
//                 }{" "}
//                 Completed
//               </span>

//             </div>
//           </div>

//           {/* Keep CreateTaskModal functionality */}
//           <button
//             className="btn btn-primary rounded-pill px-4"
//             onClick={() => setShowModal(true)}
//           >
//             <i className="bi bi-plus-lg me-2"></i>
//             Add Task
//           </button>

//         </div>
//       </div>

//       {/* Filters */}
//       <div className="content-card mb-4">

//         <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

//           <div className="d-flex flex-wrap gap-2">

//             {/* ALL */}
//             <button
//               className={`btn rounded-pill px-3 ${
//                 !hasFilters
//                   ? "btn-primary"
//                   : "btn-outline-secondary"
//               }`}
//               onClick={clearFilters}
//             >
//               All
//             </button>

//             {/* OWNER */}
//             <div
//               className="position-relative"
//               onClick={(event) =>
//                 event.stopPropagation()
//               }
//             >
//               <button
//                 className={`btn rounded-pill px-3 ${
//                   ownerFilter
//                     ? "btn-primary"
//                     : "btn-outline-secondary"
//                 }`}
//                 onClick={() =>
//                   setActiveFilter(
//                     activeFilter === "owner"
//                       ? null
//                       : "owner"
//                   )
//                 }
//               >
//                 Owner
//                 <i className="bi bi-chevron-down ms-2"></i>
//               </button>

//               {activeFilter === "owner" && (
//                 <div
//                   className="dropdown-menu show position-absolute"
//                   style={{
//                     minWidth: "180px",
//                     zIndex: 1050,
//                   }}
//                 >
//                   <button
//                     className="dropdown-item"
//                     onClick={() =>
//                       handleFilterSelect(
//                         "owner",
//                         ""
//                       )
//                     }
//                   >
//                     All Owners
//                   </button>

//                   {filterOptions.owners.map(
//                     (owner) => (
//                       <button
//                         key={owner._id}
//                         className={`dropdown-item ${
//                           ownerFilter === owner.name
//                             ? "active"
//                             : ""
//                         }`}
//                         onClick={() =>
//                           handleFilterSelect(
//                             "owner",
//                             owner.name
//                           )
//                         }
//                       >
//                         {owner.name}
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* TEAM */}
//             <div
//               className="position-relative"
//               onClick={(event) =>
//                 event.stopPropagation()
//               }
//             >
//               <button
//                 className={`btn rounded-pill px-3 ${
//                   teamFilter
//                     ? "btn-primary"
//                     : "btn-outline-secondary"
//                 }`}
//                 onClick={() =>
//                   setActiveFilter(
//                     activeFilter === "team"
//                       ? null
//                       : "team"
//                   )
//                 }
//               >
//                 Team
//                 <i className="bi bi-chevron-down ms-2"></i>
//               </button>

//               {activeFilter === "team" && (
//                 <div
//                   className="dropdown-menu show position-absolute"
//                   style={{
//                     minWidth: "180px",
//                     zIndex: 1050,
//                   }}
//                 >
//                   <button
//                     className="dropdown-item"
//                     onClick={() =>
//                       handleFilterSelect(
//                         "team",
//                         ""
//                       )
//                     }
//                   >
//                     All Teams
//                   </button>

//                   {filterOptions.teams.map(
//                     (team) => (
//                       <button
//                         key={team._id}
//                         className={`dropdown-item ${
//                           teamFilter === team.name
//                             ? "active"
//                             : ""
//                         }`}
//                         onClick={() =>
//                           handleFilterSelect(
//                             "team",
//                             team.name
//                           )
//                         }
//                       >
//                         {team.name}
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* TAGS */}
//             <div
//               className="position-relative"
//               onClick={(event) =>
//                 event.stopPropagation()
//               }
//             >
//               <button
//                 className={`btn rounded-pill px-3 ${
//                   tagFilter
//                     ? "btn-primary"
//                     : "btn-outline-secondary"
//                 }`}
//                 onClick={() =>
//                   setActiveFilter(
//                     activeFilter === "tag"
//                       ? null
//                       : "tag"
//                   )
//                 }
//               >
//                 Tags
//                 <i className="bi bi-chevron-down ms-2"></i>
//               </button>

//               {activeFilter === "tag" && (
//                 <div
//                   className="dropdown-menu show position-absolute"
//                   style={{
//                     minWidth: "180px",
//                     zIndex: 1050,
//                   }}
//                 >
//                   <button
//                     className="dropdown-item"
//                     onClick={() =>
//                       handleFilterSelect(
//                         "tag",
//                         ""
//                       )
//                     }
//                   >
//                     All Tags
//                   </button>

//                   {filterOptions.tags.map(
//                     (tag) => (
//                       <button
//                         key={tag}
//                         className={`dropdown-item ${
//                           tagFilter === tag
//                             ? "active"
//                             : ""
//                         }`}
//                         onClick={() =>
//                           handleFilterSelect(
//                             "tag",
//                             tag
//                           )
//                         }
//                       >
//                         {tag}
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* PROJECT */}
//             <div
//               className="position-relative"
//               onClick={(event) =>
//                 event.stopPropagation()
//               }
//             >
//               <button
//                 className={`btn rounded-pill px-3 ${
//                   projectFilter
//                     ? "btn-primary"
//                     : "btn-outline-secondary"
//                 }`}
//                 onClick={() =>
//                   setActiveFilter(
//                     activeFilter === "project"
//                       ? null
//                       : "project"
//                   )
//                 }
//               >
//                 Project
//                 <i className="bi bi-chevron-down ms-2"></i>
//               </button>

//               {activeFilter === "project" && (
//                 <div
//                   className="dropdown-menu show position-absolute"
//                   style={{
//                     minWidth: "220px",
//                     zIndex: 1050,
//                   }}
//                 >
//                   <button
//                     className="dropdown-item"
//                     onClick={() =>
//                       handleFilterSelect(
//                         "project",
//                         ""
//                       )
//                     }
//                   >
//                     All Projects
//                   </button>

//                   {filterOptions.projects.map(
//                     (projectItem) => (
//                       <button
//                         key={projectItem._id}
//                         className={`dropdown-item ${
//                           projectFilter ===
//                           projectItem.name
//                             ? "active"
//                             : ""
//                         }`}
//                         onClick={() =>
//                           handleFilterSelect(
//                             "project",
//                             projectItem.name
//                           )
//                         }
//                       >
//                         {projectItem.name}
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* STATUS */}
//             <div
//               className="position-relative"
//               onClick={(event) =>
//                 event.stopPropagation()
//               }
//             >
//               <button
//                 className={`btn rounded-pill px-3 ${
//                   statusFilter
//                     ? "btn-primary"
//                     : "btn-outline-secondary"
//                 }`}
//                 onClick={() =>
//                   setActiveFilter(
//                     activeFilter === "status"
//                       ? null
//                       : "status"
//                   )
//                 }
//               >
//                 Status
//                 <i className="bi bi-chevron-down ms-2"></i>
//               </button>

//               {activeFilter === "status" && (
//                 <div
//                   className="dropdown-menu show position-absolute"
//                   style={{
//                     minWidth: "180px",
//                     zIndex: 1050,
//                   }}
//                 >
//                   <button
//                     className="dropdown-item"
//                     onClick={() =>
//                       handleFilterSelect(
//                         "status",
//                         ""
//                       )
//                     }
//                   >
//                     All Status
//                   </button>

//                   <button
//                     className={`dropdown-item ${
//                       statusFilter === "To Do"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       handleFilterSelect(
//                         "status",
//                         "To Do"
//                       )
//                     }
//                   >
//                     To Do
//                   </button>

//                   <button
//                     className={`dropdown-item ${
//                       statusFilter === "In Progress"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       handleFilterSelect(
//                         "status",
//                         "In Progress"
//                       )
//                     }
//                   >
//                     In Progress
//                   </button>

//                   <button
//                     className={`dropdown-item ${
//                       statusFilter === "Completed"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       handleFilterSelect(
//                         "status",
//                         "Completed"
//                       )
//                     }
//                   >
//                     Completed
//                   </button>

//                   <button
//                     className={`dropdown-item ${
//                       statusFilter === "Blocked"
//                         ? "active"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       handleFilterSelect(
//                         "status",
//                         "Blocked"
//                       )
//                     }
//                   >
//                     Blocked
//                   </button>
//                 </div>
//               )}
//             </div>

//           </div>

//           {/* Clear Filters */}
//           {hasFilters && (
//             <button
//               className="btn btn-outline-secondary btn-sm rounded-pill"
//               onClick={clearFilters}
//             >
//               <i className="bi bi-x-lg me-1"></i>
//               Clear Filters
//             </button>
//           )}

//         </div>
//       </div>

//       {/* Task List */}
//       <div className="content-card">

//         <div className="d-flex justify-content-between align-items-center mb-4">

//           <div>
//             <h5 className="fw-bold mb-0">
//               {hasFilters
//                 ? "Filtered Tasks"
//                 : "Project Tasks"}
//             </h5>

//             {hasFilters && (
//               <small className="text-muted">
//                 Showing tasks from all projects
//               </small>
//             )}
//           </div>

//           <span className="text-muted">
//             {displayedTasks.length} tasks
//           </span>

//         </div>

//         {displayedTasks.length === 0 ? (
//           <div className="text-center py-5">

//             <i className="bi bi-list-task display-4 text-muted"></i>

//             <h6 className="mt-3 fw-bold">
//               No tasks found
//             </h6>

//             <p className="text-muted">
//               Try changing or clearing your filters.
//             </p>

//             {hasFilters && (
//               <button
//                 className="btn btn-primary rounded-pill px-4"
//                 onClick={clearFilters}
//               >
//                 Show Project Tasks
//               </button>
//             )}

//           </div>
//         ) : (
//           displayedTasks.map((task) => (
//             <TaskCard
//               key={task._id}
//               task={task}
//               onStatusChange={handleStatusChange}
//             />
//           ))
//         )}

//       </div>

//       {/* Create Task Modal */}
//       <CreateTaskModal
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         projectId={id}
//         onTaskCreated={handleTaskCreated}
//       />

//     </Layout>
//   );
// };

// export default ProjectDetails;

// --------------------------------------------------------------


import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import api from "../services/api";
import toast from "react-hot-toast";
import "../styles/project-details.css";

/*
 * Reusable filter dropdown.
 * Supports regular options and searchable options.
 */
const FilterDropdown = ({
  filterKey,
  label,
  icon,
  activeFilter,
  setActiveFilter,
  selectedValue,
  allLabel,
  options,
  onSelect,
  searchable = false,
  searchValue = "",
  searchTerm = "",
  onSearchChange,
  onOpen,
}) => {
  const isOpen = activeFilter === filterKey;

  const filteredOptions = options.filter((option) => {
    if (!searchable || !searchTerm) return true;

    const searchText = `${option.label || ""} ${
      option.subLabel || ""
    }`.toLowerCase();

    return searchText.includes(searchTerm);
  });

  const isSelected = (option) =>
    selectedValue === option.value ||
    option.legacyValues?.includes(selectedValue);

  return (
    <div
      className="position-relative"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className={`btn rounded-pill px-3 project-filter-trigger ${
          selectedValue ? "project-filter-active" : ""
        }`}
        onClick={() => {
          if (isOpen) {
            setActiveFilter(null);
          } else {
            onOpen?.();
            setActiveFilter(filterKey);
          }
        }}
      >
        <i className={`bi ${icon} me-2`}></i>
        {label}

        {selectedValue && (
          <i className="bi bi-check2 ms-1"></i>
        )}

        <i
          className={`bi ms-2 ${
            isOpen ? "bi-chevron-up" : "bi-chevron-down"
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="dropdown-menu show position-absolute project-filter-menu">
          {searchable && (
            <div className="px-2 pb-2">
              <div className="input-group input-group-sm project-search-input">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={searchValue}
                  onChange={(event) =>
                    onSearchChange?.(event.target.value)
                  }
                  onClick={(event) => event.stopPropagation()}
                />

                {searchValue && (
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => onSearchChange?.("")}
                    aria-label={`Clear ${label} search`}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            type="button"
            className={`dropdown-item rounded-3 ${
              !selectedValue ? "active" : ""
            }`}
            onClick={() => onSelect("")}
          >
            <i className="bi bi-grid me-2"></i>
            {allLabel}
          </button>

          <div className="dropdown-divider"></div>

          <div className="project-filter-options">
            {filteredOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                className={`dropdown-item rounded-3 ${
                  isSelected(option) ? "active" : ""
                }`}
                onClick={() => onSelect(option.value)}
              >
                {option.avatar && (
                  <span className="owner-avatar me-2">
                    {option.avatar}
                  </span>
                )}

                <span className="d-inline-flex flex-column text-start overflow-hidden align-middle">
                  <span className="text-truncate">
                    {option.label}
                  </span>

                  {option.subLabel && (
                    <small className="owner-email text-truncate">
                      {option.subLabel}
                    </small>
                  )}
                </span>
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <div className="text-center text-muted small py-3 px-2">
                <i className="bi bi-search d-block fs-5 mb-1"></i>
                No {label.toLowerCase()} found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [project, setProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // Owner search state
  const [ownerSearch, setOwnerSearch] = useState("");
  const [debouncedOwnerSearch, setDebouncedOwnerSearch] = useState("");

  // URL filters
  const ownerFilter = searchParams.get("owner") || "";
  const teamFilter = searchParams.get("team") || "";
  const tagFilter = searchParams.get("tag") || "";
  const projectFilter = searchParams.get("project") || "";
  const statusFilter = searchParams.get("status") || "";

  const hasFilters = Boolean(
    ownerFilter ||
      teamFilter ||
      tagFilter ||
      projectFilter ||
      statusFilter
  );

  // Load project and task data
  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);

        const [projectRes, projectTasksRes, allTasksRes] =
          await Promise.all([
            api.get(`/projects/${id}`),
            api.get(`/tasks?project=${id}`),
            api.get("/tasks"),
          ]);

        setProject(projectRes.data);
        setProjectTasks(projectTasksRes.data);
        setAllTasks(allTasksRes.data);
      } catch (error) {
        toast.error("Failed to load project");
        console.error("Project loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  // Debounce owner search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedOwnerSearch(ownerSearch.trim().toLowerCase());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [ownerSearch]);

  /*
   * Build unique filter options from all tasks.
   * Owner email is used as a fallback if name is missing.
   */
  const filterOptions = useMemo(() => {
    const ownersMap = new Map();
    const teamsMap = new Map();
    const projectsMap = new Map();
    const tagsSet = new Set();

    allTasks.forEach((task) => {
      // Owners
      task.owners?.forEach((owner) => {
        if (!owner?._id) return;

        const ownerId = String(owner._id);

        ownersMap.set(ownerId, {
          value: ownerId,
          label:
            owner.name?.trim() ||
            owner.email ||
            "Unnamed user",
          subLabel: owner.email || "",
          avatar: (
            owner.name?.trim() ||
            owner.email ||
            "U"
          )
            .charAt(0)
            .toUpperCase(),
          legacyValues: [owner.name, owner.email].filter(Boolean),
        });
      });

      // Teams
      if (task.team?._id && task.team?.name) {
        teamsMap.set(String(task.team._id), {
          value: task.team.name,
          label: task.team.name,
        });
      }

      // Projects
      if (task.project?._id && task.project?.name) {
        projectsMap.set(String(task.project._id), {
          value: task.project.name,
          label: task.project.name,
        });
      }

      // Tags
      task.tags?.forEach((tag) => {
        if (tag) tagsSet.add(tag);
      });
    });

    return {
      owners: Array.from(ownersMap.values()).sort((a, b) =>
        a.label.localeCompare(b.label)
      ),
      teams: Array.from(teamsMap.values()).sort((a, b) =>
        a.label.localeCompare(b.label)
      ),
      projects: Array.from(projectsMap.values()).sort((a, b) =>
        a.label.localeCompare(b.label)
      ),
      tags: Array.from(tagsSet)
        .sort()
        .map((tag) => ({
          value: tag,
          label: tag,
        })),
    };
  }, [allTasks]);

  const statusOptions = [
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Blocked", label: "Blocked" },
  ];

  /*
   * No filters: show current project's tasks.
   * Any filter: search across all tasks.
   */
  const displayedTasks = useMemo(() => {
    if (!hasFilters) {
      return projectTasks;
    }

    return allTasks.filter((task) => {
      const matchesOwner =
        !ownerFilter ||
        task.owners?.some(
          (owner) =>
            String(owner?._id) === ownerFilter ||
            owner?.name === ownerFilter ||
            owner?.email === ownerFilter
        );

      const matchesTeam =
        !teamFilter || task.team?.name === teamFilter;

      const matchesTag =
        !tagFilter || task.tags?.includes(tagFilter);

      const matchesProject =
        !projectFilter ||
        task.project?.name === projectFilter;

      const matchesStatus =
        !statusFilter || task.status === statusFilter;

      return (
        matchesOwner &&
        matchesTeam &&
        matchesTag &&
        matchesProject &&
        matchesStatus
      );
    });
  }, [
    hasFilters,
    projectTasks,
    allTasks,
    ownerFilter,
    teamFilter,
    tagFilter,
    projectFilter,
    statusFilter,
  ]);

  // Update URL filters
  const handleFilterSelect = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
    setActiveFilter(null);

    if (key === "owner") {
      setOwnerSearch("");
      setDebouncedOwnerSearch("");
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
    setActiveFilter(null);
    setOwnerSearch("");
    setDebouncedOwnerSearch("");
  };

  // Handle task creation
  const handleTaskCreated = (task) => {
    setProjectTasks((previous) => [task, ...previous]);
    setAllTasks((previous) => [task, ...previous]);
    setShowModal(false);
  };

  // Handle task status updates
  const handleStatusChange = (updatedTask) => {
    setProjectTasks((previous) =>
      previous.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );

    setAllTasks((previous) =>
      previous.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!activeFilter) return;

    const handleClickOutside = () => {
      setActiveFilter(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeFilter]);

  if (loading) {
    return (
      <Layout title="Project Details">
        <div className="content-card project-panel text-center py-5">
          <div className="spinner-border project-spinner mb-3"></div>
          <div className="text-muted">Loading project...</div>
        </div>
      </Layout>
    );
  }

  const completedTasks = projectTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <Layout title={project?.name || "Project Details"}>
      {/* Project Header */}
      <div className="content-card project-panel project-hero mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="project-heading">
            <div className="project-eyebrow mb-2">
              <i className="bi bi-folder2-open me-2"></i>
              PROJECT OVERVIEW
            </div>

            <h4 className="fw-bold mb-2">
              {project?.name || "Untitled Project"}
            </h4>

            <p className="text-muted mb-3 project-description">
              {project?.description || "No description available"}
            </p>

            <div className="d-flex gap-3 flex-wrap project-stats">
              <span>
                <i className="bi bi-list-task me-2"></i>
                {projectTasks.length} Tasks
              </span>

              <span>
                <i className="bi bi-check-circle me-2"></i>
                {completedTasks} Completed
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary rounded-pill px-4 project-add-button"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Task
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="content-card project-panel project-filter-panel mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <div>
            <h6 className="fw-bold mb-1 project-section-title">
              <i className="bi bi-funnel me-2"></i>
              Filter Tasks
            </h6>
            <small className="text-muted">
              Narrow down tasks by owner, team, project, or status.
            </small>
          </div>

          {hasFilters && (
            <button
              type="button"
              className="btn btn-sm project-clear-button rounded-pill"
              onClick={clearFilters}
            >
              <i className="bi bi-x-circle me-1"></i>
              Clear filters
            </button>
          )}
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* All */}
          <button
            type="button"
            className={`btn rounded-pill px-3 project-filter-trigger ${
              !hasFilters ? "project-filter-active" : ""
            }`}
            onClick={clearFilters}
          >
            <i className="bi bi-grid me-2"></i>
            All
          </button>

          {/* Owner */}
          <FilterDropdown
            filterKey="owner"
            label="Owner"
            icon="bi-person"
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedValue={ownerFilter}
            allLabel="All Owners"
            options={filterOptions.owners}
            onSelect={(value) => handleFilterSelect("owner", value)}
            searchable
            searchValue={ownerSearch}
            searchTerm={debouncedOwnerSearch}
            onSearchChange={setOwnerSearch}
            onOpen={() => setOwnerSearch("")}
          />

          {/* Team */}
          <FilterDropdown
            filterKey="team"
            label="Team"
            icon="bi-people"
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedValue={teamFilter}
            allLabel="All Teams"
            options={filterOptions.teams}
            onSelect={(value) => handleFilterSelect("team", value)}
          />

          {/* Tags */}
          <FilterDropdown
            filterKey="tag"
            label="Tags"
            icon="bi-tags"
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedValue={tagFilter}
            allLabel="All Tags"
            options={filterOptions.tags}
            onSelect={(value) => handleFilterSelect("tag", value)}
          />

          {/* Project */}
          <FilterDropdown
            filterKey="project"
            label="Project"
            icon="bi-folder"
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedValue={projectFilter}
            allLabel="All Projects"
            options={filterOptions.projects}
            onSelect={(value) => handleFilterSelect("project", value)}
          />

          {/* Status */}
          <FilterDropdown
            filterKey="status"
            label="Status"
            icon="bi-flag"
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedValue={statusFilter}
            allLabel="All Statuses"
            options={statusOptions}
            onSelect={(value) => handleFilterSelect("status", value)}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="content-card project-panel project-task-panel">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
          <div>
            <h5 className="fw-bold mb-1 project-section-title">
              {hasFilters ? "Filtered Tasks" : "Project Tasks"}
            </h5>

            <small className="text-muted">
              {hasFilters
                ? "Results matching your selected filters"
                : "Tasks belonging to this project"}
            </small>
          </div>

          <span className="project-task-count">
            {displayedTasks.length}{" "}
            {displayedTasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {displayedTasks.length === 0 ? (
          <div className="text-center py-5 project-empty-state">
            <div className="project-empty-icon mb-3">
              <i className="bi bi-clipboard2-check"></i>
            </div>

            <h6 className="mt-3 fw-bold">No tasks found</h6>

            <p className="text-muted mb-3">
              {hasFilters
                ? "Try changing or clearing your filters."
                : "This project doesn't have any tasks yet."}
            </p>

            {hasFilters ? (
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4"
                onClick={clearFilters}
              >
                <i className="bi bi-arrow-counterclockwise me-2"></i>
                Show Project Tasks
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-plus-lg me-2"></i>
                Create First Task
              </button>
            )}
          </div>
        ) : (
          displayedTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        projectId={id}
        onTaskCreated={handleTaskCreated}
      />
    </Layout>
  );
};

export default ProjectDetails;
