import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fetchProjectById } from '../../utils/FindProjects.js'

function ProjectDetailsPage() {
    const classes = useStyles();
    const {pid} = useParams();
    const [project, setProject] = useState(null);
    const [dom, setDom] = useState('');

    useEffect(() => {
        fetchProjectById(pid, setProject);
    }, [pid]);
    useEffect(() => {
        if (project != null) {
            setDom(
                (<Paper elevation={3} className={classes.root}>
                    <h2>{project.name}</h2>
                    <p>Description: {project.description}</p>
                    <p>Tags: {Object.entries(project.tags).map(([_, tag]) => <div>{tag}</div>)}</p>
                </Paper>)
            )
        }
    }, [project, classes.root]);

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
        textAlign:'left',
    },
    card: {
        minWidth: "250px",
    },
}));
