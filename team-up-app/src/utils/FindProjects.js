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

// Fetches a snapshot of projects bounded by indices for pagination
// startItem and endItem are projectIDs
// Depends on projectID being a unique integer from [0..(projects.length - 1)]
export function fetchProjectPage(startItem, endItem, callback) {
    database.ref('/projects/')
    .orderByKey()
    .startAt(startItem)
    .endAt(endItem)
    .once('value', snapshot => {
        callback(snapshot.val());
    });
}
