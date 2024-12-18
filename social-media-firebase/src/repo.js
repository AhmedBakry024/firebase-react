import Db from './connection';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { onMessage, getMessaging, getToken } from 'firebase/messaging';
import axios from "axios";

const messaging = getMessaging();
let userToken = '';

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

async function saveTokenToIndexedDB(token) {
    try {
        const db = await openDatabase();
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        
        // Save or update the token
        store.put({ id: 'token', value: token });

        return token;
    } catch (error) {
        console.error('Error saving token to IndexedDB:', error);
        return null;
    }
}

async function getTokenFromIndexedDB() {
    return new Promise((resolve, reject) => {
        openDatabase().then(db => {
            const transaction = db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get('token');

            request.onsuccess = (event) => {
                resolve(event.target.result ? event.target.result.value : null);
            };

            request.onerror = (event) => {
                console.error('Error retrieving token from IndexedDB', event);
                resolve(null);
            };
        }).catch(reject);
    });
}

export const addFormData = async (formData) => {
    try {
        await addDoc(collection(Db, 'form-data'), formData);
    } catch (error) {
        console.error('Error adding document: ', error);
    }
}

export const getFormData = async () => {
    const formData = [];
    const querySnapshot = await getDocs(collection(Db, 'form-data'));
    querySnapshot.forEach((doc) => {
        formData.push(doc.data());
    })
    return formData;
}

export const getNotificationData = async () => {
    const notificationData = [];
    const querySnapshot = await getDocs(collection(Db, 'notification-history'));
    querySnapshot.forEach((doc) => {
        notificationData.push(doc.data());
    })
    return notificationData;
}

export const requestPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if(permission === 'granted') {
            userToken = await getToken(messaging, { vapidKey: 'BEyq15QQZHYMR8nb-5xE0axZ8UfaS3lCOC5rcIgStig4_y9LUUUI1lR2l7Yjcc21pT4j5SfopdW3ERJ7pgNie4E' });
            
            // Save token to IndexedDB
            await saveTokenToIndexedDB(userToken);
        }
        console.log(userToken);
        return userToken;
    } catch (error) {
        console.error('Error: ', error);
        return null;
    }
}

export const subscribeToTopicMethod = async (topic) => {
    try {
        // If userToken is empty, try to retrieve from IndexedDB
        if (!userToken) {
            userToken = await getTokenFromIndexedDB();
        }

        let response = await axios.request({
            url: "https://firebase-admin-cloud.vercel.app/api/subscribe",
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                "token": userToken,
                "topic": topic
            })
        });
        console.log(response.data);
        return response.data.message;
    } catch (error) {
        console.error('Request Error: ', error);
    }
}

export const unsubscribeFromTopicMethod = async (topic) => {
    try {
        // If userToken is empty, try to retrieve from IndexedDB
        if (!userToken) {
            userToken = await getTokenFromIndexedDB();
        }

        let response = await axios.request({
            url: "https://firebase-admin-cloud.vercel.app/api/unsubscribe",
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                "token": userToken,
                "topic": topic
            })
        });
        console.log(response.data);
        return response.data.message;
    } catch (error) {
        console.error('Request Error: ', error);
        return error;
    }
}