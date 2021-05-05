import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../presentation/ProjectCard';
import Pagination from '@material-ui/lab/Pagination';

function FindAProjectPage() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const projectsList = [0,1,2,3,4,5,6,7,8,9,10]; // sample
    const projectDesc = "Project description here" // sample
    const itemsPerPage = 6;
    const totalPages = Math.ceil(projectsList.length / itemsPerPage);
  
    const title = "FIND A PROJECT";

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
                    {projectsList
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((projectTitle) => (
                        <Grid key={projectTitle} item xs={4}>
                            <ProjectCard
                                projectTitle={projectTitle}
                                projectDesc={projectDesc}
                                //projectID={projectID}
                                />
                        </Grid>
                    ))}
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