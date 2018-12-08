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


export const CreateGroup = (groupName) => {
    // firestore.collection()
    return new Promise((resolve, reject) => {
        firestore.collection("groups").where("groupName", "=", groupName).get().then(results => {
            if (!results.empty) {
                reject("Group with name already exists")
            }
            else {
                firestore.collection("groups").add({
                    groupName: groupName,
                    timestamp: firebase.firestore.Timestamp.now().toMillis()
                }).then(doc => {
                    resolve(doc.id)
                }).catch(error => reject(error))
            }
        }).catch(error => reject(error))
    })
};

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


export const CreateProfile = (userId, name_in) => {

    return firestore.collection("users").doc(userId).set({
        name: name_in
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
};


export const Logout = () => {
    firebase.auth().signOut().then(function () {
        alert("Signed out successfully!")
    }).catch(function (error) {
        alert(error.message);
    });
}
