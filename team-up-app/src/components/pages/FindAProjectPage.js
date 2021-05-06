import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../presentation/ProjectCard';
import Pagination from '@material-ui/lab/Pagination';
import { fetchAllProjects } from '../../utils/FindProjects.js'

// props: 
// database: the firebase rtdb
function FindAProjectPage(props) {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [dom, setDom] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    // const projectsList = [0,1,2,3,4,5,6,7,8,9,10]; // sample
    // const projectDesc = "Project description here" // sample
    const itemsPerPage = 6;
  
    const title = "FIND A PROJECT";
    fetchAllProjects((projectsList) => {
        setDom(Object.entries(projectsList)
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map(([projectID, project]) => (
            <Grid key={projectID} item xs={4}>
                <ProjectCard
                    projectTitle={project.name}
                    projectDesc={project.description}
                    projectID={projectID}
                />
            </Grid>
        )));
        setTotalPages(Math.ceil(projectsList.length / itemsPerPage));
    });
    // projects.forEach(([projectID, project]) => {
        // dom += <Grid key={projectID} item xs={4}>
                 // <ProjectCard
                     // projectTitle={project.name}
                     // projectDesc={project.description}
                     // projectID={projectID}
                 // />
               // <Grid />
    // });

    const handleChange = (newPage) => {
      setPage(newPage);
    };
  
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
    }
}));









                    /*{projectsList
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map(([projectID, project]) => (
                        <Grid key={projectID} item xs={4}>
                            <ProjectCard
                                projectTitle={project.name}
                                projectDesc={project.description}
                                projectID={projectID}
                            />
                        </Grid>
                    ))}*/
