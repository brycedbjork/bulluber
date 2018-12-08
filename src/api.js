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

let firestore = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

export const CreatePost = (userId, groupName, content) => {
    if (groupName === "") {
        groupName = "General"
    }
    firestore.collection("posts").add({
        userId,
        groupName,
        content
    })
    // }).then(function (res) {
    //     firestore.collection("posts").doc(res.id).set(
    //         {
    //             // postId: postId,
    //         }, {merge: true}
    //     );
    //     alert("Message posted to group: " + groupName)
    // });
};


export const createGroup = (groupName) => {
    // firestore.collection()

    firestore.collection("groups").add({
        groupName: groupName,
    }).then(function (res) {
        firestore.collection("groups/").doc(res.id).update({
            // groupId: res.id,
            timeStamp:firebase.firestore.Timestamp.now().toMillis()
        })
    });};

    export const GetUsersPosts = () => {
        var userId = firebase.auth().currentUser.uid;
        let firestore = firebase.firestore();
        return firestore.collection('posts/').where("userId", "==", userId).get()
        // console.log(firestore.collection('posts/').where("userId", "==",userId).get().then(function(snap){
        //     snap.forEach(function(post){
        //         console.log(post.id,"=>",post.data())
        //     })
    };

    export const GetAllPosts = () => {
        let firestore = firebase.firestore();
        return firestore.collection('posts/').get()
    };


    export const Login = () => {
        return firebase.auth().signInWithPopup(provider)
    };
export const CreateProfile = (userId, name) => {
  return firestore.collection("users").add({
  	userId,
  	name
  })
};


export const Logout = () => {
    firebase.auth().signOut().then(function () {
        alert("Signed out successfully!")
    }).catch(function (error) {
        alert(error.message);
    });
}
