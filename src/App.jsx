
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase user:", currentUser);

      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        Loading MovieFlix...
      </div>
    );
  }

  return (
    <>
      <ToastContainer theme="dark" />

      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login />
          }
        />

        <Route
          path="/"
          element={
            user ? <Home /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/player/:id"
          element={
            user ? <Player /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={user ? "/" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
