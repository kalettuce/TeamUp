import firebase from './Firebase.js';

const database = firebase.database();

// Fetches a snapshot of all projects
export function fetchAllUsers(callback) {
    database.ref('/users/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val());
    });
}

// Fetch one project by its id
export function fetchUserById(id, callback) {
    database.ref('users/' + id + '/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val());
    });
}
