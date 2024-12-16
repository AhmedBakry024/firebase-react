import  Db  from './connection'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { onMessage, getMessaging, getToken } from 'firebase/messaging'
// import { initializeApp } from 'firebase-admin/app';


// const admin = initializeApp();
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



export const requestPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        console.log('Permission: ', permission);
        if(permission === 'granted') {
            userToken = await getToken(messaging, { vapidKey: 'BEyq15QQZHYMR8nb-5xE0axZ8UfaS3lCOC5rcIgStig4_y9LUUUI1lR2l7Yjcc21pT4j5SfopdW3ERJ7pgNie4E' });
            console.log('Token: ', userToken);
        }
    } catch (error) {

        console.error('Error: ', error);
    }
}

// export const getTokenMethod = async () => {
//     getToken(messaging, { vapidKey: 'BEyq15QQZHYMR8nb-5xE0axZ8UfaS3lCOC5rcIgStig4_y9LUUUI1lR2l7Yjcc21pT4j5SfopdW3ERJ7pgNie4E' }).then((currentToken) => {
//         if (currentToken) {
//             userToken = currentToken;
//             console.log('Token: ', currentToken);
//         } else {
//             console.log('No registration token available. Request permission to generate one.');
//         }
//     }
//     ).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//     });
// }




// export const subscribeToTopicMethod = async (topic) => {
//     getmessaging().subscribeToTopic(userToken, topic)
//   .then((response) => {
//     // See the MessagingTopicManagementResponse reference documentation
//     // for the contents of response.
//     console.log('Successfully subscribed to topic:', response);
//   })
//   .catch((error) => {
//     console.log('Error subscribing to topic:', error);
//   });
// }