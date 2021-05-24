import firebase from './Firebase.js';

const database = firebase.database();

// Fetches a snapshot of all users
export function fetchAllUsers(callback) {
    database.ref('/users/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val());
    });
}

// Fetch user info by userid
export function fetchUserById(id, callback) {
    database.ref('/users/' + id + '/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val());
    });
}

// Fetch multiple user info by userid and also includes uid
// with each entry for reference
export function fetchUsersById(ids, callback) {
    for (const id of ids) {
        database.ref('/users/' + id + '/')
                .once('value')
                .then((snapshot) => {
                    callback(users => [...users, {uid: id, info: snapshot.val()}]);
                });
    }
}