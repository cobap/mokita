// Firebase
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCnPvzdZ3ybUtDclh5Gz1KBVXMfJfzKYMQ",
  authDomain: "asp-debrief.firebaseapp.com",
  databaseURL: "https://asp-debrief.firebaseio.com",
  projectId: "asp-debrief",
  storageBucket: "asp-debrief.appspot.com",
  messagingSenderId: "740983763129"
};

var fire = firebase.initializeApp(config);
export default fire;

// export const firebaseImpl = firebase.initializeApp(config);
// export const firebaseDatabase = firebase.database();
