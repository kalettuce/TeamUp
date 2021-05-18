# Team-Up (CSE403 Project)

For additional user and developer documentation, please visit the project [Wiki](https://github.com/kalettuce/TeamUp/wiki).

## About the Project

It is challenging for small teams to recruit new members for projects; many must resort to generic social platforms like Facebook or Instagram to raise exposure, but their posting is often drowned out by other posts and unable to be found by those who would be interested. **Team-Up** aims to address this problem: it is a community-based web platform that is specifically designed to help connect people to projects. Team-Up allows people to post projects that they're working on, a description of their project, and the roles of team members that they're looking for. It also enables people to join projects that interest them, and project creators can invite others to join their project. Team-Up is unique because our hope is that the type of projects it helps to centralize are small, student-led, or non-profit projects that are looking for contributors. Our project differs from other platforms because it places strict emphasis on team-building for a diverse range of small-scale projects rather than job-hunting, networking, or larger, corporate recruitment. Whether someone is starting a student organization or seeking collaborators to create a new app, Team-Up is there to help bring exposure to their project and build a strong and passionate team.

## Repository Structure

Our repository has a basic structure with the generic files stored in the top-level directory and all of the major files contained in the team-up directory.

* TeamUp/ (top level directory)
	* team-up-app/ (React app)
		* public/ (stores public files for when the website is deployed)
		* src/ (stores source code)
			* components/ (stores app components)
				* pages/
				* containers/
				* presentation/
			* utils/ (stores utility functions)

## Currently Operational Use Cases
- [x] Searching for projects
	1. From the homepage, press the *FIND PROJECTS* button.
	2. Browse through projects using the pagination feature at the bottom of the page.
	3. Filter projects by name or tag using the search box. Results are ordered by relevance.
	4. Press on a project to view its details on another page.

## Instructions
### Build

Please have the latest version of [NPM](https://www.npmjs.com/get-npm) set up on your machine by installing [Node.js](https://nodejs.org/en/). In addition, we recommend using Mac, Linux, or WSL to run these scripts.

1. From the parent directory, navigate to the `team-up-app/` directory using `cd team-up-app`.
2. Run `npm install` to install dependencies.
3. To test and build the app, run the script `test_and_build.sh` on Mac/Linux with `./test_and_build.sh`. On WSL, you can use `bash test_and_build` in Windows command prompt. This script is equivalent to `npm run test` followed by `npm run build`.

### Testing

1. From the parent directory, navigate to the `team-up-app/` directory using `cd team-up-app`.
2. Run `npm run test`. Tests are located in `App.test.js`.

### Running

This app is deployed live at [team-up-de57f.web.app/](https://team-up-de57f.web.app/). Alternatively, you can run it locally using these steps:
1. From the parent directory, navigate to the `team-up-app/` directory using `cd team-up-app`.
2. Follow the **Build** instructions above to generate a development build.
3. Run `npm start` to start the development server on `localhost:3000`.
4. Visit `localhost:3000` in the web browser to visit the web app.
