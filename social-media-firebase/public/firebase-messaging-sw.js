// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore-compat.js');

// IndexedDB Helper Functions
const dbName = 'webData';
const storeName = 'users';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

function getTokenFromIndexedDB() {
  return new Promise((resolve, reject) => {
    openDatabase().then(db => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get('token');

      request.onsuccess = (event) => {
        resolve(event.target.result ? event.target.result.value : null);
        console.log('token is from method : ', event.target.result.value);
      };

      request.onerror = (event) => {
        console.error('Error retrieving token from IndexedDB', event);
        resolve(null);
      };
    }).catch(reject);
  });
}

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
  
  // Try to get the token from IndexedDB
  let userToken = await getTokenFromIndexedDB();

  // Customize notification here
  const notificationPayload = payload.notification;
  const dataPayload = payload.data;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  try {
    // Save notification to Firestore
    await db.collection('notification-history').add({
      notificationPayload: notificationPayload,
      dataPayload: dataPayload
    });
    console.log('Notification saved to Firestore');
    
  } catch (error) {
    console.error('Error saving notification to Firestore: ', error);
  }
  console.log('hello1');
  if (dataPayload.subscribetotopic) {
    console.log('hello2');
    console.log("token is from request : ", userToken);
    console.log("topic is from request : ", dataPayload.subscribetotopic);
    // fetch api to post to the server to subscribe to a topic
    const response = await fetch("https://firebase-admin-cloud.vercel.app/api/subscribe", {
      method: 'POST',
      body: JSON.stringify({ token: userToken, topic: dataPayload.subscribetotopic }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('hello3');
  }
  self.registration.showNotification(notificationTitle, notificationOptions);
});