import firebase from './Firebase.js';
import { removeProjectFolder } from './FileStorage.js'
import { deleteRequest } from './HandleRequests.js'

const database = firebase.database();

// deletes a project from the DB, also deletes the project folder in storage
// pid: project id
// callback: the procedure to execute after the deletion
export function removeProject(pid, callback) {
    const projectRef = database.ref(`/projects/${pid}/`);

    const removeFilesPromise = projectRef.child('image_url').once('value')
        .then((snapshot) => {
            if (snapshot.val() !== null) {
                removeProjectFolder(pid);
            }
        });

    // remove all pending requests
    const removeRequestsPromise = projectRef.child('requests_received').once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.entries(data).forEach(([uid, rid]) => {
                    deleteRequest(pid, uid, rid);
                });
            }
        });

    // remove entries of joined_projects for members
    const removeMembersPromise = projectRef.child('members').once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            Object.values(data).forEach((uid) => {
                database.ref(`/users/${uid}/joined_projects/${pid}`).remove();
            });
        });

    // remove entries of owned_projects for owner
    const removeOwnerPromise = projectRef.child('owner').once('value')
        .then((snapshot) => {
            const uid = snapshot.val();
            database.ref(`/users/${uid}/owned_projects/${pid}`).remove();
        });

    // remove the project from the DB after everything else is done
    Promise.all([removeFilesPromise, removeRequestsPromise, removeMembersPromise, removeOwnerPromise])
        .then(() => {
            // actually removing the DB entry
            projectRef.remove().then(callback);
        });
}
