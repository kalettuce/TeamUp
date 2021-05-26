import firebase from './Firebase.js';

const database = firebase.database();

// Creates a request from the user to join the project
export function addRequest(uid, pid, message) {
    const rid = database.ref("requests").push({"from": uid, "to": pid, "message": message}).key;
    // adding the key itself to the fields
    database.ref('requests').child(rid).update({key: rid});

    database.ref("projects").child(pid).child("requests_received").child(uid).set(rid);
    database.ref("users").child(uid).child("requests_sent").child(pid).set(rid);
}
