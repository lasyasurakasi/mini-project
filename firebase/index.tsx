import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDJJP-WdsEzY4OUAvFaCjmiqY_qNWn3Ov0",
  authDomain: "react-project-62ad9.firebaseapp.com",
  projectId: "react-project-62ad9",
  storageBucket: "react-project-62ad9.firebasestorage.app",
  messagingSenderId: "254227599637",
  appId: "1:254227599637:web:0654eaba535f856903991c"
};


export const app = initializeApp(firebaseConfig)
