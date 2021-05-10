import firebase from './Firebase.js';

const database = firebase.database();

// Fetches a snapshot of all projects
export function fetchAllProjects(callback) {
    database.ref('/projects/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val());
    });
}