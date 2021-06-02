import { NOT_FOUND } from './NotFoundPage';
import { useParams, useHistory } from 'react-router-dom';
import { fetchUserById } from '../../utils/FindUsers.js';
import React, { useState, useEffect } from "react";
import { fetchProjectById } from '../../utils/FindProjects.js'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProjectCard from '../presentation/ProjectCard';
import Pagination from '@material-ui/lab/Pagination';
import SearchBar from '../containers/SearchBar';
import { useAuth } from '../../utils/AuthContext';
import Fuse from 'fuse.js';

function OwnedProjects() {
    const classes = useStyles();

    const history = useHistory();
    const {uid} = useParams();

    const {currentUser} = useAuth();

    const [userProfile, setUserProfile] = useState(null);
    const [projectsList, setProjectsList] = useState({});
    const [page, setPage] = useState(1);
    const [dom, setDom] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [projects, setProjects] = useState([]);
    const [projectKeys, setProjectKeys] = useState([]);
    const [projectsToShow, setProjectsToShow] = useState([]);

    const itemsPerPage = 6;
    const title = "OWNED PROJECTS";

    useEffect(() => {
        if (currentUser == null || currentUser.uid !== uid) {
            history.push("/" + NOT_FOUND);
        } else if (uid != null) {
            fetchUserById(uid, setUserProfile);
        } else {
            setUserProfile(null);
        }
        // eslint-disable-next-line
    }, [uid, currentUser]);


    function updateProjects(pid, details) {
        let p = projectsList;
        p[pid] = details;
        setProjectsList(p);

        console.log(projectsList);

        setProjects(Object.values(projectsList));
        setProjectKeys(Object.keys(projectsList));
        setProjectsToShow(Object.entries(projectsList));
    }

    useEffect(() => {
        // Send to NotFoundPage (404) if a user cannot be found
        if (userProfile === NOT_FOUND) {
            history.push("/" + NOT_FOUND);
        } else if (userProfile != null) {
            const ownedIDs = userProfile.owned_projects;

            if (ownedIDs != null) {
                for (const pid of Object.keys(ownedIDs)) {
                    if (userProfile.owned_projects[pid]) {
                        fetchProjectById(pid, (details) => updateProjects(pid, details));
                    }
                }
            }
        }
    // eslint-disable-next-line
    }, [userProfile]);

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
        }
    }, [classes.card, projectsToShow, page]);

    const handleChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = (query) => {
        if (!query && projects !== null && projectKeys !== null) {
            setProjectsToShow(Object.entries(projects));
        } else {
            const options = {
                findAllMatches: true,
                threshold: 0.1,
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
                    [projectKeys[(result[1].refIndex).toString()], result[1].item])
            )
            setProjectsToShow(resultProjects);
        }
    }

    return (
        <div>
            <Grid
                container
                justify="center"
                className={classes.root}>
                <Typography className={classes.title}>{title}</Typography>
                <SearchBar
                    placeholder="Search for projects"
                    onSearch={handleSearch}/>
                <Grid
                    className={classes.over}
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

export default OwnedProjects;

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
        minWidth: '250px',
        display: 'flex',
    },
    pagination: {
        marginTop: '20px',
        marginBottom: '30px',
    },
    over: {
        paddingTop: '20px',
    }
}));