# Team Report (Status Update)
## Project meeting agenda
Discuss our timeline for the last couple weeks and whether we will be able to complete certain features we had planned.
Add interface for uploading images upon creating a new project.

## Goals from last week
Make progress on implementing functionality to create and join a project.

## Progress and issues
We implemented the functionality for users to create a new project and are in-progress for finishing the functionality for joining a project. We also wrote detailed developer and user documentation for our web app and put it in the Wiki of our GitHub repository.

## Plans for next week
Finalize implementation to join/accept users to a project and user profile pages.

# Team Member Contributions
## Goals from last week
* Chandra: Work on a form component to post a new project and work on integrating it with the database.
* Keith: Polish further the project details page by adding links to other pages; perhaps start a skeleton user profile page too.
* Brian: Figure out sensible access rules for the Firebase database and storage, maybe write some functions for sending requests and invitations in the database
* Brandon: Create front-end page for user profile creation/edits, figure out how to pull/push user data to the database

## Progress and issues
* Chandra: Developed the front-end for the form component for creating a new project.
* Keith: Helped to integrate the form component for creating a new project with the database. Couldn’t get to the user profile pages, but will work on it this coming week.
* Brian: Added rules to the database to restrict users from editing other people’s stuff. However, the image storage has no way to read the database to see who should have permission, so its permissions are all open for now.
* Brandon: Improved sign-up page and validation messages

## Plans for next week
* Chandra: Work on front-end for joining a new project and collaborate with Brian on getting it integrated with the database.
* Keith: Polish further the project details page and develop the user profile page.
* Brian: Fix the image storage permissions and write functions for sending requests and invitations in the database.
* Brandon: Add a user profile page and a user lookup page
