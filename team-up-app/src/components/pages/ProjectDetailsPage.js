import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Card, CardMedia, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle";
import { fetchProjectById } from '../../utils/FindProjects.js'
import { fetchUserById, fetchUsersById } from '../../utils/FindUsers.js'
import { useAuth } from '../../utils/AuthContext';
import ProjectDetailsTabs from '../containers/ProjectDetailsTabs.js';
import JoinAProjectPage from '../containers/JoinAProjectDialog.js';
import { regionToFlag } from '../containers/RegionSelect';
import placeholder from '../../placeholder.jpg';
import StyledTags from "../presentation/StyledTags.js";
import { fetchRequestsByProject, fetchRequestsBySender } from "../../utils/FindMessages.js";

function ProjectDetailsPage() {
    const classes = useStyles();
    const [project, setProject] = useState(null);
    const [owner, setOwner] = useState(null);
    const [dom, setDom] = useState('');
    const [joinProjectOpen, setJoinProjectOpen] = useState(false);
    const [currUserJustRequested, setCurrUserJustRequested] = useState(false);
    const [currUserRequests, setCurrUserRequests] = useState(null);
    const [joinedMembers, setJoinedMembers] = useState([]);
    const [requests, setRequests] = useState([]);
    const { pid } = useParams();
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    }

    // TODO: Send to NotFoundPage (404) if a project cannot be found
    useEffect(() => {
        fetchProjectById(pid, setProject);
        fetchRequestsByProject(pid, setRequests);
    }, [pid]);

    useEffect(() => {
        if (project) {
            fetchUserById(project.owner, setOwner);
            if (project.members) {
                fetchUsersById(project.members, setJoinedMembers);
            }
        }
    }, [project]);

    useEffect(() => {
        if (currentUser) {
            fetchRequestsBySender(currentUser.uid, setCurrUserRequests)
        }
    }, [currentUser]);

    useEffect(() => {
        if (project && owner && joinedMembers && requests) {
            
            // TODO: Button is buggy here; help fix please
            var isCurrUserProject, 
                currUserHasJoined,
                currUserHasRequested = false;
            if (currentUser && currUserRequests) {
                isCurrUserProject = project.owner === currentUser.uid;
                currUserHasJoined = project.members ? 
                    project.members.includes(currentUser.uid) : false;
                currUserHasRequested = currUserRequests
                                        .map((request) => request.to)
                                        .includes(pid);
            }
            
            console.log(currUserHasRequested)
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
                            ownerName={owner.name}
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
                        <Grid container spacing={5}>
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
                                    joinedMembers={joinedMembers}
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
                                    {isCurrUserProject ? 'You created this project' : owner.name}
                                </Typography>
                                <br/>
                                <Typography variant={'h6'}>Tags</Typography>
                                <StyledTags tagList={project.tags}/>
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
        classes.description, owner, currentUser, pid, joinedMembers,
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
