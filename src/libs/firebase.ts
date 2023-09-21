import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { collection, getFirestore } from 'firebase/firestore';
// import {...} from "firebase/functions";
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCbIzohINYSn8Cqxw5wBp5hSiXXf5oweuI',
  authDomain: 'shoesly-app.firebaseapp.com',
  projectId: 'shoesly-app',
  storageBucket: 'shoesly-app.appspot.com',
  messagingSenderId: '168277464622',
  appId: '1:168277464622:web:132cd53e09d218269671bf',
  measurementId: 'G-5SKLF4E9LL',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const database = {
  products: collection(db, 'products'),
};

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
