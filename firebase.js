// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwMse9UDqLcYUGXJH5COK5zAyxE9ulxoY",
  authDomain: "ui-forge.firebaseapp.com",
  projectId: "ui-forge",
  storageBucket: "ui-forge.appspot.com",
  messagingSenderId: "617285691003",
  appId: "1:617285691003:web:77cead103b96eae97da4de",
  measurementId: "G-K8TVBEHK9N"
};

// Initialize Firebase

export  const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);
export const db = getFirestore()