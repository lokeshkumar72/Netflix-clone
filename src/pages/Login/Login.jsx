import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../assets/movieflix_logo.svg";
import mail_logo from "../../assets/mail_logo.svg";
import { login, signup, resetPassword } from "../../firebase";
import { toast } from "react-toastify";

const REMEMBERED_LOGIN_KEY = "movieflix_remembered_login";

const readRememberedLogin = () => {
  try {
    const raw = localStorage.getItem(REMEMBERED_LOGIN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.email) return null;
    return {
      email: String(parsed.email),
      password: String(parsed.password || ""),
    };
  } catch {
    return null;
  }
};

const saveRememberedLogin = (email, password) => {
  localStorage.setItem(
    REMEMBERED_LOGIN_KEY,
    JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  );
};

const clearRememberedLogin = () => {
  localStorage.removeItem(REMEMBERED_LOGIN_KEY);
};

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const remembered = readRememberedLogin();
    if (!remembered) return;
    setEmail(remembered.email);
    setPassword(remembered.password);
    setRememberMe(true);
  }, []);

  const persistLoginDetails = () => {
    if (rememberMe) {
      saveRememberedLogin(email, password);
    } else {
      clearRememberedLogin();
    }
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const user_auth = async (event) => {
    event.preventDefault();

    if (!email || !password || (signState === "Sign Up" && !name)) {
      return;
    }

    setLoading(true);

    try {
      persistLoginDetails();
      if (signState === "Sign In") {
        await login(email, password, rememberMe);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchAuth = () => {
    setSignState(
      signState === "Sign In" ? "Sign Up" : "Sign In"
    );

    setName("");
  };

  const handleGmailSignUp = () => {
    const gmailUser = email.split("@")[0] || "";
    const subject = encodeURIComponent("MovieFlix Account Signup");
    const body = `Hi MovieFlix team,\n\nI'd like to request access to the MovieFlix service.\n\nBest regards,\n${gmailUser || "User"}`;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=support@movieflix.com&su=${subject}&body=${encodeURIComponent(body)}`,
      "_blank"
    );
  };

  return loading ? (
    <div className="login-spinner">
      <div className="spinner"></div>
    </div>
  ) : (
    <div className="login-container">
      <div className="login-bg">
        <h2>Welcome to MovieFlix</h2>
        <div className="login-bg-accent" aria-hidden="true"></div>
        <p>Sign in to continue watching your favorite movies and shows</p>
      </div>

      <div className="login-wrapper">
        <img
          src={logo}
          className="login-logo"
          alt="MovieFlix"
        />

        <div className="login-form-container">
          <h1 className="login-title">{signState}</h1>

          <form onSubmit={user_auth} className="login-form">
            {signState === "Sign Up" && (
              <div className="input-group">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder=" "
                  autoComplete="name"
                  id="name"
                  required
                />
                <label htmlFor="name">Full Name</label>
              </div>
            )}

            <div className="input-group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder=" "
                autoComplete="email"
                id="email"
                required
              />
              <label htmlFor="email">Email Address</label>
            </div>

            <div className="input-group password-input-group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder=" "
                autoComplete={
                  signState === "Sign Up"
                    ? "new-password"
                    : "current-password"
                }
                id="password"
                required
              />
              <label htmlFor="password">Password</label>
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="3" y1="21" x2="21" y2="3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <button type="submit" className="login-submit-btn">
              {signState}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            {signState === "Sign Up" && (
              <button
                type="button"
                className="gmail-btn"
                onClick={handleGmailSignUp}
              >
                <img
                  src={mail_logo}
                  alt="Gmail"
                  className="gmail-icon"
                />
                Continue with Gmail
              </button>
            )}

            <div className="form-help">
              <div className="remember">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setRememberMe(checked);
                    if (!checked) {
                      clearRememberedLogin();
                    }
                  }}
                />
                <label htmlFor="remember">
                  Remember Me
                </label>
              </div>

              {signState === "Sign In" && (
                <p
                  className="forgot-password"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.currentTarget.click();
                    }
                  }}
                  onClick={async () => {
                    if (!email) return toast.error("Please enter your email first.");
                    if (!isValidEmail(email)) return toast.error("Please enter a valid email address.");
                    try {
                      await resetPassword(email);
                    } catch {
                      // error handled in firebase.js
                    }
                  }}
                >
                  Forgot Password?
                </p>
              )}
            </div>
          </form>

          <div className="form-switch">
            {signState === "Sign In" ? (
              <p>
                New to MovieFlix?
                <span
                  role="button"
                  tabIndex={0}
                  onClick={switchAuth}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      switchAuth();
                    }
                  }}
                >
                  Sign Up Now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span
                  role="button"
                  tabIndex={0}
                  onClick={switchAuth}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      switchAuth();
                    }
                  }}
                >
                  Sign In Now
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
