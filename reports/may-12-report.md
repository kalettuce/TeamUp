# Team Report (Status Update)
## Project meeting agenda
* Explore documentation together on how to add new data to the database.

## Goals from last week
Finalize and one single functionality in preparation for the beta release.

## Progress and issues
Added project search functionality, project details, login and signup authentication, and navigation bar. Completed beta release presentation, featuring the use case of searching for a project to join. Improved documentation for the repository.

## Plans for next week
Make progress on implementing functionality to create and join a project.

# Team Member Contributions
## Goals from last week
* Chandra: Add individual project detail pages and profile pages
* Keith: Add functionality for adding/retrieving real data with the front-end
* Brian: Research what needs to be stored for authentication and how to store it securely.
* Brandon: Finish the login/signup popups and create login functionality

## Progress and issues
* Chandra: Debugged find a project page to retrieve dummy data from the database and developed the front-end for individual project detail pages. Added a search bar in find a project page to filter results. Documented build/test instructions in the project README.md.
* Keith: Wrote functions using Firebase API to retrieve project and user data from the database and integrated it with the front-end. Wrote the skeleton for the project details page component.
* Brian: Learned to use Firebase Storage for image upload and retrieval in the project details page. Updated script to automate project build/test.
* Brandon: Learned to use Firebase Authentication and integrated an email and password user authentication with functional login and signup components. Navigation bar now appears at the top of all pages in the app.

## Plans for next week
* Chandra: Work on a form component to post a new project and work on integrating it with the database.
* Keith: Polish further the project details page by adding links to other pages; perhaps start a skeleton user profile page too.
* Brian: Figure out sensible access rules for the Firebase database and storage, maybe write some functions for sending requests and invitations in the database
* Brandon: Create front-end page for user profile creation/edits, figure out how to pull/push user data to the database
