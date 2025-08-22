// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-shiksha--login.firebaseapp.com",
  projectId: "e-shiksha--login",
  storageBucket: "e-shiksha--login.firebasestorage.app",
  messagingSenderId: "558725126174",
  appId: "1:558725126174:web:ba6ef76dbc14799771b60f",
  measurementId: "G-P494P86CFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };

