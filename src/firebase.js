// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4_xX8-mb-EjCOrK5y2YSsw0FAmVstt5o",
  authDomain: "my-portfolio-sa.firebaseapp.com",
  projectId: "my-portfolio-sa",
  storageBucket: "my-portfolio-sa.firebasestorage.app",
  messagingSenderId: "866317117139",
  appId: "1:866317117139:web:4039f20098105544711626"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);