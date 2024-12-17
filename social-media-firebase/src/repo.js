import  Db  from './connection';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { onMessage, getMessaging, getToken } from 'firebase/messaging';
import axios from "axios";


const messaging = getMessaging();
let userToken = '';

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
        }
        console.log(userToken)
    } catch (error) {

        console.error('Error: ', error);
    }
}

export const subscribeToTopicMethod = async (topic) => {
    try {
        let response = await axios.request({
            url: "https://firebase-admin-cloud.vercel.app/api/subscribe",
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                "token": "dI9DlNPyH80hfHVczAGISW:APA91bEnabU4RjWw8N2sKbiYcHQIYRGWcUwWD_jt__0xr5uAQebJmnyECav-3uUbcgEVOpJP5sZBnVmu5Q-JZx-JGvK8HXiONkCumbM4Zm6UofUUvZwB3Pg",
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