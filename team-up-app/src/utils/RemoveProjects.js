import firebase from './Firebase.js';
import { removeProjectFolder } from './FileStorage.js'
import { deleteRequest } from './HandleRequests.js'

const database = firebase.database();

// deletes a project from the DB, also deletes the project folder in storage
// pid: project id
// callback: the procedure to execute after the deletion
export function removeProject(uid, pid, callback) {
    const projectRef = database.ref(`/projects/${pid}/`);

    projectRef.child('image_url').once('value').then((snapshot) => {
        if (snapshot.val() !== null) {
            removeProjectFolder(pid);
        }
    });

    database.ref(`users/${uid}/owned_projects/${pid}`).remove();

    // remove all pending requests
    projectRef.child('requests_received').once('value')
        .then((snapshot) => {
            const data = snapshot.val();
            if (data) {
                Object.entries(data).forEach(([uid, rid]) => {
                    deleteRequest(pid, uid, rid);
                });
            }
        })
        .then(() => {
            // remove entries of joined_projects for members
            projectRef.child('members').once('value')
                .then((snapshot) => {
                    const data = snapshot.val();
                    Object.values(data).forEach((uid) =>  {
                        database.ref(`/users/${uid}/joined_projects/${pid}`).remove();
                    });
                })
                .then(() => {
                    // actually removing the DB entry
                    projectRef.remove().then(callback);
                })
        });
}
