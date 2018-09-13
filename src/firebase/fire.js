import firebase from 'firebase'
import 'firebase/auth';
import 'firebase/database';
let config = {
    apiKey: "AIzaSyAXuwnnDWo2_tMu8rXSE01Xa7uPlqOfaLM",
    authDomain: "jot-pad-notes.firebaseapp.com",
    databaseURL: "https://jot-pad-notes.firebaseio.com",
    projectId: "jot-pad-notes",
    storageBucket: "jot-pad-notes.appspot.com",
    messagingSenderId: "939958359794"
};
let fire = firebase.initializeApp(config);
const db = firebase.database();
const auth = firebase.auth();
export {
    auth,
    db,
  };
export default fire;