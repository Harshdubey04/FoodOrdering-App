// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPkg1sn4A_-84FmlDRJLYVfoUsR6YMhxQ",
  authDomain: "food-order-app-a1a8a.firebaseapp.com",
  projectId: "food-order-app-a1a8a",
  storageBucket: "food-order-app-a1a8a.firebasestorage.app",
  messagingSenderId: "605718472139",
  appId: "1:605718472139:web:23d289d94f6660339f824e",
  measurementId: "G-LE15808HG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();