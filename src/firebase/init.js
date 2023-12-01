import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "invoices-vue3.firebaseapp.com",
    projectId: "invoices-vue3",
    storageBucket: "invoices-vue3.appspot.com",
    messagingSenderId: "360954849715",
    appId: "1:360954849715:web:6c77be876250941abac3c6"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export { db }