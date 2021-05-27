import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Card, CardMedia, Grid, Button, Dialog, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fetchProjectById } from '../../utils/FindProjects.js'
import { fetchUserById, fetchUsersById } from '../../utils/FindUsers.js'
import { useAuth } from '../../utils/AuthContext';
import ProjectDetailsTabs from '../containers/ProjectDetailsTabs.js';
import JoinAProjectPage from '../containers/JoinAProjectDialog.js';
import { regionToFlag } from '../containers/RegionSelect';
import placeholder from '../../placeholder.jpg';
import StyledTags from "../presentation/StyledTags.js";
import { fetchRequestsByProject, fetchRequestsBySender } from "../../utils/FindJoinRequests.js";
import DeleteProjectDialog from '../containers/DeleteProjectDialog';
import { NOT_FOUND } from './NotFoundPage';

function ProjectDetailsPage() {
    const classes = useStyles();
    const [project, setProject] = useState(null);
    const [owner, setOwner] = useState(null);
    const [dom, setDom] = useState('');
    const [joinProjectOpen, setJoinProjectOpen] = useState(false);
    const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);
    const [currUserJustRequested, setCurrUserJustRequested] = useState(false);
    const [currUserRequests, setCurrUserRequests] = useState(null);
    const [projectRequests, setProjectRequests] = useState([]);
    const [joinedMembers, setJoinedMembers] = useState([]);
    const { pid } = useParams();
    const { currentUser } = useAuth();
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    }

    useEffect(() => {
        fetchProjectById(pid, setProject);
    }, [pid]);

    useEffect(() => {
        // Send to NotFoundPage (404) if a project cannot be found
        if (project === NOT_FOUND) {
            history.push("/" + NOT_FOUND);
        } else if (project) {
            fetchUserById(project.owner, setOwner);
            if (project.members) {
                fetchUsersById(
                    Object.values(project.members), setJoinedMembers);
            }
        }
    }, [project, history]);

    useEffect(() => {
        if (currentUser) {
            fetchRequestsBySender(currentUser.uid, setCurrUserRequests)
        } else {
            setCurrUserRequests([]);
        }
    }, [currentUser]);
    
    // based on permissions
    useEffect(() => {
        if (project) {
            if (currentUser && project.owner === currentUser.uid) {
                fetchRequestsByProject(pid, setProjectRequests);
            } else {
                setProjectRequests([]);
            }
        }
    }, [project, currentUser, pid]);

    useEffect(() => {
        if (project && owner 
                    && joinedMembers 
                    && projectRequests) {

            var isCurrUserProject = false, 
                currUserHasJoined = false,
                currUserHasRequested = false;
            if (currentUser) {
                isCurrUserProject = project.owner === currentUser.uid;

                if (project.members) {
                    currUserHasJoined = Object.values(project.members)
                                              .includes(currentUser.uid);
                }

                if (currUserRequests) {
                    console.log(currUserRequests)
                    currUserHasRequested = Object.keys(currUserRequests)
                                                 .includes(pid);
                }
            }

            var buttonLabel = '';
            var buttonFunc;
            if (!currentUser) {
                buttonLabel = 'LOGIN TO JOIN';
                buttonFunc = handleLogin;
            } else if (isCurrUserProject) {
                buttonLabel = 'DELETE PROJECT';
                buttonFunc = () => setDeleteProjectOpen(true);
            } else if (currUserHasJoined) {
                buttonLabel = 'JOINED';
                buttonFunc = null;
            } else if (currUserHasRequested || currUserJustRequested) {
                buttonLabel = 'REQUEST SENT ✔';
                buttonFunc = null;
            } else {
                buttonLabel = 'REQUEST TO JOIN';
                buttonFunc = () => setJoinProjectOpen(true);
            }
 
            setDom(
                (<div>
                    <Dialog
                        onClose={() => setJoinProjectOpen(false)}
                        open={joinProjectOpen}>
                        <DialogTitle>
                            Confirm request
                        </DialogTitle>
                        <JoinAProjectPage
                            project={{"id": pid, "info": project}}
                            ownerName={owner.name}
                            open={setJoinProjectOpen}
                            setCurrUserJustRequested={setCurrUserJustRequested}
                            />
                    </Dialog>
                    <Dialog
                        onClose={() => setDeleteProjectOpen(false)}
                        open={isCurrUserProject && deleteProjectOpen}>
                        <DialogTitle>
                            Confirm delete
                        </DialogTitle>
                        <DeleteProjectDialog 
                            pid={pid}
                            open={setDeleteProjectOpen}/>
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
                                    &#8592; Back
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
                                    requests={projectRequests}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    disabled={(currUserHasJoined && !isCurrUserProject)
                                                || currUserHasRequested
                                                || currUserJustRequested}
                                    className={isCurrUserProject ? classes.buttonDelete : classes.button}
                                    variant={"outlined"}
                                    onClick={buttonFunc}>
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
    }, [project, joinProjectOpen, projectRequests, currUserRequests, pid,
        currUserJustRequested, history, owner, currentUser, joinedMembers, 
        deleteProjectOpen, 
        classes.backButton, classes.buttonDelete, classes.description,
        classes.root, classes.title, classes.button, classes.projectTitle]);

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
