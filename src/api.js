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
    return new Promise((resolve, reject) => {
        if (groupName === "") {
            groupName = "General"
        }
        firestore.collection("posts").add({
            userId,
            groupName,
            content
        }).then(doc => {
            resolve(doc.id)
        }).catch(error => reject(error))
    })
};

export const CreateGroup = (groupName) => {
    // firestore.collection()
    return new Promise((resolve, reject) => {
        firestore.collection("groups").where("groupName", "==", groupName).get().then(results => {
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
    return new Promise((resolve, reject) => {
        var userId = firebase.auth().currentUser.uid;
        let firestore = firebase.firestore();
        firestore.collection('posts').where("userId", "==", userId).get().then(docs => {
            let formattedDocs = [];
            docs.forEach(doc => {
                formattedDocs.push({
                    ...doc.data(),
                    id: doc.id
                })
            });
            resolve(formattedDocs);
        }).catch(error => reject(error))
    })
};

export const GetAllPosts = () => {
    return new Promise((resolve, reject) => {
        let firestore = firebase.firestore();
        firestore.collection('posts').get().then(docs => {
            let formattedDocs = [];
            docs.forEach(doc => {
                formattedDocs.push({
                    ...doc.data(),
                    id: doc.id
                })
            });
            resolve(formattedDocs);
        }).catch(error => reject(error))
    })
};


export const Login = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithPopup(provider).then(res => {
            resolve(res);
        }).catch(error => reject(error))
    })
};


export const CreateProfile = (userId, name_in) => {

    return new Promise ((resolve, reject) => {
        firestore.collection("users").where("userId", "==", userId).get().then(results => {
            if (!results.empty) {
                reject("This user already exists")
            } 
            else{
                firestore.collection("users").add({
                    name: name_in,
                }).then(doc => {
                    resolve(doc.id)
                }).catch(error => reject(error))
            }
        }).catch(error => reject(error))
    })
};

export const LikePost = (userId, postId) => {
    return new Promise ((resolve, reject) => {
        firestore.collection("likes").where("userId", "==", userId).where("postId", "==", postId).get().then(results => {
            if (!results.empty) {
                reject("You've already liked this post")
            } 
            else{
                firestore.collection("likes").add({
                    userId: userId,
                    postId: postId
                }).then(doc => {
                    resolve(doc.id)
                }).catch(error => reject(error))
            }
        }).catch(error => reject(error))
    })
};


export const Logout = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signOut().then(res => {
            resolve();
        }).catch(error => reject(error))

    })
};
