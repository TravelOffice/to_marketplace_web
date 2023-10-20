import { initializeApp } from 'firebase/app';
import {
  getMessaging, getToken, onMessage, MessagePayload, NextFn, Observer,
} from 'firebase/messaging';
import { useAuthStore } from '@/hooks/auth';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestPermission = () => {
  Notification.requestPermission((permission) => {
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey: import.meta.env.VITE_VAPIDKEY,
      }).then((currentToken) => {
        console.log('device token: ', currentToken);
        useAuthStore.setState({ deviceToken: currentToken });
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
};

requestPermission();

export const onNewMessage = (
  nextOrObserver: NextFn<MessagePayload> | Observer<MessagePayload>,
) => onMessage(messaging, nextOrObserver);
