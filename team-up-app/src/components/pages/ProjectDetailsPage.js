import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fetchProjectById } from '../../utils/FindProjects.js'
import { fetchUserById } from '../../utils/FindUsers.js'
import { Typography, Card, CardMedia, Grid, Button } from '@material-ui/core';

function ProjectDetailsPage() {
    const classes = useStyles();
    const {pid} = useParams();
    const [project, setProject] = useState(null);
    const [user, setUser] = useState(null);
    const [dom, setDom] = useState('');

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
                    <Typography className={classes.title}>PROJECT DETAILS</Typography>
                    <br/>
                    <Paper elevation={3} className={classes.root}>
                        <Card elevation={0}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={project.image_url || "https://husmen.xyz/portfolio/scope-timer/featured.png"}
                            />
                        </Card>
                        <br/>
                        <Grid container>
                            <Grid item xs={6}>
                            <Typography variant={'h4'}>{project.name}</Typography>
                            </Grid>
                            <Grid item xs={6} align={"right"}>
                            <Button
                                className={classes.button}
                                variant="outlined"
                            >JOIN PROJECT</Button>
                            </Grid>
                        </Grid>
                        <Typography variant={'h5'} color="textSecondary">{project.tagline}</Typography>
                        <br/>
                        <Typography variant={'h6'}>Owner: {user.name}</Typography>
                        <br/>
                        <Typography variant={'h5'}>Description</Typography>
                        <Typography variant={'body1'}>{project.description}</Typography>
                        <br/>
                        <br/>
                        <Typography variant={'h5'}>Tags</Typography>
                        <Typography variant="body2" color="textSecondary">{project.tags.toString()}</Typography>
                        <br/>
                        <br/>
                    </Paper>
                    </div>)
            )
        }
    }, [project, user, classes.root, classes.title, classes.button]);

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
    card: {
        minWidth: "250px",
    },
    button: {
        fontSize: '1rem',
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        border: '1px solid',
        borderRadius: 0,
    }
}));
