// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import { register } from 'register-service-worker'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const messaging = app.messaging();

import { PushNotifications } from '@capacitor/push-notifications';

const addListeners = async () => {
  await PushNotifications.addListener('registration', token => {
    console.info('Registration token: ', token.value);
  });

  await PushNotifications.addListener('registrationError', err => {
    console.error('Registration error: ', err.error);
  });

  await PushNotifications.addListener('pushNotificationReceived', notification => {
    console.log('Push notification received: ', notification);
  });

  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue);
  });
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions();

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions();
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!');
  }

  await PushNotifications.register();
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}
// const token = getToken({vapidKey:'BNix8N2znEMtm-qBK2KsVeuQPVQf-yfnyGMVoJRBPcLz1kbhUffe4FpVb0bQXunAQZLBIKPEPO3MawBqoiyeW4M'})
