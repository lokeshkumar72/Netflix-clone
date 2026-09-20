import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/movieflix_logo.svg";
import mail_logo from "../../assets/mail_logo.svg";
import { login, signup, resetPassword, signInWithGoogle } from "../../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();

    if (!email || !password || (signState === "Sign Up" && !name)) {
      return;
    }

    setLoading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchAuth = () => {
    setSignState(
      signState === "Sign In" ? "Sign Up" : "Sign In"
    );

    setName("");
    setEmail("");
    setPassword("");
  };

  return loading ? (
    <div className="login-spinner">
      <div className="spinner"></div>
    </div>
  ) : (
    <div className="login">
      <img
        src={logo}
        className="login-logo"
         alt="MovieFlix"
      />

      <div className="login-form">
        <h1>{signState}</h1>

        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              autoComplete="name"
              required
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />

           <div className="password-container">
             <input
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               type={showPassword ? "text" : "password"}
               placeholder="Password"
               autoComplete={
                 signState === "Sign Up"
                   ? "new-password"
                   : "current-password"
               }
               required
             />
             <label className="show-password-toggle">
               <input
                 type="checkbox"
                 checked={showPassword}
                 onChange={(e) => setShowPassword(e.target.checked)}
                 aria-label="Toggle password visibility"
               />
               <span className="checkmark"></span>
               Show password
             </label>
           </div>

          <button type="submit">
            {signState}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          {signState === "Sign Up" && (
            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignUp}
            >
            <img
              src={mail_logo}
              alt="Mail"
              className="google-icon"
            />
            Continue with Email
            </button>
          )}

          {signState === "Sign Up" && (
            <p className="google-signin-note">
              Or sign up with your email above
            </p>
          )}

          <div className="form-help">
            <div className="remember">
              <input
                type="checkbox"
                id="remember"
              />
              <label htmlFor="remember">
                Remember Me
              </label>
            </div>

            {signState === "Sign In" && (
              <p
                className="forgot-password"
                onClick={async () => {
                  if (!email) return toast.error("Please enter your email first.");
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
              <span onClick={switchAuth}>
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={switchAuth}>
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;