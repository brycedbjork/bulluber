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

export const CreatePost = (userId, groupId, content) => {
	return firestore.collection("posts").add({
		userId,
		groupId,
		content
	})
}