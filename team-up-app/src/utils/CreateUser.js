import firebase from './Firebase.js';
import { setUserImage } from './FileStorage';

const database = firebase.database();

// Adds a new user to the database
// Will modify node values if they already exist
export function createUser(userUID, description, email, name, region, picture) {
    database.ref('/users/')
            .child(userUID)
            .set({
                description: description,
                email: email,
                invitations_received: [],
                joined_projects: [],
                name: name,
                region: region,
                owned_projects: [],
                requests_sent: [],
                tags: []
    });
    setUserImage(userUID, picture, () => {});
}
