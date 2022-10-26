var firebase = require('firebase')
var config = {
  apiKey: "AIzaSyBqT1Vn2WSzCKGDFUTzrltO-wMlXYSaL9I",
  authDomain: "mdd-breathalyzer.firebaseapp.com",
  databaseURL: "https://mdd-breathalyzer-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mdd-breathalyzer",
  storageBucket: "mdd-breathalyzer.appspot.com",
  messagingSenderId: "262679710881"
};
const fire = firebase.initializeApp(config);
module.exports = fire;