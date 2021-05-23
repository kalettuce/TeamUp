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

// Fetch multiple user info by userid
export function fetchUsersById(ids, callback) {
    for (const id in ids) {
        database.ref('/users/' + id + '/')
                .once('value')
                .then((snapshot) => {
                    callback(users => [...users, snapshot.val()]);
                });
    }
}