import firebase from "firebase"
import {firebaseApiKey} from "./env"

var config = {
  apiKey: firebaseApiKey,
  authDomain: "bulluber-a9d07.firebaseapp.com",
  databaseURL: "https://bulluber-a9d07.firebaseio.com",
  projectId: "bulluber-a9d07",
  storageBucket: "bulluber-a9d07.appspot.com",
  messagingSenderId: "1015894110074"
};
firebase.initializeApp(config);

let firestore = firebase.firestore()
var provider = new firebase.auth.GoogleAuthProvider();

export const CreatePost = (userId, groupId, content) => {
	return firestore.collection("posts").add({
		userId,
		groupId,
		content
	})
};

export const CreateProfile = (userId, name) => {
  return firestore.collection("users").add({
  	userId,
  	name
  })
};


export const Login = () => {
        return firebase.auth().signInWithPopup(provider)
};

export const Logout = () => {
    firebase.auth().signOut().then(function () {
        alert("Signed out successfully!")
    }).catch(function (error) {
        alert(error.message);
    });
}
