import firebase from './Firebase.js';
import { removeProjectFolder } from './FileStorage.js'

const database = firebase.database();

// deletes a project from the DB, also deletes the project folder in storage
// pid: project id
// callback: the procedure to execute after the deletion
export function removeProject(pid, callback) {
    const projectRef = database.ref(`/projects/${pid}/`);

    projectRef.child('image_url').once('value').then((snapshot) =>
    {
        console.log(snapshot);
        console.log(snapshot.val());
        if (snapshot.val() !== null) {
            removeProjectFolder(pid);
        }

        // actually removing the DB entry
        if (callback !== null) {
            projectRef.remove().then(callback);
        } else {
            projectRef.remove().then();
        }
    });
}
