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
const settings = {timestampsInSnapshots: true};
firestore.settings(settings)
var provider = new firebase.auth.GoogleAuthProvider();

export const CreatePost = (userId, userName, groupId, content) => {
    return new Promise((resolve, reject) => {
        firestore.collection("posts").add({
            userId,
            authorInitials: userName.split(" ").map(word => word[0]).join(""),
            groupId,
            content,
            likedBy: []
        }).then(doc => {
            resolve(doc.id)
        }).catch(error => reject(error))
    })
};

export const CreateGroup = (groupName, community, uid) => {
    // firestore.collection()
    return new Promise((resolve, reject) => {
        firestore.collection("groups").where("community", "==", community).where("name", "==", groupName).get().then(results => {
            if (!results.empty) {
                resolve("Group with name already exists")
            }
            else {
                firestore.collection("groups").add({
                    name: groupName,
                    community: community,
                    createdBy: uid,
                    timestamp: firebase.firestore.Timestamp.now().toMillis()
                }).then(doc => {
                    JoinGroup(doc.id, uid).then(() => {
                        resolve(doc.id)
                    }).catch(error => reject(error))
                }).catch(error => reject(error))
            }
        }).catch(error => reject(error))
    })
};

export const JoinGroup = (groupId, uid) => {
    return new Promise((resolve, reject) => {
        let membershipGroupRef = firestore.collection("memberships");
        membershipGroupRef.where("groupId", "==", groupId).where("uid", "==", uid).get().then(results => {
            if (!results.empty) {
                reject("Already a member of this group!")
            }
            else {
                membershipGroupRef.add({
                  groupId:groupId,
                  uid:uid,
                }).then(doc => {
                    resolve(doc.id)
                }).catch(error => reject(error))
            }
        })
    })
};

export const GetGeneralGroup = (community, uid) => {
    return new Promise((resolve, reject) => {
        firestore.collection("groups").where("community", "==", community).where("name", "==", "General").get().then(results => {
            if (!results.empty) {
                resolve(results.docs[0].id)
            }
            else {
                CreateGroup("General", community, uid).then(groupId => {
                    resolve(groupId)
                }).catch(error => reject(error))
            }
        }).catch(error => reject(error))
    })
}

export const WatchUserGroups = (uid, successCallback, errorCallback) => {
    // get user groups from membership table
    let groupListeners = []
    firestore.collection("memberships").where("uid", "==", uid).onSnapshot(querySnap => {
        for (let i = 0; i < groupListeners.length; i++) {
            groupListeners.pop()()
        }
        querySnap.docs.forEach(doc => {
            groupListeners.push(firestore.collection("groups").doc(doc.data().groupId).onSnapshot(docSnap => {
                successCallback(docSnap.id, docSnap.data())
            }, error => errorCallback(error)))
        })
    }, error => errorCallback(error))
}

export const WatchCommunityGroups = (community, successCallback, errorCallback) => {
    firestore.collection("groups").where("community", "==", community).onSnapshot(querySnap => {
        querySnap.docs.forEach(doc => {
            successCallback(doc.id, doc.data())
        })
    }, error => errorCallback(error))
}

export const WatchGroupPosts = (groupId, successCallback, errorCallback) => {
  firestore.collection("posts").where("groupId", "==", groupId).onSnapshot(querySnap => {
    let posts = []
    querySnap.docs.forEach(doc => {
      posts.push({
        id: doc.id,
        ...doc.data()
      })
    })
    successCallback(posts)
  }, error => errorCallback(error))
}

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
            const user = {
                uid: res.user.uid,
                email: res.user.email,
                name: res.user.displayName,
                community: res.user.email.split("@")[1]
            }
            CreateUser(user.uid, user.name, user.community, user.email).then(() => {
                GetGeneralGroup(user.community, user.uid).then(groupId => {
                  resolve({user, groupId})
                }).catch(error => reject(error))
            }).catch(error => reject(error))
        }).catch(error => reject(error))
    })
};


export const CreateUser = (uid, name, community, email) => {

    return new Promise((resolve, reject) => {
        firestore.collection("users").doc(uid).get().then(doc => {
            if (doc.exists) {
                resolve("User already exists")
            }
            else {
                firestore.collection("users").doc(uid).set({
                    name: name,
                    community: community,
                    email: email,
                }, {merge: true}).then(() => {
                    resolve()
                }).catch(error => reject(error))
            }
        }).catch(error => reject(error))
    })
};

export const LikePost = (userId, postId) => {
    return new Promise((resolve, reject) => {
        firestore.collection("likes").where("userId", "==", userId).where("postId", "==", postId).get().then(results => {
            if (!results.empty) {
                reject("You've already liked this post")
            }
            else {
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
