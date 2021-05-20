import firebase from './Firebase.js';
import { setProjectImage } from './FileStorage';

const database = firebase.database();

// adds a project to the database given these information.
// calls the callback with the new project ID as the only argument.
export function addAProject(name, ownerID, tagline, time_zone,
                            description, joinProjectQuestion, tags, picture, callback) {
  const tagList = tags.split(';').map((tag) => tag.trim());
  const projData =  {
    name: name,
    owner: ownerID,
    tagline: tagline,
    time_zone: time_zone,
    description: description,
    application: joinProjectQuestion,
    tags: tagList,
    members: [],
    invitations_sent: []
  };

  const newPid = database.ref().child('projects').push().key;
  let updates = {};
  updates['/projects/' + newPid] = projData;
  database.ref().update(updates);
  setProjectImage(newPid, picture, () => callback(newPid));
}
