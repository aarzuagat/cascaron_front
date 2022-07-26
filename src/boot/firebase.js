// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getMessaging, onMessage} from "firebase/messaging";

import Vue from "vue";


const firebaseConfig = {
  apiKey: "AIzaSyDIeQV9QEameNggHLpOUlQaC664cBh9bJg",
  authDomain: "lovetcg-f25b5.firebaseapp.com",
  projectId: "lovetcg-f25b5",
  storageBucket: "lovetcg-f25b5.appspot.com",
  messagingSenderId: "227567895886",
  appId: "1:227567895886:web:52eeb13361cf17d36d4a1f",
  measurementId: "G-45Z3F606R0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);



Vue.prototype.$messaging = messaging;
