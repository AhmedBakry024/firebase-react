// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js');




// Initialize the Firebase app
firebase.initializeApp({
    apiKey: "AIzaSyB8XYESLkkZ1k-V5-f0jnP2IeHUq1ukOcc",
    authDomain: "react-practice-7d93d.firebaseapp.com",
    projectId: "react-practice-7d93d",
    storageBucket: "react-practice-7d93d.firebasestorage.app",
    messagingSenderId: "835069717847",
    appId: "1:835069717847:web:54868e560f269bade56212",
    measurementId: "G-224JE98CBE"
});

// Retrieve firebase messaging
const messaging = firebase.messaging();
const db = firebase.firestore();

// Handle background messages
messaging.onBackgroundMessage(async (payload) => {
  console.log('Received background message', payload);

  // Customize notification here
  const notificationPayload = payload.notification;
  const dataPayload = payload.data;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  try {
    await db.collection('notification-history').add({
      notificationPayload: notificationPayload,
      dataPayload: dataPayload
    });
    console.log('Notification saved to Firestore');
  } catch (error) {
    console.error('Error saving notification to Firestore: ', error);
  }


  self.registration.showNotification(notificationTitle, notificationOptions);
});
