
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getFirestore,collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  import {getAuth,createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider,signInWithPopup,signOut ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAr7EnP-xnQN4bcFIhreSA6nEnw1y4g_tI",
    authDomain: "registerform-3e0c7.firebaseapp.com",
    projectId: "registerform-3e0c7",
    storageBucket: "registerform-3e0c7.appspot.com",
    messagingSenderId: "641992897205",
    appId: "1:641992897205:web:a38ccfd52d9c0860bec4fc",
    measurementId: "G-HG6XNJWFH2"
  };

// Initialize Firestore
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  const auth = getAuth(app);
  const analytics = getAnalytics(app);
  const provider = new GoogleAuthProvider();
export{
    createUserWithEmailAndPassword,auth,signInWithEmailAndPassword,provider,signInWithPopup,GoogleAuthProvider,signOut,onAuthStateChanged,
    collection, addDoc,db

}