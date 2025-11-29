// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiMEXioBtEgvOH2z81DCARI_LwplLovk4",
  authDomain: "travelease-fec80.firebaseapp.com",
  projectId: "travelease-fec80",
  storageBucket: "travelease-fec80.firebasestorage.app",
  messagingSenderId: "437299814314",
  appId: "1:437299814314:web:8751e31cde594bb89715d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app);
export default app;