# Team Report (Status Update)
## Project meeting agenda
Discuss remaining steps for final project submission.

## Goals from last week
Finalize implementation to join/accept users to a project and user profile pages.

## Progress and issues
Joining a project, accepting/rejecting join requests, and delete projects functions are complete and integrated successfully with the back end. Made substantial improvements and bug fixes to the UI for the project details page. Added a 404 page for improved error handling redirects. User profile pages and user list pages have been implemented.

## Plans for next week
Complete user information pages implementation and finalize features for the minimum viable product.

# Team Member Contributions
## Goals from last week
* Chandra: Work on front-end for joining a new project and collaborate with Brian on getting it integrated with the database.
* Keith: Polish further the project details page and develop the user profile page.
* Brian: Fix the image storage permissions and write functions for sending requests and invitations in the database.
* Brandon: Add a user profile page and a user lookup page

## Progress and issues
* Chandra: Completed the front-end for joining a project, viewing/accepting/rejecting join requests, and deleting projects with conditional display based on current users’ relation towards a project (project owner, project member, etc.). Collaborated with Keith and Brian on integrating front-end read/write with the database. Added a 404 page for invalid URL redirects. Made improvements to the project details page UI.
* Keith: Redesigning mappings in the database with Brian. Implemented functions that handle join requests by interacting with the database.
* Brian: Implemented functions to add and fetch requests from the database, and a function to upload user images. Fixed security rules to allow requests and project deletion to work properly.
* Brandon: Created user profile pages and an all-users directory page with profile image upload features.

## Plans for next week
* Chandra: Add different options for search filtering. If there’s time, help improve user profile pages UI and improve visual styles.
* Keith: Add a “leave project” function for non-owner members of a project. If time allows, change the buttons in the nav bar to drop-down menus.
* Brian: Add functions for sending invitations to users, continue fixing security rules as problems arise. If there is time, add a notification system to tell users when their requests are accepted.
* Brandon: Add user search functionality. Add redirect to list of involved projects
