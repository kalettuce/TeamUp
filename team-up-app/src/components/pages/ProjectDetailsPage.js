import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { fetchProjectById } from '../../utils/FindProjects.js'
import { fetchUserById } from '../../utils/FindUsers.js'
import { Typography, Card, CardMedia, Grid, Button } from '@material-ui/core';
import { regionToFlag } from '../containers/RegionSelect';
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle";
import JoinAProjectPage from './JoinAProjectPage.js';
import { useAuth } from '../../utils/AuthContext';
import { useRouteChanger } from '../../utils/RouteChanger';

function ProjectDetailsPage() {
    const classes = useStyles();
    const [project, setProject] = useState(null);
    const [user, setUser] = useState(null);
    const [dom, setDom] = useState('');
    const [joinProjectOpen, setJoinProjectOpen] = useState(false);
    const { pid } = useParams();
    const { currentUser } = useAuth();
    const changeRoute = useRouteChanger();

    const handleLogin = () => {
        changeRoute("/login");
    }

    useEffect(() => {
        fetchProjectById(pid, setProject);
    }, [pid]);

    useEffect(() => {
        if (project != null) {
            fetchUserById(project.owner, setUser);
        }
    }, [project]);

    useEffect(() => {
        if (project != null && user != null) {
            setDom(
                (<div>
                    <Dialog
                        onClose={() => setJoinProjectOpen(false)}
                        open={joinProjectOpen}>
                        <DialogTitle>
                            Join this project
                        </DialogTitle>
                        <JoinAProjectPage
                            project={project}
                            ownerName={user.name}
                            />
                    </Dialog>
                    <Typography className={classes.title}>PROJECT DETAILS</Typography>
                    <br/>
                    <div className={classes.root}>
                        <Card elevation={0}>
                            <CardMedia
                                component="img"
                                height="300"
                                image={project.image_url || "https://husmen.xyz/portfolio/scope-timer/featured.png"}
                            />
                        </Card>
                        <br/>
                        <Grid container spacing={10} >
                            <Grid item xs={9}>
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
                            <Typography variant={'h5'}>Project Information</Typography>
                            <Typography
                                className={classes.description}
                                variant={'body1'}>
                                    {project.description}
                            </Typography>
                            </Grid>
                            <Grid item xs={3} align={"right"}>
                            <Button
                                className={classes.button}
                                variant="outlined"
                                onClick={currentUser ? () => setJoinProjectOpen(true) : handleLogin}
                            >{currentUser ? 'JOIN PROJECT' : 'LOG IN TO JOIN'}</Button>
                            <div align={"left"}>
                                <Typography variant={'h6'}>Region</Typography>
                                <Typography variant={'body1'}>
                                <span>{project.region ? regionToFlag(project.region[1]) : ''} </span>
                                {project.region ? project.region[0] : "Global"}
                                </Typography>
                                <br/>
                                <Typography variant={'h6'}>Creator</Typography>
                                <Typography variant={'body1'}>
                                    {currentUser && project.owner === currentUser.uid ? 
                                        'You created this project' : user.name}
                                </Typography>
                                <br/>
                                <Typography variant={'h6'}>Tags</Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary">
                                        {project.tags.toString()}
                                </Typography>
                            </div>
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
    }, [project, joinProjectOpen, classes.projectTitle, 
        classes.description, user, currentUser,
        classes.root, classes.title, classes.button]);

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
    description: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    card: {
        minWidth: "250px",
    },
    button: {
        width: '100%',
        fontSize: '1rem',
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        border: '1px solid',
        borderRadius: 0,
        marginBottom: 20,
    }
}));
