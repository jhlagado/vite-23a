import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzW-yZj35reavcWXfK0luEmOxfElSyWm4",
  authDomain: "contacts-9ae4d.firebaseapp.com",
  projectId: "contacts-9ae4d",
  storageBucket: "contacts-9ae4d.appspot.com",
  messagingSenderId: "243363214295",
  appId: "1:243363214295:web:17eb4fbf36fa8d86135192",
  measurementId: "G-188Z0SXR5F",
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider()
