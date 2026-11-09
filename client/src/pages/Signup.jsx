// import { useState  } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Signup = () => {
//   const navigate = useNavigate();
//   const { dispatch } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = await registerUser(form);

//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: {
//     user: {
//       _id: data._id,
//       name: data.name,
//       email: data.email,
//     },
//     token: data.token,
//   },
//       });

//       toast.success("Account created successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
//       <div className="card border-0 shadow-sm rounded-4" style={{ width: "100%", maxWidth: 460 }}>
//         <div className="card-body p-4 p-md-5">
//           <div className="text-center mb-4">
//             <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 64, height: 64, fontSize: 24 }}>
//               W
//             </div>
//             <h3 className="fw-bold mb-1">Create account</h3>
//             <p className="text-muted mb-0">Start managing your projects with Workasana</p>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Full Name</label>
//               <input
//                 type="text"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="Sunny Raj"
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({ ...form, name: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="you@example.com"
//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({ ...form, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control form-control-lg rounded-3"
//                 placeholder="Minimum 6 characters"
//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({ ...form, password: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <button
//               className="btn btn-primary btn-lg w-100 rounded-3"
//               disabled={loading}
//             >
//               {loading ? "Creating account..." : "Create Account"}
//             </button>
//           </form>

//           <p className="text-center text-muted mt-4 mb-0">
//             Already have an account?{" "}
//             <Link to="/login" className="text-decoration-none fw-semibold">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
// ----------------------------------------------------
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Signup = ({ isModal = false }) => {
//   const navigate = useNavigate();
//   const { dispatch } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = await registerUser(form);

//       dispatch({
//         type: "LOGIN_SUCCESS",
//         payload: {
//           user: {
//             _id: data._id,
//             name: data.name,
//             email: data.email,
//           },
//           token: data.token,
//         },
//       });

//       toast.success("Account created successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formContent = (
//     <>
//       <div className="text-center mb-4">
//         <div className="auth-form-icon">
//           <i className="bi bi-person-plus"></i>
//         </div>
//         <span className="section-kicker">JOIN WORKASANA</span>
//         <h3 className="auth-form-title">Create your account</h3>
//         <p className="auth-form-description">
//           Set up your account and start organizing your work.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Full name</label>
//           <input
//             type="text"
//             className="form-control form-control-lg rounded-3"
//             placeholder="Your full name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email address</label>
//           <input
//             type="email"
//             className="form-control form-control-lg rounded-3"
//             placeholder="you@example.com"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control form-control-lg rounded-3"
//             placeholder="Minimum 6 characters"
//             value={form.password}
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="btn-primary-custom auth-submit-btn"
//           disabled={loading}
//         >
//           {loading ? "Creating account..." : "Create Account"}
//           {!loading && <i className="bi bi-arrow-right"></i>}
//         </button>
//       </form>

//       <p className="auth-form-switch">
//         Already have an account?{" "}
//         <Link to="/login">Sign in</Link>
//       </p>
//     </>
//   );

//   if (isModal) {
//     return <div className="auth-form-content">{formContent}</div>;
//   }

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
//       <div
//         className="card border-0 shadow-sm rounded-4"
//         style={{ width: "100%", maxWidth: 460 }}
//       >
//         <div className="card-body p-4 p-md-5">
//           {formContent}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// ----------------------------------------------------------------------------------------



import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Signup = ({ isModal = false }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex =
      /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+com$/i;

    return emailRegex.test(email.trim());
  };

  const handleEmailChange = (e) => {
    emailRef.current.setCustomValidity("");

    setForm({
      ...form,
      email: e.target.value,
    });
  };

  const handleEmailValidation = () => {
    const emailInput = emailRef.current;

    if (!emailInput) return false;

    if (!emailInput.value.trim()) {
      emailInput.setCustomValidity("Email address is required.");
    } else if (!validateEmail(emailInput.value)) {
      emailInput.setCustomValidity(
        "Please enter a valid email address ending with .com."
      );
    } else {
      emailInput.setCustomValidity("");
    }

    return emailInput.reportValidity();
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (e.currentTarget.reportValidity()) {
        nextRef?.current?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleEmailValidation()) {
      return;
    }

    if (!formRef.current.reportValidity()) {
      return;
    }

    try {
      setLoading(true);

      const data = await registerUser({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
      });

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
          },
          token: data.token,
        },
      });

      toast.success("Account created successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <>
      <div className="text-center mb-4">
        <div className="auth-form-icon">
          <i className="bi bi-person-plus"></i>
        </div>
        <span className="section-kicker">JOIN WORKASANA</span>
        <h3 className="auth-form-title">Create your account</h3>
        <p className="auth-form-description">
          Set up your account and start organizing your work.
        </p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Full name <span className="text-danger">*</span>
          </label>

          <input
            ref={nameRef}
            type="text"
            name="name"
            className="form-control form-control-lg rounded-3"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            required
            minLength={2}
            pattern=".*\S.*"
            title="Please enter your full name (at least 2 characters)."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email address <span className="text-danger">*</span>
          </label>

          <input
            ref={emailRef}
            type="email"
            name="email"
            className="form-control form-control-lg rounded-3"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleEmailChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                if (handleEmailValidation()) {
                  passwordRef.current?.focus();
                }
              }
            }}
            required
            pattern=".+@.+\.com"
            title="Please enter a valid email address ending with .com."
          />
        </div>

        <div className="mb-4">
          <label className="form-label">
            Password <span className="text-danger">*</span>
          </label>

          <div className="input-group">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control form-control-lg rounded-start-3"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
              required
              minLength={6}
              title="Password must contain at least 6 characters."
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i
                className={`bi ${
                  showPassword ? "bi-eye-slash" : "bi-eye"
                }`}
              ></i>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary-custom auth-submit-btn"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
          {!loading && <i className="bi bi-arrow-right"></i>}
        </button>
      </form>

      <p className="auth-form-switch">
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </p>
    </>
  );

  if (isModal) {
    return <div className="auth-form-content">{formContent}</div>;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <div
        className="card border-0 shadow-sm rounded-4"
        style={{ width: "100%", maxWidth: 460 }}
      >
        <div className="card-body p-4 p-md-5">
          {formContent}
        </div>
      </div>
    </div>
  );
};

export default Signup;
