import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBs-9xPlzs-Sr3Vykoz8t8c3LI1JVFA_kg",
  authDomain: "blackcofer-assignment.firebaseapp.com",
  projectId: "blackcofer-assignment",
  storageBucket: "blackcofer-assignment.appspot.com",
  messagingSenderId: "886780684001",
  appId: "1:886780684001:web:a6b8d68670ec45224bf9a0",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);