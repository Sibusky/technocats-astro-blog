import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9nqE3bvUrZ1RBEJfZq-Q2gvhlVVWa588",
  authDomain: "blog-rating-22da6.firebaseapp.com",
  projectId: "blog-rating-22da6",
  storageBucket: "blog-rating-22da6.appspot.com",
  messagingSenderId: "341277539245",
  appId: "1:341277539245:web:65b6889ab30241b11abf24",
  measurementId: "G-1VZQ0CFXP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
