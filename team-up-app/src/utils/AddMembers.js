import firebase from './Firebase.js';

const database = firebase.database();

// pid: project id
// uid: uid of the user to add
// callback: precedure to call after the addMember() operation is done
export function addMember(pid, uid, callback) {
    database.ref('projects').child(pid).child('members').push(uid);
    database.ref(`/users/${uid}/joined_projects`).once('value')
        .then((snapshot) => {
            database.ref('users').child(uid).child('joined_projects').push(pid)
                .then(callback);
        });
}
