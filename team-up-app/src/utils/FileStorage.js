import firebase from './Firebase.js';

const database = firebase.database();
const storage = firebase.storage();

// Upload and set the image for a project
// pid: the project id
// file: the image to upload
// callback: calls this when done, no arguments
// Once set, the image can be accessed through the database under projects/pid/image_url
export function setProjectImage(pid, file, callback) {
    const path = "projects/" + pid + "/";

    if (file.length !== 0) {
        // Get the old image url
        console.log(path, file);
        database.ref(path).child("image_url").once("value")
                .then(snapshot => { return snapshot.val(); })
                // Delete the old image
                .then(url => storage.refFromURL(url).delete())
                .catch(() => { /* No old image to delete, not an error */ })
                // Upload the new image
                .then(() => storage.ref(path).child(file.name).put(file))
                // Update the image url in the database
                .then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => database.ref(path).child("image_url").set(url))
                .catch(console.error)
                .then(() => callback());
    }
}

function deleteFolderContents(path) {
    const ref = firebase.storage().ref(path);
    ref.listAll()
        .then(dir => {
            dir.items.forEach(fileRef => {
                deleteFile(ref.fullPath, fileRef.name);
            });
            dir.prefixes.forEach(folderRef => {
                deleteFolderContents(folderRef.fullPath);
            })
        })
    .catch(error => {
        console.log(error);
    });
}

function deleteFile(pathToFile, fileName) {
    const ref = firebase.storage().ref(pathToFile);
    const childRef = ref.child(fileName);
    childRef.delete()
}

// deletes all data related to a project in its project folder
// pid: the project id
export function removeProjectFolder(pid) {
    const path = `/projects/${pid}`;
    deleteFolderContents(path);
}
