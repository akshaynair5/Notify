// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLV6lIHgDxf3OSVbrm-85CC7EbQ0lhVfI",
  authDomain: "notify-48873.firebaseapp.com",
  projectId: "notify-48873",
  storageBucket: "notify-48873.appspot.com",
  messagingSenderId: "83170590318",
  appId: "1:83170590318:web:aae603f5979f981c30707f",
  measurementId: "G-XSXT5QMSCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);