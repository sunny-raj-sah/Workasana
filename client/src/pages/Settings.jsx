 
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  updateProfile,
  updatePassword,
} from "../services/settingsService";
import "../styles/settings.css";
// import { useTheme } from "../context/ThemeContext";


const Settings = () => {
  const { state, dispatch } = useAuth();
// const { theme, toggleTheme } = useTheme();

  const user = state?.user;

//   const [theme, setTheme] = useState(
//   () => localStorage.getItem("theme") || "light"
// );

// useEffect(() => {
//   document.documentElement.setAttribute("data-theme", theme);
//   localStorage.setItem("theme", theme);
// }, [theme]);

// const toggleTheme = () => {
//   setTheme((prev) => (prev === "light" ? "dark" : "light"));
// };

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

              {/* <div className="settings-info-row settings-api-row">
                <span>API URL</span>

                <strong>
                  {import.meta.env.VITE_API_URL || "Not configured"}
                </strong>
              </div> */}
            </section>
  

            {/* Appearance */}
{/* <section className="settings-card mb-4">
  <div className="settings-card-heading">
    <div className="settings-heading-icon">
      <i className="bi bi-palette"></i>
    </div>

    <div>
      <h5>Appearance</h5>
      <p>Personalize your application theme.</p>
    </div>
  </div>

  <div className="settings-theme-option">
    <div className="settings-theme-option-info">
      <div className="settings-theme-icon">
        <i
          className={`bi ${
            theme === "dark" ? "bi-moon-stars" : "bi-sun"
          }`}
        ></i>
      </div>

      <div>
        <strong>
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </strong>
        <p>
          {theme === "dark"
            ? "Dark appearance is enabled."
            : "Light appearance is enabled."}
        </p>
      </div>
    </div>

    <div className="settings-form-footer">
  <div className="settings-form-footer">
  <button
    type="button"
    className="settings-secondary-btn"
    onClick={toggleTheme}
    aria-pressed={theme === "dark"}
  >
    <i
      className={`bi ${
        theme === "dark" ? "bi-sun" : "bi-moon-stars"
      } me-2`}
    ></i>

    {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
  </button>
</div>
</div>
  </div>
</section> */}

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
