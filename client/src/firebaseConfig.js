import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

if(!process.env.REACT_APP_FIREBASE_API_KEY) {
  alert("Firebase environment variables are not set. Please check your .env file.");
  throw new Error("Firebase environment variables are not set. Please check your .env file.");
}
if(!process.env.REACT_APP_FIREBASE_AUTH_DOMAIN) {
  throw new Error("Firebase environment variables are not set. Please check your .env file.");
}
if(!process.env.REACT_APP_FIREBASE_PROJECT_ID) {
  throw new Error("Firebase environment variables are not set. Please check your .env file.");
}
if(!process.env.REACT_APP_FIREBASE_STORAGE_BUCKET) {
  throw new Error("Firebase environment variables are not set. Please check your .env file.");
}
if(!process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID) {
  throw new Error("Firebase environment variables are not set. Please check your .env file.");
}
if(!process.env.REACT_APP_FIREBASE_APP_ID) {
  throw new Error("Firebase environment variables are not set. Please check your .env file.");
}


  const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);