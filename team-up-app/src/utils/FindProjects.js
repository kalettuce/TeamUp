import { database } from '../App.js';

// returns a JSON object as string, including info about all projects
export function fetchAllProjects(callback) {
    // returns the project list
    database.ref('/projects/').once('value').then((snapshot) => {
        callback(snapshot.val());
    });
}
