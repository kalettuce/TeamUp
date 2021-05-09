import firebase from './Firebase.js';

const database = firebase.database();

export function fetchAllProjects(callback) {
    database.ref('/projects/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val());
    });
}
// returns a JSON object as string, including info about all projects
export function fetchProjectPage(startItem, endItem, callback) {
    database.ref('/projects/')
    .orderByKey()
    .startAt(startItem)
    .endAt(endItem)
    .on('value', snapshot => {
        callback(snapshot.val());
    });
}
