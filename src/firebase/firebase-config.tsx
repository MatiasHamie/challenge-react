import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGYfZtxB9J4lSYlToO4908ch4d-tUu7I0",
  authDomain: "practica-app-713ee.firebaseapp.com",
  projectId: "practica-app-713ee",
  storageBucket: "practica-app-713ee.appspot.com",
  messagingSenderId: "124675843796",
  appId: "1:124675843796:web:38c088322d680964e87d41",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };
