import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCledhWSJM1kv3mnXKKqiWA3L8t3TgAp9I",
    authDomain: "expense-tracker-3fbeb.firebaseapp.com",
    projectId: "expense-tracker-3fbeb",
    storageBucket: "expense-tracker-3fbeb.appspot.com",
    messagingSenderId: "919107072652",
    appId: "1:919107072652:web:5b478523541204158a41a9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy