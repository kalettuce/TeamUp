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
    const promises = [];

    for (const id of ids) {
        promises.push(database.ref('/users/' + id + '/')
                .once('value')
                .then((snapshot) => {
                    return {uid: id, info: snapshot.val()};
                }));
    }

    Promise.all(promises).then(callback);
}