// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Login = () => {
//   const navigate = useNavigate();
//   const { dispatch } = useAuth();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = await loginUser(form);

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

//       toast.success("Login successful");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
//       <div className="card border-0 shadow-sm rounded-4" style={{ width: "100%", maxWidth: 420 }}>
//         <div className="card-body p-4 p-md-5">
//           <div className="text-center mb-4">
//             <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 64, height: 64, fontSize: 24 }}>
//               W
//             </div>
//             <h3 className="fw-bold mb-1">Welcome back</h3>
//             <p className="text-muted mb-0">Sign in to continue to Workasana</p>
//           </div>

//           <form onSubmit={handleSubmit}>
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
//                 placeholder="••••••••"
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
//               {loading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>

//           <p className="text-center text-muted mt-4 mb-0">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-decoration-none fw-semibold">
//               Create one
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// -----------------------------------------------

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Login = ({ isModal = false }) => {
//   const navigate = useNavigate();
//   const { dispatch } = useAuth();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const data = await loginUser(form);

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

//       toast.success("Login successful");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formContent = (
//     <>
//       <div className="text-center mb-4">
//         <div className="auth-form-icon">
//           <i className="bi bi-person-check"></i>
//         </div>
//         <span className="section-kicker">WELCOME BACK</span>
//         <h3 className="auth-form-title">Sign in to Workasana</h3>
//         <p className="auth-form-description">
//           Continue managing your projects and team.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit}>
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
//             placeholder="Enter your password"
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
//           {loading ? "Signing in..." : "Sign In"}
//           {!loading && <i className="bi bi-arrow-right"></i>}
//         </button>
//       </form>

//       <p className="auth-form-switch">
//         Don't have an account?{" "}
//         <Link to="/signup">Create one</Link>
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
//         style={{ width: "100%", maxWidth: 420 }}
//       >
//         <div className="card-body p-4 p-md-5">
//           {formContent}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
// -----------------------------------------------------------------------

// new

import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = ({ isModal = false }) => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Validate email format and require .com
  const validateEmail = (value) => {
    const emailRegex =
      /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+com$/i;

    return emailRegex.test(value.trim());
  };

  const handleEmailChange = (e) => {
    e.target.setCustomValidity("");

    setForm((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setForm((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  // Handle Enter key for Email field
  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const emailInput = e.currentTarget;

      if (!emailInput.value.trim()) {
        emailInput.reportValidity();
        return;
      }

      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      if (!validateEmail(emailInput.value)) {
        emailInput.setCustomValidity(
          "Please enter a valid email address ending with .com"
        );

        emailInput.reportValidity();
        return;
      }

      emailInput.setCustomValidity("");
      passwordRef.current?.focus();
    }
  };

  // Handle Enter key for Password field
  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!e.currentTarget.checkValidity()) {
        e.currentTarget.reportValidity();
        return;
      }

      e.currentTarget.form.requestSubmit();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailInput = emailRef.current;

    if (!validateEmail(form.email)) {
      emailInput.setCustomValidity(
        "Please enter a valid email address ending with .com"
      );

      emailInput.reportValidity();
      return;
    }

    emailInput.setCustomValidity("");

    try {
      setLoading(true);

      const data = await loginUser({
        ...form,
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

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <>
      <div className="text-center mb-4">
        <div className="auth-form-icon">
          <i className="bi bi-person-check"></i>
        </div>

        <span className="section-kicker">WELCOME BACK</span>

        <h3 className="auth-form-title">
          Sign in to Workasana
        </h3>

        <p className="auth-form-description">
          Continue managing your projects and team.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Email Field */}
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
            onKeyDown={handleEmailKeyDown}
            required
            pattern=".+@.+\.com"
            title="Please enter a valid email address ending with .com"
          />
        </div>

        {/* Password Field */}
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handlePasswordChange}
              onKeyDown={handlePasswordKeyDown}
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

        {/* Login Button */}
        <button
          type="submit"
          className="btn-primary-custom auth-submit-btn"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}

          {!loading && <i className="bi bi-arrow-right"></i>}
        </button>

      </form>

      <p className="auth-form-switch">
        Don't have an account?{" "}
        <Link to="/signup">Create one</Link>
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
        style={{ width: "100%", maxWidth: 420 }}
      >
        <div className="card-body p-4 p-md-5">
          {formContent}
        </div>
      </div>
    </div>
  );
};

export default Login;
