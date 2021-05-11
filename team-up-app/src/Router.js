import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./components/pages/LandingPage";
import FindAProjectPage from "./components/pages/FindAProjectPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import UsersListPage from "./components/pages/UsersListPage";
import ProjectDetailsPage from "./components/pages/ProjectDetailsPage";

// Import page component and add its routes here.
// URL parameters are denoted by : for non-exact paths/
// Use useParams() in the child component to retrieve the parameter.
function Router(props) {
    return (
        <Switch>
            <Route exact path='/'>
                <LandingPage />
            </Route>
            <Route exact path='/projects'>
                <FindAProjectPage />
            </Route>
            <Route path='/projects/:pid'>
                <ProjectDetailsPage />
            </Route>
            <Route exact path='/users'>
                <UsersListPage />
            </Route>
            <Route path='/users/:username'>
                <UserProfilePage />
            </Route>
        </Switch>
    );
}

export default Router;
