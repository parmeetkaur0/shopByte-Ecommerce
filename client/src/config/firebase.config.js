// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyCeBbcEoshdgwmhS7BNpftzhpFzTYIsXR0",
  authDomain: "shopbyte-ecommerce.firebaseapp.com",
  projectId: "shopbyte-ecommerce",
  storageBucket: "ad-detection-a8205.firebasestorage.app",
  messagingSenderId: "638053861414",
  appId: "1:638053861414:web:3b0d4bb666c6479926bee7",
  measurementId: "G-F201YC0V80"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
