import firebase from './Firebase.js';

const database = firebase.database();

// adds a project to the database given these information.
// returns the new project ID.
export function addAProject(name, ownerID, tagline, time_zone,
                            description, application, tags) {
  let tagList = tags.split(';').map((tag) => tag.trim());
  let projData =  {
    name: name,
    owner: ownerID,
    tagline: tagline,
    time_zone: time_zone,
    description: description,
    application: application,
    tags: tagList,
    members: [],
    invitations_sent: []
  };

  let newPid = database.ref().child('projects').push().key;
  let updates = {};
  updates['/projects/' + newPid] = projData;
  database.ref().update(updates);

  return newPid;
}
