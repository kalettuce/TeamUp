import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { fetchProjectById } from '../../utils/FindProjects.js'
import { fetchUserById, fetchUsersById } from '../../utils/FindUsers.js'
import { Typography, Card, CardMedia, Grid, Button } from '@material-ui/core';
import { regionToFlag } from '../containers/RegionSelect';
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle";
import JoinAProjectPage from '../containers/JoinAProjectDialog.js';
import { useAuth } from '../../utils/AuthContext';
import { useHistory } from 'react-router-dom';
import ProjectDetailsTabs from '../containers/ProjectDetailsTabs.js';
import placeholder from '../../placeholder.jpg';

function ProjectDetailsPage() {
    const classes = useStyles();
    const [project, setProject] = useState(null);
    const [user, setUser] = useState(null);
    const [dom, setDom] = useState('');
    const [joinProjectOpen, setJoinProjectOpen] = useState(false);
    const [currUserJustRequested, setCurrUserJustRequested] = useState(false);
    const [joinedMembers, setJoinedMembers] = useState([]);
    const [joinedMemberNames, setJoinedMemberNames] = useState(null);
    const [requests, setRequests] = useState(["request1", "request2"]); // TODO: write function to get requests
    const { pid } = useParams();
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    }

    // TODO: Send to NotFoundPage (404) if a project cannot be found
    useEffect(() => {
        fetchProjectById(pid, setProject);
    }, [pid]);

    useEffect(() => {
        if (project) {
            fetchUserById(project.owner, setUser);
            fetchUsersById(project.members, setJoinedMembers);
        }
    }, [project]);

    useEffect(() => {
        if (project) {
            if (project.members) {
                if (joinedMembers && joinedMembers.length === project.members.length) {
                    var temp = []
                    joinedMembers.forEach((member) => {
                        temp.push(member.name)
                    });
                    setJoinedMemberNames(temp);
                }
            } else {
                setJoinedMemberNames([]);
            }
        }
    }, [project, joinedMembers]);

    useEffect(() => {
        if (project && user && joinedMemberNames) {
            var isCurrUserProject, 
                currUserHasJoined,
                currUserHasRequested = false;
            if (currentUser) {
                isCurrUserProject = project.owner === currentUser.uid;
                currUserHasJoined = project.members ? 
                    project.members.includes(currentUser.uid) : false;
                currUserHasRequested = project.requests_received ?
                    currentUser.uid in project.requests_received : false;
            }

            var buttonLabel = '';
            if (!currentUser) {
                buttonLabel = 'LOG IN TO JOIN';
            } else if (isCurrUserProject) {
                buttonLabel = 'DELETE PROJECT'; //TODO: write delete function
            } else if (currUserHasJoined) {
                buttonLabel = 'JOINED ✔';
            } else if (currUserHasRequested || currUserJustRequested) {
                buttonLabel = 'PENDING';
            } else {
                buttonLabel = 'JOIN PROJECT';
            }
 
            setDom(
                (<div>
                    <Dialog
                        onClose={() => setJoinProjectOpen(false)}
                        open={joinProjectOpen}>
                        <DialogTitle>
                            Join this project
                        </DialogTitle>
                        <JoinAProjectPage
                            project={{"id": pid, "info": project}}
                            ownerName={user.name}
                            open={setJoinProjectOpen}
                            setCurrUserJustRequested={setCurrUserJustRequested}
                            />
                    </Dialog>
                    <br/>
                    <div className={classes.root}>
                        <Card elevation={0}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={project.image_url || placeholder}
                            />
                        </Card>
                        <br/>
                        <Grid container spacing={10}>
                            <Grid item xs={9}>
                                <Button
                                    disableRipple
                                    className={classes.backButton}
                                    onClick={() => history.goBack()}>
                                    🡠 Back
                                </Button>
                                <Typography
                                    className={classes.projectTitle}
                                    variant={'h4'}>
                                        {project.name}
                                </Typography>
                                <Typography
                                    variant={'h5'}
                                    color="textSecondary">
                                        {project.tagline}
                                </Typography>
                                <br/>
                                <ProjectDetailsTabs
                                    project={project}
                                    joinedMemberNames={joinedMemberNames}
                                    currUserHasJoined={currUserHasJoined}
                                    isCurrUserProject={isCurrUserProject}
                                    requests={requests}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    disabled={(currUserHasJoined && !isCurrUserProject)
                                                || currUserHasRequested
                                                || currUserJustRequested}
                                    className={isCurrUserProject ? classes.buttonDelete : classes.button}
                                    variant={"outlined"}
                                    onClick={currentUser ? () => setJoinProjectOpen(true) : handleLogin}>
                                        {buttonLabel}
                                </Button>
                                <Typography variant={'h6'}>Region</Typography>
                                <Typography variant={'body1'}>
                                <span>{project.region ? regionToFlag(project.region[1]) : ''} </span>
                                    {project.region ? project.region[0] : "Global"}
                                </Typography>
                                <br/>
                                <Typography variant={'h6'}>Creator</Typography>
                                <Typography variant={'body1'}>
                                    {isCurrUserProject ? 'You created this project' : user.name}
                                </Typography>
                                <br/>
                                <Typography variant={'h6'}>Tags</Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary">
                                        {project.tags.toString()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </div>)
            )
        }
    // eslint-disable-next-line
    }, [project, joinProjectOpen, classes.projectTitle, requests,
        classes.description, user, currentUser, pid, joinedMemberNames,
        classes.root, classes.title, classes.button, currUserJustRequested]);

    return (
        <div>
            {dom}
        </div>
    );
}

export default ProjectDetailsPage;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '20px',
        paddingLeft: '200px',
        paddingRight: '200px',
        width: '70%',
        margin: 'auto',
        background: '#FFFFFF',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 40,
        paddingTop: '100px',
        paddingBottom: '15px',
        textAlign:'center',
    },
    projectTitle: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 32,
    },
    card: {
        minWidth: "250px",
    },
    button: {
        width: '100%',
        fontSize: '1rem',
        fontWeight: 700,
        color: "black",
        background:'#FFFFFF',
        border: '1px solid',
        borderRadius: 0,
        marginBottom: 20,
    },
    buttonDelete: {
        width: '100%',
        fontSize: '1rem',
        fontWeight: 700,
        color: '#fff',
        background:'#e74f4e',
        border: '1px solid black',
        borderRadius: 0,
        marginBottom: 20,
        "&:hover": {
            background: '#e74f4e',
        }
    },
    backButton: {
        padding: "0px",
        marginBottom: "10px",
        minHeight: 0,
        minWidth: 0,
    }
}));
