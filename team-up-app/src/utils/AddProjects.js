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
    members: [ownerID],
    invitations_sent: []
  };

  // Add project
  const newPid = database.ref().child('projects').push(projData).key;

  // Update user to include owned project
  database.ref('/users/' + ownerID + '/owned_projects/').push(newPid);

  // Upload picture and callback
  if (picture.length !== 0) {
    setProjectImage(newPid, picture, () => callback(newPid));
  } else {
    callback(newPid);
  }
}
