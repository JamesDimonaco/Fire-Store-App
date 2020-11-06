import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHU4oOoFn7xiPdqdNZDKjGMtnhh6AJ7aU",
  authDomain: "firestoreapp-778a1.firebaseapp.com",
  databaseURL: "https://firestoreapp-778a1.firebaseio.com",
  projectId: "firestoreapp-778a1",
  storageBucket: "firestoreapp-778a1.appspot.com",
  messagingSenderId: "326595700363",
  appId: "1:326595700363:web:8857e930adc24b933e568e",
  measurementId: "G-F382EP3Y6M",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
