// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getMessaging, onMessage, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyB8XYESLkkZ1k-V5-f0jnP2IeHUq1ukOcc",
  authDomain: "react-practice-7d93d.firebaseapp.com",
  projectId: "react-practice-7d93d",
  storageBucket: "react-practice-7d93d.firebasestorage.app",
  messagingSenderId: "835069717847",
  appId: "1:835069717847:web:54868e560f269bade56212",
  measurementId: "G-224JE98CBE"
};

const app = initializeApp(firebaseConfig);
const Db = getFirestore(app);

const messaging = getMessaging(app);

let userToken = '';

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
});

export const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log('Permission: ', permission);
    if (permission === 'granted') {
      userToken = await getToken(messaging, { vapidKey: 'BEyq15QQZHYMR8nb-5xE0axZ8UfaS3lCOC5rcIgStig4_y9LUUUI1lR2l7Yjcc21pT4j5SfopdW3ERJ7pgNie4E' });
    }
    console.log('Token: ', userToken);
  } catch (error) {
    console.error('Error: ', error);
  }
}

// export const getTokenMethod = async () => {
//   try {
//     const currentToken = await getToken(messaging, { vapidKey: 'BEyq15QQZHYMR8nb-5xE0axZ8UfaS3lCOC5rcIgStig4_y9LUUUI1lR2l7Yjcc21pT4j5SfopdW3ERJ7pgNie4E' });
//     if (currentToken) {
//       console.log('Token: ', currentToken);
//       userToken = currentToken;
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//     }
//   } catch (err) {
//     console.error('An error occurred while retrieving token. ', err);
//   }
// }

export default Db;