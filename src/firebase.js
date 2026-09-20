import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up
const signup = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password,
    );

    const user = userCredential.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      authProvider: "email/password",
      createdAt: new Date().toISOString(),
    });

    toast.success("Account created successfully!");

    return user;
  } catch (error) {
    console.error("Signup error:", error);

    let message = "Unable to create account.";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already registered.";
        break;

      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;

      case "auth/weak-password":
        message = "Password should be at least 6 characters.";
        break;

      case "auth/network-request-failed":
        message = "Network error. Please check your internet connection.";
        break;

      default:
        message = "Signup failed. Please try again.";
    }

    toast.error(message);
    throw error;
  }
};

// Login
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password,
    );

    toast.success("Login successful!");

    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);

    let message = "Unable to sign in.";

    switch (error.code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        message = "Invalid email or password.";
        break;

      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;

      case "auth/user-disabled":
        message = "This account has been disabled.";
        break;

      case "auth/too-many-requests":
        message = "Too many attempts. Please try again later.";
        break;

      case "auth/network-request-failed":
        message = "Network error. Please check your internet connection.";
        break;

      default:
        message = "Login failed. Please try again.";
    }

    toast.error(message);
    throw error;
  }
};

// Logout
const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed. Please try again.");
    throw error;
  }
};

// Reset Password
const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email.trim().toLowerCase());
    toast.success("Password reset email sent! Check your inbox.");
  } catch (error) {
    console.error("Reset password error:", error);

    let message = "Failed to send reset email.";

    switch (error.code) {
      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;

      case "auth/user-not-found":
        message = "No account found with this email.";
        break;

      case "auth/network-request-failed":
        message = "Network error. Please check your internet connection.";
        break;

      default:
        message = "Failed to send reset email. Please try again.";
    }

    toast.error(message);
    throw error;
  }
};

// Google Sign In
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name: user.displayName || user.email.split("@")[0],
      email: user.email,
      authProvider: "google",
      createdAt: new Date().toISOString(),
    });

    toast.success("Signed in with Google!");
    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);

    if (error.code !== "auth/email-already-in-use") {
      toast.error("Google sign-in failed. Please try again.");
    }

    throw error;
  }
};

// Export
export { auth, db, login, signup, logout, resetPassword, signInWithGoogle };
