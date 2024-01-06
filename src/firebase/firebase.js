// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOSP3TNUtvood0FC0_ydEfnRubcnr9wms",
  authDomain: "document-verification-ap-88a6a.firebaseapp.com",
  projectId: "document-verification-ap-88a6a",
  storageBucket: "document-verification-ap-88a6a.appspot.com",
  messagingSenderId: "455554620657",
  appId: "1:455554620657:web:5a898cd3799cface00dd50",
  measurementId: "G-C50TQVJN4B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);