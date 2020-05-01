// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDWZlirfSaOCuugkdvcQplrl0t6J2IFou8",
    authDomain: "covolunteer-7d403.firebaseapp.com",
    databaseURL: "https://covolunteer-7d403.firebaseio.com",
    projectId: "covolunteer-7d403",
    storageBucket: "covolunteer-7d403.appspot.com",
    messagingSenderId: "527782242122",
    appId: "1:527782242122:web:f76d0e8d7c0976f37c03b3",
    measurementId: "G-263Q15GFFF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();