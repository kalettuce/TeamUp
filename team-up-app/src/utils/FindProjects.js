import firebase from './Firebase.js';
import { NOT_FOUND } from '../components/pages/NotFoundPage';
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
    database.ref('/projects/' + id + '/')
            .once('value')
            .then((snapshot) => {
        callback(snapshot.val() ? snapshot.val() : NOT_FOUND);
    });
}

// Fetch all projects owned by the user
// Returns an array of project objects
// If the user owns no projects, returns an empty array
export function fetchProjectsByOwner(uid, callback) {
    database.ref('/users/' + uid + '/owned_projects/')
            .once('value')
            .then((snapshot) => {
                const pids = Object.values(snapshot.val());

                if (pids === null) {
                    return [];
                }

                const promises = [];
                for (let pid of pids) {
                    const promise = database.ref('/projects/' + pid + '/')
                                            .once('value')
                                            .then(snapshot => snapshot.val());
                    promises.push(promise);
                }

                Promise.all(promises).then(callback);
            });
}

// Fetch all projects that a user is a member of
// Returns an array of project objects
// If the user is in no projects, returns an empty array
export function fetchProjectsByMember(uid, callback) {
    database.ref('/users/' + uid + '/joined_projects/')
            .once('value')
            .then((snapshot) => {
                const pids = Object.values(snapshot.val());

                if (pids === null) {
                    return [];
                }

                const promises = [];
                for (let pid of pids) {
                    const promise = database.ref('/projects/' + pid + '/')
                                            .once('value')
                                            .then(snapshot => snapshot.val());
                    promises.push(promise);
                }

                Promise.all(promises).then(callback);
            });
}
