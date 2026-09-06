import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD-eYogqKdZDpQ_n4ziQoWJ8hf6JeaUE6A",
  authDomain: "netflix-clone-dd625.firebaseapp.com",
  projectId: "netflix-clone-dd625",
  storageBucket: "netflix-clone-dd625.firebasestorage.app",
  messagingSenderId: "607988709897",
  appId: "1:607988709897:web:054a11000fe11e8ba916d8",
  measurementId: "G-4DMRJJQKZ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const user = res.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
    });

    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Signup error:", error);

    const message = error.code
      ? error.code.split("/")[1]?.split("-").join(" ")
      : "Something went wrong";

    toast.error(message);
  }
};

// Login
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error:", error);

    const message = error.code
      ? error.code.split("/")[1]?.split("-").join(" ")
      : "Something went wrong";

    toast.error(message);
  }
};

// Logout
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export { auth, db, login, signup, logout };
