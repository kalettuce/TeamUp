import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../presentation/ProjectCard';
import Pagination from '@material-ui/lab/Pagination';
import SearchBar from '../containers/SearchBar';
import { fetchAllProjects } from '../../utils/FindProjects.js'
import Fuse from 'fuse.js';
import NavigationBar from '../containers/NavigationBar';

function FindAProjectPage() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [dom, setDom] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [projects, setProjects] = useState(null);
    const [projectsToShow, setProjectsToShow] = useState(null);
    const itemsPerPage = 6;
    
    // Fetches projects list and number of projects
    useEffect(() => {
        fetchAllProjects((projectsList) => {
            setProjects(projectsList);
            setProjectsToShow(Object.entries(projectsList));
        });
    }, []);

    // Sets total number of pages for pagination; updates
    // whenever the list of projects to show changes
    useEffect(() => {
        if (projectsToShow !== null) {
            setTotalPages(Math.ceil(projectsToShow.length / itemsPerPage));
        }
    }, [projectsToShow]);

    useEffect(() => {
        // Projects loaded asyncrhonously
        if (projectsToShow !== null) {
            setDom(projectsToShow
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map(([projectID, project]) => (
            <Grid
                className={classes.card}
                key={projectID}
                item
                xs={4}>
                <ProjectCard
                    projectTitle={project.name}
                    projectTagline={project.tagline}
                    projectID={projectID}
                    projectTags={project.tags}
                    projectImage={project.image_url}
                />
            </Grid>
            )));
        }
    }, [classes.card, projectsToShow, page]);

    const handleChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = (query) => {
        if (!query && projects !== null) {
            setProjectsToShow(Object.entries(projects));
        } else {
            const options = {
                findAllMatches: true,
                threshold: 0.3,
                keys: [
                    {
                        name: "name",
                        weight: 2
                    },
                    "tags",
                ]
            };
    
            const fuse = new Fuse(projects, options);
            const resultProjects = [];
            Object.entries(fuse.search(query))
                               .map((result) => 
                resultProjects.push(
                    [(result[1].refIndex).toString(), result[1].item]
                )
            );
            setProjectsToShow(resultProjects);
        }
    }

    const title = "FIND A PROJECT";

    return (
        <div>
            <NavigationBar />
            <Grid
                container
                justify="center"
                className={classes.root}>
                <Typography className={classes.title}>{title}</Typography>
                <SearchBar
                    placeholder="Search for projects"
                    onSearch={handleSearch}/>
                <Grid
                    container
                    spacing={3}
                    justify="left">
                    
                    {dom}
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
            </Grid>
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
        textAlign:'left',
    },
    card: {
        minWidth: "250px",
    },
}));