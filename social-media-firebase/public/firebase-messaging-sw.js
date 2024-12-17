// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');




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
// Retrieve an instance of Firebase Firestore
const Db = firebase.firestore();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);


    // Save to Firestore
    const notification = {
        dataPayload: payload.data,
        notificationPayload: payload.notification
    };

    addDoc(collection(Db, 'notifications'), notification);
});

