
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDxrD4Eqaqk9vRoqnWb99MAiKc5m--kr3g",
  authDomain: "tattoo-fd650.firebaseapp.com",
  projectId: "tattoo-fd650",
  storageBucket: "tattoo-fd650.firebasestorage.app",
  messagingSenderId: "220723694386",
  appId: "1:220723694386:web:643e9b2f1816fa87e8e52b",
  measurementId: "G-53RYD1VBDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };