import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAYed17XsbSRBv8MPYoJ-8AST7ON2vn8L4",
  authDomain: "mesa-redonda-3f9bf.firebaseapp.com",
  projectId: "mesa-redonda-3f9bf",
  storageBucket: "mesa-redonda-3f9bf.appspot.com",
  messagingSenderId: "717787658304",
  appId: "1:717787658304:web:ade63be03f57f846ffc7a5"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};