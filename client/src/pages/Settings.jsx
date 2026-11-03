 
// import { useState,useEffect } from "react";
// import Layout from "../components/Layout";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";
// import { updateProfile, updatePassword } from "../services/settingsService";

// const Settings = () => {
//   const { state, dispatch } = useAuth();

//   const [profile, setProfile] = useState({
//     name: state.user?.name || "",
//     email: state.user?.email || "",
//   });
 


//   const [passwords, setPasswords] = useState({
//     current: "",
//     next: "",
//     confirm: "",
//   });

//   const saveProfile = async (e) => {
//     e.preventDefault();

//     try {
//       const updatedUser = await updateProfile(profile);

//       dispatch({
//         type: "LOAD_USER",
//         payload: updatedUser,
//       });

//       toast.success("Profile updated successfully");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to update profile");
//     }
//   };

//   const changePassword = async (e) => {
//     e.preventDefault();

//     if (passwords.next !== passwords.confirm) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     try {
//       await updatePassword({
//         currentPassword: passwords.current,
//         newPassword: passwords.next,
//       });

//       toast.success("Password updated successfully");

//       setPasswords({
//         current: "",
//         next: "",
//         confirm: "",
//       });
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to update password");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     dispatch({ type: "LOGOUT" });
//     window.location.href = "/login";
//   };
//    useEffect(() => {
//   if (state.user) {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setProfile({
//       name: state.user.name || "",
//       email: state.user.email || "",
//     });
//   }
// }, [state.user]);
// console.log("data: ",state);
//   return (
//     <Layout title="Settings">
//       <div className="row g-4">
//         <div className="col-12 col-lg-8">
//           <div className="content-card mb-4">
//             <div className="d-flex align-items-center gap-3 mb-4">
//               <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, fontSize: 24 }}>
//                 {profile.name.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <h5 className="fw-bold mb-1">{profile.name}</h5>
//                 <p className="text-muted mb-0">Administrator</p>
//               </div>
//             </div>

//             <h6 className="fw-bold mb-3">Profile Information</h6>

//             <form onSubmit={saveProfile}>
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={profile.name}
//                     onChange={(e) =>
//                       setProfile({ ...profile, name: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Email Address</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={profile.email}
//                     onChange={(e) =>
//                       setProfile({ ...profile, email: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//                <button type="submit" className="btn btn-primary rounded-pill px-4 mt-4" > Save Changes </button>
//             </form>
//           </div>

//           <div className="content-card">
//             <h6 className="fw-bold mb-3">Change Password</h6>

//             <form onSubmit={changePassword}>
//               <div className="mb-3">
//                 <label className="form-label">Current Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={passwords.current}
//                   onChange={(e) =>
//                     setPasswords({ ...passwords, current: e.target.value })
//                   }
//                 />
//               </div>

//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">New Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     value={passwords.next}
//                     onChange={(e) =>
//                       setPasswords({ ...passwords, next: e.target.value })
//                     }
//                   />
//                 </div>

//                 <div className="col-md-6">
//                   <label className="form-label">Confirm Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     value={passwords.confirm}
//                     onChange={(e) =>
//                       setPasswords({ ...passwords, confirm: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>

//                <button type="submit" className="btn btn-outline-primary rounded-pill px-4 mt-4" > Update Password </button> 
//             </form>
//           </div>
//         </div>

//         <div className="col-12 col-lg-4">
//           <div className="content-card mb-4">
//             <h6 className="fw-bold mb-3">Application</h6>

//             <div className="d-flex justify-content-between py-2 border-bottom">
//               <span>Version</span>
//               <span className="text-muted">1.0.0</span>
//             </div>

//             <div className="d-flex justify-content-between py-2 border-bottom">
//               <span>Environment</span>
//               <span className="text-muted">Development</span>
//             </div>

//             <div className="d-flex justify-content-between py-2">
//               <span>API URL</span>
//               <span className="text-muted small text-break text-end ms-3">
//                 {import.meta.env.VITE_API_URL}
//               </span>
//             </div>
//           </div>

//           <div className="content-card mb-4">
//             <h6 className="fw-bold mb-3">Appearance</h6>

//             <div className="form-check form-switch mb-3">
//               <input className="form-check-input" type="checkbox" disabled />
//               <label className="form-check-label text-muted">
//                 Dark Mode (coming soon)
//               </label>
//             </div>

//             <button className="btn btn-light w-100 rounded-pill" disabled>
//               Customize Theme
//             </button>
//           </div>

//           <div className="content-card border border-danger-subtle">
//             <h6 className="fw-bold text-danger mb-2">Danger Zone</h6>
//             <p className="text-muted small mb-3">
//               Sign out from this device.
//             </p>

//             <button
//               className="btn btn-danger w-100 rounded-pill"
//               onClick={handleLogout}
//             >
//               <i className="bi bi-box-arrow-right me-2"></i>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Settings;
// --------------------------------------------------------------

import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  updateProfile,
  updatePassword,
} from "../services/settingsService";
import "../styles/settings.css";

const Settings = () => {
  const { state, dispatch } = useAuth();

  const user = state?.user;

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const initials = profile.name
    ? profile.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await updateProfile(profile);

      dispatch({
        type: "LOAD_USER",
        payload: updatedUser,
      });

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (passwords.next !== passwords.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });

      toast.success("Password updated successfully");

      setPasswords({
        current: "",
        next: "",
        confirm: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update password"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    window.location.href = "/login";
  };

  return (
    <Layout
      title="Settings"
      subtitle="Manage your account and workspace preferences"
    >
      <div className="settings-page">

        {/* Welcome section */}
        <section className="settings-welcome mb-4">
          <div>
            <div className="settings-eyebrow">
              <i className="bi bi-sliders me-2"></i>
              ACCOUNT PREFERENCES
            </div>

            <h2>Settings & Profile</h2>

            <p>
              Manage your personal information, security, and application
              preferences.
            </p>
          </div>

          <div className="settings-welcome-icon">
            <i className="bi bi-gear-wide-connected"></i>
          </div>
        </section>

        <div className="row g-4">

          {/* Main settings */}
          <div className="col-12 col-lg-8">

            {/* Profile information */}
            <section className="settings-card mb-4">

              <div className="settings-card-heading">
                <div className="settings-heading-icon">
                  <i className="bi bi-person"></i>
                </div>

                <div>
                  <h5>Profile Information</h5>
                  <p>Update your personal account details.</p>
                </div>
              </div>

              <div className="settings-profile-summary">
                <div className="settings-avatar">
                  {initials}
                </div>

                <div>
                  <h6>{profile.name || "Your Name"}</h6>
                  <p>{profile.email || "Your email address"}</p>

                  <span className="settings-role">
                    <i className="bi bi-shield-check me-1"></i>
                    {user?.role || "Workspace Member"}
                  </span>
                </div>
              </div>

              <div className="settings-divider"></div>

              <form onSubmit={saveProfile}>
                <div className="row g-3">

                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Full Name
                    </label>

                    <div className="settings-input-wrapper">
                      <i className="bi bi-person"></i>

                      <input
                        type="text"
                        className="form-control settings-input"
                        placeholder="Enter your full name"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Email Address
                    </label>

                    <div className="settings-input-wrapper">
                      <i className="bi bi-envelope"></i>

                      <input
                        type="email"
                        className="form-control settings-input"
                        placeholder="Enter your email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="settings-form-footer">
                  <button
                    type="submit"
                    className="settings-primary-btn"
                  >
                    <i className="bi bi-check2 me-2"></i>
                    Save Changes
                  </button>
                </div>
              </form>
            </section>

            {/* Change password */}
            <section className="settings-card">

              <div className="settings-card-heading">
                <div className="settings-heading-icon settings-security-icon">
                  <i className="bi bi-shield-lock"></i>
                </div>

                <div>
                  <h5>Change Password</h5>
                  <p>Keep your account secure with a strong password.</p>
                </div>
              </div>

              <form onSubmit={changePassword}>

                <div className="mb-3">
                  <label className="form-label">
                    Current Password
                  </label>

                  <div className="settings-input-wrapper">
                    <i className="bi bi-lock"></i>

                    <input
                      type="password"
                      className="form-control settings-input"
                      placeholder="Enter current password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({
                          ...passwords,
                          current: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="row g-3">

                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      New Password
                    </label>

                    <div className="settings-input-wrapper">
                      <i className="bi bi-key"></i>

                      <input
                        type="password"
                        className="form-control settings-input"
                        placeholder="Enter new password"
                        value={passwords.next}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            next: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Confirm Password
                    </label>

                    <div className="settings-input-wrapper">
                      <i className="bi bi-key-fill"></i>

                      <input
                        type="password"
                        className="form-control settings-input"
                        placeholder="Confirm new password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({
                            ...passwords,
                            confirm: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="settings-form-footer">
                  <button
                    type="submit"
                    className="settings-secondary-btn"
                  >
                    <i className="bi bi-shield-check me-2"></i>
                    Update Password
                  </button>
                </div>

              </form>
            </section>
          </div>

          {/* Right-side settings */}
          <div className="col-12 col-lg-4">

            {/* Application information */}
            <section className="settings-card mb-4">

              <div className="settings-card-heading">
                <div className="settings-heading-icon">
                  <i className="bi bi-window-stack"></i>
                </div>

                <div>
                  <h5>Application</h5>
                  <p>Application information.</p>
                </div>
              </div>

              <div className="settings-info-row">
                <span>Version</span>
                <strong>1.0.0</strong>
              </div>

              <div className="settings-info-row">
                <span>Environment</span>
                <strong>Development</strong>
              </div>

              <div className="settings-info-row settings-api-row">
                <span>API URL</span>

                <strong>
                  {import.meta.env.VITE_API_URL || "Not configured"}
                </strong>
              </div>
            </section>

            {/* Appearance */}
            <section className="settings-card mb-4">

              <div className="settings-card-heading">
                <div className="settings-heading-icon">
                  <i className="bi bi-palette"></i>
                </div>

                <div>
                  <h5>Appearance</h5>
                  <p>Personalize your experience.</p>
                </div>
              </div>

              <div className="settings-coming-soon">
                <div className="settings-theme-preview">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div>
                  <strong>Dark Mode</strong>
                  <p>Coming soon</p>
                </div>

                <span className="settings-disabled-badge">
                  Soon
                </span>
              </div>

              <button
                type="button"
                className="settings-theme-btn"
                disabled
              >
                <i className="bi bi-brush me-2"></i>
                Customize Theme
              </button>
            </section>

            {/* Danger zone */}
            <section className="settings-danger-card">

              <div className="settings-danger-heading">
                <div className="settings-danger-icon">
                  <i className="bi bi-exclamation-triangle"></i>
                </div>

                <h5>Danger Zone</h5>
              </div>

              <p>
                Sign out from your account on this device.
              </p>

              <button
                type="button"
                className="settings-logout-btn"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
