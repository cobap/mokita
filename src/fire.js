// Firebase
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAVlGKPt7ZSm77bQ0MQkf2xN5kQRdaXp30",
    authDomain: "novamokita.firebaseapp.com",
    databaseURL: "https://novamokita.firebaseio.com",
    projectId: "novamokita",
    storageBucket: "novamokita.appspot.com",
    messagingSenderId: "206745785781"
};

var fire = firebase.initializeApp(config);
export default fire;

// export const firebaseImpl = firebase.initializeApp(config);
// export const firebaseDatabase = firebase.database();
