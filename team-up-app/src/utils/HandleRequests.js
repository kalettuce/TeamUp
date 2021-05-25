import firebase from './Firebase.js';
import { addMember } from './AddMembers.js';

const database = firebase.database();

export function acceptRequest(rid) {
    database.ref("requests").child(rid).once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            const uid = data.from;
            const pid = data.to;

            addMember(pid, uid);
            deleteRequest(pid, uid, rid);
        });
}

export function rejectRequest(rid) {
    database.ref("requests").child(rid).once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            const uid = data.from;
            const pid = data.to;

            deleteRequest(pid, uid, rid);
        });
}

function deleteRequest(pid, uid, rid) {
    database.ref(`/requests/${rid}`).remove();
    database.ref(`/projects/${pid}/requests_received/${rid}`).remove();
    // TODO: fix permission issues
    // database.ref(`/users/${uid}/requests_sent/${rid}`).remove();
}
