import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBetBAlFe2OAF9RVDIhsnt_k3kbHuo9qSA",
  authDomain: "react-twitter-1d1f6.firebaseapp.com",
  projectId: "react-twitter-1d1f6",
  storageBucket: "react-twitter-1d1f6.appspot.com",
  messagingSenderId: "352942104345",
  appId: "1:352942104345:web:eb6eb811854d238f1aef88",
};

const app = initializeApp(firebaseConfig);

// Authentication instance
export const auth = getAuth(app);
