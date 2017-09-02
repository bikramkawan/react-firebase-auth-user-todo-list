/**
 * Created by bikramkawan on 9/1/17.
 */
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyARRzTNYiRVE4DH8CKpM_GoB9bJPFRbIYc",
    authDomain: "react-auth-c10ad.firebaseapp.com",
    databaseURL: "https://react-auth-c10ad.firebaseio.com",
    projectId: "react-auth-c10ad",
    storageBucket: "",
    messagingSenderId: "154377850617"
};
export const firebaseApp = firebase.initializeApp(config);
export const users = firebaseApp.database().ref().child('users');
export const usersWishlist = firebaseApp.database().ref().child('usersWishlist');