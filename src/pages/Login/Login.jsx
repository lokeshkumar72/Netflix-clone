import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { login, signup } from "../../firebase";
import netflix_spinner from "../../assets/netflix_spinner.gif";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <img src={netflix_spinner} alt="Loading" />
    </div>
  ) : (
    <div className="login">
      <img
        src={logo}
        className="login-logo"
        alt="Netflix"
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

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete={
              signState === "Sign Up"
                ? "new-password"
                : "current-password"
            }
            required
          />

          <button type="submit">
            {signState}
          </button>

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

            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?
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