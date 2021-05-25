import firebase from './Firebase.js';

const database = firebase.database();

// Creates a request from the user to join the project
export function addRequest(uid, pid, message) {
    const rid = database.ref("requests").push({"from": uid, "to": pid, "message": message}).key;

    //database.ref("projects").child(pid).child("requests_received").push(rid);
    //database.ref("users").child(uid).child("requests_sent").push(rid);

    // update the field in projects
    database.ref(`/projects/${pid}/requests_received`).once('value')
        .then((snapshot) => {
            var path;
            var updates = {};
            if (snapshot.val() !== null) { // create the object if it's null
                console.log("exists in p");
                path = `/projects/${pid}/requests_received/`;
                updates[rid] = uid;
            } else {
                console.log("not exists in p");
                path = `/projects/${pid}`;
                updates['requests_received'] = {};
                updates['requests_received'][rid] = uid;
            }
            database.ref(path).update(updates);
        });

    // update the field in users
    database.ref(`/users/${uid}/requests_sent`).once('value')
        .then((snapshot) => {
            var path;
            var updates = {};
            if (snapshot.val() !== null) {
                path = `/users/${uid}/requests_sent`;
                updates[rid] = pid;
            } else {
                path = `/users/${uid}`;
                updates['requests_sent'] = {};
                updates['requests_sent'][rid] = pid;
            }
            database.ref(path).update(updates);
        });
}
