import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from "../components/pages/LandingPage";
import FindAProjectPage from "../components/pages/FindAProjectPage";
import UserProfilePage from "../components/pages/UserProfilePage";
import UsersListPage from "../components/pages/UsersListPage";
import ProjectDetailsPage from "../components/pages/ProjectDetailsPage";
import { AuthProvider } from "./AuthContext";
import Signup from "../components/pages/SignupPage";
import Login from "../components/pages/LoginPage";
import NavigationBar from '../components/containers/NavigationBar';
import CreateAProjectPage from '../components/pages/CreateAProjectPage';
import NotFoundPage from '../components/pages/NotFoundPage';
import JoinedProjects from '../components/pages/JoinedProjects';

// Import page component and add its routes here.
// URL parameters are denoted by colon (:)
// Use useParams() in the child component to retrieve the parameter.
function Router(props) {
    return (
        <AuthProvider>
            <NavigationBar />
            <Switch>
                <Route
                    exact path='/'
                    component={LandingPage}/>
                <Route 
                    exact path='/projects'
                    component={FindAProjectPage}/>
                <Route
                    exact path='/createproject'
                    component={CreateAProjectPage}/>
                <Route
                    exact path='/projects/:pid'
                    component={ProjectDetailsPage}/>
                <Route
                    exact path='/users'
                    component={UsersListPage}/>
                <Route
                    exact path='/users/:uid'
                    component={UserProfilePage}/>
                <Route
                    exact path='/joinedprojects/:uid'
                    component={JoinedProjects}/>
                <Route
                    exact path='/signup'
                    component={Signup}/>
                <Route
                    exact path='/login'
                    component={Login}/>
                <Route
                    path='*'
                    component={NotFoundPage}/>
            </Switch>
        </AuthProvider>
    );
}

export default Router;
