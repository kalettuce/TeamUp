import firebase from './Firebase.js';
import { setProjectImage } from './FileStorage';

const database = firebase.database();

// adds a project to the database given these information.
// calls the callback with the new project ID as the only argument.
export function addAProject(name, ownerID, tagline, region,
                            description, joinProjectQuestion,
                            tags, picture, callback) {

  const tagList = tags.split(';').map((tag) => tag.trim());
  const projData =  {
    name: name,
    owner: ownerID,
    tagline: tagline,
    region: region,
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
  if (picture.length !== 0) {
    setProjectImage(newPid, picture, () => callback(newPid));
  } else {
    callback(newPid);
  }
}
