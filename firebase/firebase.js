import { initializeApp, getApps } from "firebase/app"
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage"
import {getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence} from 'firebase/firestore';
import { getDatabase } from "firebase/database";



const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID,
};


if (!getApps().length) {
    const app = initializeApp(clientCredentials)
}




const auth = getAuth();
const db = getFirestore();
const storage = getStorage();




export { auth, db, storage };
