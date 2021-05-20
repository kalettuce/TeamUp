import firebase from './Firebase.js';

const database = firebase.database();
const storage = firebase.storage();

// Upload and set the image for a project
// pid: the project id
// file: the image to upload
// Once set, the image can be accessed through the database under projects/pid/image_url
export function setProjectImage(pid, file) {
    const path = "projects/" + pid + "/";

    if (file !== []) {
        // Get the old image url
        console.log(path, file);
        database.ref(path).child("image_url").once("value")
                .then(snapshot => snapshot.val())
                // Delete the old image
                .then(url => storage.refFromURL(url).delete())
                .catch(() => { /* No old image to delete, not an error */ })
                // Upload the new image
                .then(() => storage.ref(path).child(file.name).put(file))
                // Update the image url in the database
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => database.ref(path).child("image_url").set(url))
                .catch(console.error);
    }
}