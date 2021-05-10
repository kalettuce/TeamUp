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

// Fetch one project by its id
export function fetchProjectById(id, callback) {
    database.ref('projects/' + id + '/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val());
    });
}
