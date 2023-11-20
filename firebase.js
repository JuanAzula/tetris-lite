// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAY6H6r2J5Sbj-hjF_-wc9yz0-UZRqAE4E',
  authDomain: 'tetris-lite-30fb7.firebaseapp.com',
  projectId: 'tetris-lite-30fb7',
  storageBucket: 'tetris-lite-30fb7.appspot.com',
  messagingSenderId: '134883466796',
  appId: '1:134883466796:web:0678c9b529ab0e85c5fb89',
  measurementId: 'G-SS2NDM96GJ'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
