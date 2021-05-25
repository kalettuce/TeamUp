import firebase from './Firebase.js';

const database = firebase.database();

export function addMember(pid, uid) {
    database.ref('projects').child(pid).child('members').push(uid);
    database.ref(`/users/${uid}/joined_projects`).once('value')
        .then((snapshot) => {
            if (snapshot.val() !== null) {
                database.ref('users').child(uid).child('joined_projects').push(pid);
            } else {
                var updates = {};
                const userRef = database.ref('users').child(uid);
                updates['joined_project'] = {dummy: 'dummy'};
                userRef.update(updates)
                .then(() => {userRef.child('joined_projects').push(pid)})
                .then(() => {userRef.child('dummy').remove()});
            }
        });
}
