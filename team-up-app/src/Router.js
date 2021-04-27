import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from "./components/pages/LandingPage";
import FindAProjectPage from "./components/pages/FindAProjectPage";
import UserProfilePage from "./components/pages/UserProfilePage";
import UsersListPage from "./components/pages/UsersListPage";
import ProjectDetailsPage from "./components/pages/ProjectDetailsPage";

// Import page component and add its routes here
function Router() {
    return (
        <Switch>
            <Route exact path='/' component={ LandingPage }/>
            <Route exact path='/projects' component={ FindAProjectPage }/>
            <Route exact path='/profile' component={ UserProfilePage }/>
            <Route exact path='/allusers' component={ UsersListPage }/>
            <Route exact path='/projectdetails' component={ ProjectDetailsPage }/>
        </Switch>
    );
}

export default Router;