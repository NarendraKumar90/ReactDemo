import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDTC8mU_K9Dp2526at67wLyMmXSYYbqtg",
  authDomain: "otp-login-app-11a37.firebaseapp.com",
  projectId: "otp-login-app-11a37",
  storageBucket: "otp-login-app-11a37.firebasestorage.app",
  messagingSenderId: "294474934981",
  appId: "1:294474934981:web:85adfae6255ca056949eac"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);