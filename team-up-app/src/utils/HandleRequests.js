import firebase from './Firebase.js';
import { addMember } from './AddMembers.js';

const database = firebase.database();

export function acceptRequest(rid, callback) {
    database.ref("requests").child(rid).once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            const uid = data.from;
            const pid = data.to;

            addMember(pid, uid, () => {
                deleteRequest(pid, uid, rid, callback);
            });
        });
}

export function rejectRequest(rid, callback) {
    database.ref("requests").child(rid).once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            const uid = data.from;
            const pid = data.to;

            deleteRequest(pid, uid, rid, callback);
        });
}

export function deleteRequest(pid, uid, rid, callback) {
    var promises = [];

    promises.push(database.ref(`/requests/${rid}`).remove());
    promises.push(database.ref(`/projects/${pid}/requests_received/${uid}`).remove());
    promises.push(database.ref(`/users/${uid}/requests_sent/${pid}`).remove());

    Promise.all(promises).then(callback);
}
