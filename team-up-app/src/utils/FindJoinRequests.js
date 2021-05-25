import firebase from './Firebase.js';

const database = firebase.database();

// Calls the callback with the list of requests sent by the given user
export function fetchRequestsBySender(uid, callback) {
    database.ref("users").child(uid).child("requests_sent").once("value")
        .then(snapshot => snapshot.val())
        .then(callback);
}

export function fetchRequestsByProject(pid, callback) {
    database.ref("projects").child(pid).child("requests_received").once("value")
        .then(snapshot => snapshot.val())
        .then(fetchRequests)
        .then(callback);
}
/*
export function fetchRequestsByReceiver(uid, callback) {
    database.ref("users").child(uid).child("owned_projects").once("value")
        .then(snapshot => snapshot.val())
        .then(pids => {
            const requestPromises = [];
            for (let rid of rids) {
                requestPromises.push(database.ref("requests").child(rid).once("value"));
            }
            return Promise.all(requestPromises);
        })
        .then(callback);
}

export function fetchInvitationsBySender() {

}

export function fetchInvitationsByReceiver() {

}
*/

function fetchRequests(rids) {
    if (!rids) {
        return [];
    }
    
    rids = Object.keys(rids);

    const requestPromises = [];
    for (let rid of rids) {
        requestPromises.push(database.ref("requests").child(rid).once("value"));
    }
    return Promise.all(requestPromises).then(snapshots => snapshots.map(snapshot => snapshot.val()));
}
