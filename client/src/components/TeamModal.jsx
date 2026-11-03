// import { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import api from "../services/api";
// import toast from "react-hot-toast";

// const TeamModal = ({ show, handleClose, team, onSaved }) => {
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (team) {
//       // eslint-disable-next-line react-hooks/set-state-in-effect
//       setForm({
//         name: team.name || "",
//         description: team.description || "",
//       });
//     } else {
//       setForm({ name: "", description: "" });
//     }
//   }, [team, show]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name.trim()) {
//       toast.error("Team name is required");
//       return;
//     }

//     try {
//       setLoading(true);

//       let data;

//       if (team) {
//         const res = await api.put(`/teams/${team._id}`, form);
//         data = res.data;
//         toast.success("Team updated");
//       } else {
//         const res = await api.post("/teams", form);
//         data = res.data;
//         toast.success("Team created");
//       }

//       onSaved(data, !!team);
//       handleClose();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>{team ? "Edit Team" : "Create Team"}</Modal.Title>
//       </Modal.Header>

//       <Form onSubmit={handleSubmit}>
//         <Modal.Body>
//           <Form.Group className="mb-3">
//             <Form.Label>Team Name</Form.Label>
//             <Form.Control
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               placeholder="Frontend Team"
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={4}
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               placeholder="What does this team work on?"
//             />
//           </Form.Group>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={loading}>
//             {loading ? "Saving..." : team ? "Update Team" : "Create Team"}
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// export default TeamModal;

// -------------------------------------------------------

import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";
import toast from "react-hot-toast";

const TeamModal = ({ show, handleClose, team, onSaved }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (team) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: team.name || "",
        description: team.description || "",
      });
    } else {
      setForm({ name: "", description: "" });
    }
  }, [team, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Team name is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
      };

      let data;

      if (team) {
        const res = await api.put(`/teams/${team._id}`, payload);
        data = res.data;
        toast.success("Team updated successfully");
      } else {
        const res = await api.post("/teams", payload);
        data = res.data;
        toast.success("Team created successfully");
      }

      onSaved(data, !!team);
      handleClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Operation failed"
      );
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
      contentClassName="border-0 rounded-4 overflow-hidden"
      backdrop={loading ? "static" : true}
      keyboard={!loading}
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
            <i
              className={`bi ${team ? "bi-people-fill" : "bi-people"} fs-4`}
            ></i>
          </div>

          <Modal.Title
            className="fw-bold"
            style={{
              color: "#151A2D",
              fontSize: "1.35rem",
              letterSpacing: "-0.4px",
            }}
          >
            {team ? "Edit Team" : "Create New Team"}
          </Modal.Title>

          <p className="text-muted small mb-0 mt-1">
            {team
              ? "Update your team's information."
              : "Create a team to organize your workspace and collaboration."}
          </p>
        </div>
      </Modal.Header>

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        <Modal.Body
          className="px-4 py-4"
          style={{ backgroundColor: "#FFFEFA" }}
        >
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold small">
              Team Name <span className="text-danger">*</span>
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="e.g. Frontend Team"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              maxLength={100}
              required
              disabled={loading}
              className="rounded-3 py-2 shadow-none"
              style={{
                borderColor: "#E8E6F0",
                backgroundColor: "#FFFFFF",
                fontSize: "0.92rem",
              }}
            />

            <Form.Text className="text-muted">
              Choose a clear name for your team.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label className="fw-semibold small">
              Description
              <span className="text-muted fw-normal ms-1">
                (Optional)
              </span>
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              placeholder="What does this team work on?"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              maxLength={500}
              disabled={loading}
              className="rounded-3 py-2 shadow-none"
              style={{
                borderColor: "#E8E6F0",
                backgroundColor: "#FFFFFF",
                resize: "vertical",
                fontSize: "0.92rem",
              }}
            />

            <div className="text-end mt-1">
              <small className="text-muted">
                {form.description.length}/500
              </small>
            </div>
          </Form.Group>
        </Modal.Body>

        {/* Footer */}
        <Modal.Footer
          className="border-0 px-4 pb-4 pt-2"
          style={{ backgroundColor: "#FFFEFA" }}
        >
          <Button
            type="button"
            onClick={handleModalClose}
            disabled={loading}
            className="rounded-pill px-4 fw-semibold"
            style={{
              backgroundColor: "#F1F0F7",
              color: "#555568",
              border: "1px solid #E8E6F0",
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={loading}
            className="rounded-pill px-4 fw-semibold border-0"
            style={{
              backgroundColor: "#635BFF",
              color: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(99, 91, 255, 0.20)",
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              <>
                <i
                  className={`bi ${team ? "bi-check-lg" : "bi-plus-lg"} me-2`}
                ></i>
                {team ? "Update Team" : "Create Team"}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TeamModal;

