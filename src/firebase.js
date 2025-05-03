import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnW1gfMKGd4xeQ6CO11PR_i_MXPlOeElA",
  authDomain: "tattoo-20550.firebaseapp.com",
  projectId: "tattoo-20550",
  storageBucket: "tattoo-20550.firebasestorage.app",
  messagingSenderId: "806899523227",
  appId: "1:806899523227:web:21bf717598f0b3bc36303e",
  measurementId: "G-LM5ZEHRSBM"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, signOut , db};