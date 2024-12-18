import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import  Db  from '../connection';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';
import { subscribeToTopicMethod, unsubscribeFromTopicMethod } from "../repo";




// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8XYESLkkZ1k-V5-f0jnP2IeHUq1ukOcc",
    authDomain: "react-practice-7d93d.firebaseapp.com",
    projectId: "react-practice-7d93d",
    storageBucket: "react-practice-7d93d.firebasestorage.app",
    messagingSenderId: "835069717847",
    appId: "1:835069717847:web:54868e560f269bade56212",
    measurementId: "G-224JE98CBE"
};

const NotificationHandler = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect( ()  => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    // Handle foreground messages
    const unsubscribe = onMessage(messaging, async (payload) => {
      console.log('Foreground message received:', payload);

      // Create a notification object
      const newNotification = {
        id: Date.now(),
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || 'You have a new message',
        data: payload.data || {}
      };

      // create a notification object that holds the payload.notification and payload.data
      const notification = {
        notificationPayload: payload.notification,
        dataPayload: payload.data
      };
      try {
        await addDoc(collection(Db, 'notification-history'), notification);
        console.log('Notification saved to Firestore');
      } catch (error) {
        console.error('Error saving notification to Firestore: ', error);
      }

      // Add to notifications state
      setNotifications(prev => [...prev, newNotification]);

    //  if there's a value in the payload.data.subscribetotopic, subscribe to the topic of that value
      if (payload.data.subscribetotopic) {
        await subscribeToTopicMethod(payload.data.subscribetotopic);
      }

      // if there's a value in the payload.data.unsubscribefromtopic, unsubscribe from the topic of that value
      if (payload.data.unsubscribefromtopic) {
        await unsubscribeFromTopicMethod(payload.data.unsubscribefromtopic);
      }

      // Optional: Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(newNotification.title, {
          body: newNotification.body
        });
      }
    });

    

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Remove notification after it's been shown
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <div className="p-4 bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-gray-300">Notifications</h2>
      {notifications.length > 0 ? (
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="bg-blue-600 p-3 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{notification.title}</h3>
                <p>{notification.body}</p>
              </div>
              <button 
                onClick={() => removeNotification(notification.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No new notifications</p>
      )}
    </div>
  );
};

export default NotificationHandler;