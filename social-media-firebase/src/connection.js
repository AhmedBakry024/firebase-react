// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyB8XYESLkkZ1k-V5-f0jnP2IeHUq1ukOcc",
  authDomain: "react-practice-7d93d.firebaseapp.com",
  projectId: "react-practice-7d93d",
  storageBucket: "react-practice-7d93d.firebasestorage.app",
  messagingSenderId: "835069717847",
  appId: "1:835069717847:web:54868e560f269bade56212",
  measurementId: "G-224JE98CBE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Db = getFirestore(app);

export default Db;