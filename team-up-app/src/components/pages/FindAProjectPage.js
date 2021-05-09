import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../presentation/ProjectCard';
import Pagination from '@material-ui/lab/Pagination';
import { fetchAllProjects, fetchProjectPage } from '../../utils/FindProjects.js'

function FindAProjectPage() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [dom, setDom] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 6;
    
    // Sets the total number of pages (couldn't figure out how to just count
    // children without fetching the entire list)
    useEffect(() => {
        fetchAllProjects((projectsList) => {
            setTotalPages(Math.ceil(projectsList.length / itemsPerPage));
        });
    }, []);

    // Gets the items of the next page
    // Depends on projectID being an integer from [0..(projects.length - 1)]
    useEffect(() => {
        const startItem = ((page - 1) * itemsPerPage).toString();
        const endItem = ((page * itemsPerPage) - 1).toString();
        fetchProjectPage(startItem, endItem, (projectsList) => {
            setDom(Object.entries(projectsList)
                        .map(([projectID, project]) => (
                <Grid
                    className={classes.card}
                    key={projectID}
                    item
                    xs={4}>
                    <ProjectCard
                        projectTitle={project.name}
                        projectDesc={project.description}
                        projectID={projectID}
                    />
                </Grid>
            )));
        });
      }, [page]);

    const handleChange = (newPage) => {
      setPage(newPage);
    };
  
    const title = "FIND A PROJECT";

    return (
        <div>
            <Grid
                container
                className={classes.root}>
                <Typography className={classes.title}>{title}</Typography>
                <Grid container spacing={3} justify="left" >
                    {dom}
                </Grid>
            </Grid>
            <Pagination
                count={totalPages}
                page={page}
                defaultPage={1}
                onChange={(e, newPage) => handleChange(newPage)}
                shape="rounded"
                size="large"
                showFirstButton
                showLastButton/>
        </div>
    );
}

export default FindAProjectPage;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '20px',
        paddingLeft: '200px',
        paddingRight: '200px',
        height: '100%',
        width: '100%',
        background: '#FFFFFF',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 40,
        paddingTop: '100px',
        paddingBottom: '15px',
    },
    card: {
        minWidth: "250px",
    }
}));