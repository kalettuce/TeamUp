import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../presentation/ProjectCard';
import Pagination from '@material-ui/lab/Pagination';
import SearchBar from '../containers/SearchBar';
import { fetchAllProjects } from '../../utils/FindProjects.js'
import { fetchUserById } from '../../utils/FindUsers'
import Fuse from 'fuse.js';
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useAuth } from '../../utils/AuthContext';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function FindAProjectPage() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [dom, setDom] = useState('');
    const [filterByUserTags, setFilterByUserTags] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [projects, setProjects] = useState(null);
    const [projectsForSearch, setProjectsForSearch] = useState(null);
    const [projectKeys, setProjectKeys] = useState(null);
    const [projectsToShow, setProjectsToShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const [queryInput, setQueryInput] = useState('');
    const { currentUser } = useAuth();

    const itemsPerPage = 6;
    const title = "EXPLORE PROJECTS";
    
    const handleChange = (newPage) => {
        setPage(newPage);
    };

    // Fetches projects list and number of projects
    useEffect(() => {
        fetchAllProjects((projectsList) => {
            setProjects(Object.entries(projectsList));
            setProjectsForSearch(Object.values(projectsList));
            setProjectsToShow(Object.entries(projectsList));
            setProjectKeys(Object.keys(projectsList));
        });
    }, []);

    useEffect(() => {
        if (currentUser !== null) {
            fetchUserById(currentUser.uid, setUserProfile);
        } else {
            setUserProfile(null);
        }
    }, [currentUser]);

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
                    projectID={projectID}
                    projectTitle={project.name}
                    projectTagline={project.tagline}
                    projectTags={project.tags}
                    projectImage={project.image_url}
                />
            </Grid>
            )));
            setLoading(false);
        }
    }, [classes.card, projectsToShow, page]);

    useEffect(() => {
        if (projects && projectsForSearch && projectKeys) {
            var resultProjects, tagsQuery = [];
            var keys = null;
            var query;
            if (userProfile && userProfile.tags) {
                tagsQuery = userProfile.tags.map((tag) => {
                    return { tags: tag }
                });
            }

            if (queryInput || filterByUserTags) {
                if (queryInput && filterByUserTags) {
                    tagsQuery.push({ tags: queryInput })
                    query = {
                        $and: [
                            { name: queryInput },
                            { $or: tagsQuery },
                        ],
                    }
                } else if (filterByUserTags) {
                    query = { $or: tagsQuery }
                    keys = ["tags"];
                } else {
                    query = queryInput;
                }

                resultProjects = performSearch(query, keys);
            } else {
                resultProjects = projects;
            }
            setProjectsToShow(resultProjects);
        }
    // eslint-disable-next-line
    }, [queryInput, filterByUserTags, projectKeys,
        projects, projectsForSearch, userProfile]);

    function performSearch(query, keyOption) {
        const resultProjects = [];
        var options = {
            findAllMatches: true,
            threshold: 0.1,
            ignoreLocation: true,
            keys: keyOption || [
                { 
                    name: "name", 
                    weight: 2 
                }, 
                "tags"
            ]
        };

        const fuse = new Fuse(projectsForSearch, options);
        Object.entries(fuse.search(query))
                           .map((result) => 
            resultProjects.push(
                [projectKeys[(result[1].refIndex).toString()], result[1].item])
        )

        return resultProjects;
    }

    return (
        <div>
            <Backdrop
                className={classes.backdrop}
                open={loading}>
                <CircularProgress
                    color="inherit"
                    variant="indeterminate"/>
            </Backdrop>
            <Grid
                container
                justify="center">
                <Typography className={classes.title}>{title}</Typography>
            </Grid>
            <Grid
                container
                justify="center"
                className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <SearchBar
                        placeholder="Search for projects by name or tags"
                        onSearch={setQueryInput}/>
                        <Typography
                            className={classes.numResults}
                            variant={"body2"}>
                            {`${projectsToShow ? projectsToShow.length : 0} projects found`}
                        </Typography>
                        <br/>
                    </Grid>
                    <Grid item xs={4}>
                        <ToggleButtonGroup
                            className={classes.filterButtons}
                            hidden={!currentUser}>
                            <ToggleButton
                                value={"check"}
                                selected={filterByUserTags}
                                onClick={() => {
                                    setFilterByUserTags(!filterByUserTags)
                                }}
                                >
                                Filter my interests
                                </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                </Grid>
                <Grid
                    container
                    alignItems="stretch"
                    spacing={3}>
                    {dom}
                </Grid>
                <Pagination
                    className={classes.pagination}
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
        paddingTop: '150px',
        paddingBottom: '40px',
    },
    filterButtons: {
        margin: '0 !important',
    },
    backdrop: {
        zIndex: 100,
        color: '#fff',
    },
    numResults: {
        paddingTop: 10,
    },
    card: {
        minWidth: '250px',
        display: 'flex',
    },
    pagination: {
        marginTop: '20px',
        marginBottom: '30px',
    }
}));