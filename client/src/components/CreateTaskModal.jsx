 
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import api from "../services/api";

const initialForm = {
  name: "",
  team: "",
  owners: [],
  tags: [],
  dueDate: "",
  timeToComplete: 1,
};

const CreateTaskModal = ({
  show,
  handleClose,
  projectId,
  onTaskCreated,
}) => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
const [ownerSearch, setOwnerSearch] = useState("");


  const [form, setForm] = useState(initialForm);


  const filteredUsers = users.filter((user) => {
  const search = ownerSearch.toLowerCase().trim();

  return (
    (user.name || "").toLowerCase().includes(search) ||
    (user.email || "").toLowerCase().includes(search)
  );
});


  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Load teams, users and existing task tags
  const loadData = async () => {
    try {
      setDataLoading(true);

      const [teamsRes, usersRes, tasksRes] = await Promise.all([
        api.get("/teams"),
        api.get("/users"),
        api.get("/tasks"),
      ]);

      setTeams(Array.isArray(teamsRes.data) ? teamsRes.data : []);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);

      const tags = [
        ...new Set(
          (Array.isArray(tasksRes.data) ? tasksRes.data : []).flatMap(
            (task) => task.tags || []
          )
        ),
      ];

      setAvailableTags(tags);
    } catch (error) {
      toast.error("Failed to load form data");
      console.error("Form data loading error:", error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadData();
    }
  }, [show]);

  // Owner selection
  const handleOwnerChange = (userId) => {
    setForm((prev) => ({
      ...prev,
      owners: prev.owners.includes(userId)
        ? prev.owners.filter((id) => id !== userId)
        : [...prev.owners, userId],
    }));
  };

  // Tag selection
  const handleTagChange = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag],
    }));
  };

  // Add custom tag
  const addCustomTag = () => {
    const tag = newTag.trim();

    if (!tag) return;

    if (
      form.tags.some(
        (item) => item.toLowerCase() === tag.toLowerCase()
      )
    ) {
      toast.error("Tag already selected");
      return;
    }

    const existingTag = availableTags.find(
      (item) => item.toLowerCase() === tag.toLowerCase()
    );

    const finalTag = existingTag || tag;

    updateField("tags", [...form.tags, finalTag]);

    setAvailableTags((prev) =>
      existingTag ? prev : [...prev, tag]
    );

    setNewTag("");
  };

  // Submit task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.team || form.owners.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    if (Number(form.timeToComplete) < 1) {
      toast.error("Time to complete must be at least 1 day");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        project: projectId,
        team: form.team,
        owners: form.owners,
        tags: form.tags,
        dueDate: form.dueDate || undefined,
        timeToComplete: Number(form.timeToComplete),
      };

      const { data } = await api.post("/tasks", payload);

      onTaskCreated(data);

      toast.success("Task created successfully");

      setForm(initialForm);
      setNewTag("");

      handleClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task"
      );

      console.error("Task creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    if (loading) return;
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleModalClose}
      centered
      size="lg"
      backdrop={loading ? "static" : true}
      keyboard={!loading}
      contentClassName="border-0 rounded-4 overflow-hidden"
    >
      {/* Header */}
      <Modal.Header
        closeButton={!loading}
        className="border-0 px-4 pt-4 pb-2"
        style={{ backgroundColor: "#FFFEFA" }}
      >
        <div>
          <div
            className="d-flex align-items-center justify-content-center rounded-3 mb-3"
            style={{
              width: 46,
              height: 46,
              backgroundColor: "#EFEDFF",
              color: "#635BFF",
            }}
          >
            <i className="bi bi-check2-square fs-4"></i>
          </div>

          <Modal.Title
            className="fw-bold"
            style={{
              color: "#151A2D",
              fontSize: "1.35rem",
              letterSpacing: "-0.4px",
            }}
          >
            Create New Task
          </Modal.Title>

          <p className="text-muted small mb-0 mt-1">
            Add a task, assign your team, and set a deadline.
          </p>
        </div>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body
          className="px-4 py-4"
          style={{ backgroundColor: "#FFFEFA" }}
        >
          {dataLoading && (
            <div className="text-center py-3">
              <div
                className="spinner-border spinner-border-sm"
                style={{ color: "#635BFF" }}
                role="status"
              ></div>
              <span className="text-muted small ms-2">
                Loading task form data...
              </span>
            </div>
          )}

          <div className="row g-4">
            {/* Task Name */}
            <div className="col-12">
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  Task Name <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="e.g. Design the dashboard homepage"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  maxLength={150}
                  required
                  disabled={loading}
                  className="rounded-3 py-2 shadow-none"
                  style={{ borderColor: "#E8E6F0" }}
                />
              </Form.Group>
            </div>

            {/* Team */}
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  <i className="bi bi-people me-2" style={{ color: "#635BFF" }}></i>
                  Team <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={form.team}
                  onChange={(e) => updateField("team", e.target.value)}
                  required
                  disabled={loading || dataLoading}
                  className="rounded-3 py-2 shadow-none"
                  style={{ borderColor: "#E8E6F0" }}
                >
                  <option value="">Select a team</option>

                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            {/* Estimated Time */}
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  <i className="bi bi-clock me-2" style={{ color: "#635BFF" }}></i>
                  Estimated Time (Days)
                </Form.Label>

                <Form.Control
                  type="number"
                  min="1"
                  value={form.timeToComplete}
                  onChange={(e) =>
                    updateField("timeToComplete", e.target.value)
                  }
                  required
                  disabled={loading}
                  className="rounded-3 py-2 shadow-none"
                  style={{ borderColor: "#E8E6F0" }}
                />
              </Form.Group>
            </div>

            {/* Owners */}
            {/* <div className="col-12">
              <Form.Label className="fw-semibold small">
                <i className="bi bi-person-check me-2" style={{ color: "#635BFF" }}></i>
                Assign Owners <span className="text-danger">*</span>
              </Form.Label>

              <div className="border rounded-3 p-3" style={{ borderColor: "#E8E6F0" }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">
                    Select one or more team members
                  </small>
                  <span
                    className="badge rounded-pill"
                    style={{ backgroundColor: "#EFEDFF", color: "#4B43D4" }}
                  >
                    {form.owners.length} selected
                  </span>
                </div>

                <div
                  className="row g-2"
                  style={{ maxHeight: 180, overflowY: "auto" }}
                >
                  {users.length === 0 ? (
                    <div className="col-12 text-muted small px-3 py-2">
                      No users available
                    </div>
                  ) : (
                    users.map((user) => (
                      <div className="col-md-6" key={user._id}>
                        <div
                          className="form-check rounded-3 p-2 ps-5"
                          style={{
                            backgroundColor: form.owners.includes(user._id)
                              ? "#EFEDFF"
                              : "#F7F5EF",
                          }}
                        >
                          <Form.Check
                            type="checkbox"
                            id={`owner-${user._id}`}
                            label={
                              <span>
                                <span className="d-block fw-semibold small">
                                  {user.name || user.email || "Unnamed user"}
                                </span>
                                {user.name && user.email && (
                                  <span className="text-muted" style={{ fontSize: "0.72rem" }}>
                                    {user.email}
                                  </span>
                                )}
                              </span>
                            }
                            checked={form.owners.includes(user._id)}
                            onChange={() => handleOwnerChange(user._id)}
                            disabled={loading}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {form.owners.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {form.owners.map((ownerId) => {
                      const owner = users.find((user) => user._id === ownerId);

                      if (!owner) return null;

                      return (
                        <span
                          key={ownerId}
                          className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center"
                          style={{
                            backgroundColor: "#EFEDFF",
                            color: "#4B43D4",
                          }}
                        >
                          {owner.name || owner.email || "Unnamed user"}

                          <button
                            type="button"
                            className="btn p-0 ms-2 lh-1"
                            style={{ color: "#4B43D4" }}
                            onClick={() => handleOwnerChange(ownerId)}
                            disabled={loading}
                            aria-label={`Remove ${owner.name || owner.email}`}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div> */}

<div className="col-12">
  <Form.Label className="fw-semibold small">
    <i
      className="bi bi-person-check me-2"
      style={{ color: "#635BFF" }}
    ></i>
    Assign Owners <span className="text-danger">*</span>
  </Form.Label>

  <div
    className="border rounded-3 p-3"
    style={{ borderColor: "#E8E6F0" }}
  >
    <div className="d-flex justify-content-between align-items-center mb-3">
      <small className="text-muted">
        Select one or more team members
      </small>

      <span
        className="badge rounded-pill"
        style={{
          backgroundColor: "#EFEDFF",
          color: "#4B43D4",
        }}
      >
        {form.owners.length} selected
      </span>
    </div>

    {/* Search Owners */}
    <div className="input-group mb-3">
      <span
        className="input-group-text border-end-0 bg-white"
        style={{ borderColor: "#E8E6F0" }}
      >
        <i className="bi bi-search text-muted"></i>
      </span>

      <Form.Control
        type="text"
        placeholder="Search by name or email..."
        value={ownerSearch}
        onChange={(e) => setOwnerSearch(e.target.value)}
        disabled={loading}
        className="border-start-0 shadow-none"
        style={{ borderColor: "#E8E6F0" }}
      />

      {ownerSearch && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setOwnerSearch("")}
          disabled={loading}
          aria-label="Clear search"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>

    {/* Owner List */}
    <div
      className="row g-2"
      style={{ maxHeight: 180, overflowY: "auto" }}
    >
      {users.length === 0 ? (
        <div className="col-12 text-muted small px-3 py-2">
          No users available
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="col-12 text-center text-muted small py-3">
          <i className="bi bi-search d-block fs-4 mb-2"></i>
          No users found matching "{ownerSearch}"
        </div>
      ) : (
        filteredUsers.map((user) => (
          <div className="col-md-6" key={user._id}>
            <div
              className="form-check rounded-3 p-2 ps-5"
              style={{
                backgroundColor: form.owners.includes(user._id)
                  ? "#EFEDFF"
                  : "#F7F5EF",
              }}
            >
              <Form.Check
                type="checkbox"
                id={`owner-${user._id}`}
                label={
                  <span>
                    <span className="d-block fw-semibold small">
                      {user.name || user.email || "Unnamed user"}
                    </span>

                    {user.name && user.email && (
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.72rem" }}
                      >
                        {user.email}
                      </span>
                    )}
                  </span>
                }
                checked={form.owners.includes(user._id)}
                onChange={() => handleOwnerChange(user._id)}
                disabled={loading}
              />
            </div>
          </div>
        ))
      )}
    </div>

    {/* Selected Owners */}
    {form.owners.length > 0 && (
      <div className="mt-3 pt-3 border-top">
        <small className="text-muted d-block mb-2">
          Selected Owners
        </small>

        <div className="d-flex flex-wrap gap-2">
          {form.owners.map((ownerId) => {
            const owner = users.find(
              (user) => user._id === ownerId
            );

            if (!owner) return null;

            return (
              <span
                key={ownerId}
                className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center"
                style={{
                  backgroundColor: "#EFEDFF",
                  color: "#4B43D4",
                }}
              >
                {owner.name || owner.email || "Unnamed user"}

                <button
                  type="button"
                  className="btn p-0 ms-2 lh-1"
                  style={{ color: "#4B43D4" }}
                  onClick={() => handleOwnerChange(ownerId)}
                  disabled={loading}
                  aria-label={`Remove ${owner.name || owner.email}`}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </span>
            );
          })}
        </div>
      </div>
    )}
  </div>
</div>

            {/* Tags */}
            <div className="col-md-6">
              <Form.Label className="fw-semibold small">
                <i className="bi bi-tags me-2" style={{ color: "#635BFF" }}></i>
                Tags
              </Form.Label>

              <div className="border rounded-3 p-3" style={{ borderColor: "#E8E6F0" }}>
                <div className="input-group mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Add a custom tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addCustomTag();
                      }
                    }}
                    disabled={loading}
                    className="shadow-none"
                  />

                  <Button
                    type="button"
                    onClick={addCustomTag}
                    disabled={loading || !newTag.trim()}
                    style={{
                      backgroundColor: "#635BFF",
                      borderColor: "#635BFF",
                    }}
                  >
                    <i className="bi bi-plus-lg"></i>
                    <span className="ms-1">Add</span>
                  </Button>
                </div>

                <small className="text-muted d-block mb-2">
                  Choose existing tags
                </small>

                <div
                  className="d-flex flex-wrap gap-2"
                  style={{ maxHeight: 120, overflowY: "auto" }}
                >
                  {availableTags.length === 0 ? (
                    <span className="text-muted small">
                      No existing tags available
                    </span>
                  ) : (
                    availableTags.map((tag) => {
                      const selected = form.tags.includes(tag);

                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagChange(tag)}
                          disabled={loading}
                          className="btn btn-sm rounded-pill"
                          style={{
                            backgroundColor: selected ? "#635BFF" : "#F1F0F7",
                            color: selected ? "#FFFFFF" : "#555568",
                            border: "none",
                          }}
                        >
                          {selected && <i className="bi bi-check2 me-1"></i>}
                          {tag}
                        </button>
                      );
                    })
                  )}
                </div>

                {form.tags.length > 0 && (
                  <div className="mt-3 pt-2 border-top">
                    <small className="text-muted d-block mb-2">
                      Selected tags
                    </small>

                    <div className="d-flex flex-wrap gap-2">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge rounded-pill px-3 py-2"
                          style={{
                            backgroundColor: "#E7F5EE",
                            color: "#28734B",
                          }}
                        >
                          {tag}
                          <button
                            type="button"
                            className="btn p-0 ms-2 lh-1"
                            style={{ color: "#28734B" }}
                            onClick={() => handleTagChange(tag)}
                            disabled={loading}
                            aria-label={`Remove ${tag}`}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="fw-semibold small">
                  <i className="bi bi-calendar-event me-2" style={{ color: "#635BFF" }}></i>
                  Due Date
                </Form.Label>

                <Form.Control
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                  disabled={loading}
                  className="rounded-3 py-2 shadow-none"
                  style={{ borderColor: "#E8E6F0" }}
                />

                <Form.Text className="text-muted">
                  Set a deadline for this task.
                </Form.Text>
              </Form.Group>
            </div>
          </div>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer
          className="border-0 px-4 pb-4 pt-2"
          style={{ backgroundColor: "#FFFEFA" }}
        >
          <Button
            type="button"
            variant="light"
            onClick={handleModalClose}
            disabled={loading}
            className="rounded-pill px-4 fw-semibold"
            style={{
              backgroundColor: "#F1F0F7",
              color: "#555568",
              border: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading || dataLoading}
            className="rounded-pill px-4 fw-semibold border-0"
            style={{
              backgroundColor: "#635BFF",
              color: "#FFFFFF",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating...
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg me-2"></i>
                Create Task
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;


