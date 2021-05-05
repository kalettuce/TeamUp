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
                <LandingPage database={props.database}/>
            </Route>
            <Route exact path='/projects'>
                <FindAProjectPage database={props.database} />
            </Route>
            <Route path='/projects/:project'>
                <ProjectDetailsPage database={props.database} />
            </Route>
            <Route exact path='/users'>
                <UsersListPage database={props.database}/>
            </Route>
            <Route path='/users/:username'>
                <UserProfilePage database={props.database}/>
            </Route>
        </Switch>
    );
}

export default Router;
