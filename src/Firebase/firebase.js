import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


    const firebaseConfig = {
    apiKey: "AIzaSyBww9_sQpoVtan8jPHQh9yhuwRnGzSTX5M",
    authDomain: "expense-tracker-b4919.firebaseapp.com",
    projectId: "expense-tracker-b4919",
    appId: "1:1036977469657:web:f38ec5b42e5edc1325a6c8"
    };

const app = initializeApp(firebaseConfig)

export const auth= getAuth(app)
export const db=getFirestore(app)