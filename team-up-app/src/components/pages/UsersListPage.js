import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserCard from '../presentation/UserInfoCard';
import Pagination from '@material-ui/lab/Pagination';
import { fetchAllUsers } from '../../utils/FindUsers.js'
import { Backdrop, CircularProgress } from "@material-ui/core";
import SearchBar from '../containers/SearchBar';
import Fuse from 'fuse.js';

function UsersListPage() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [dom, setDom] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [userKeys, setUserKeys] = useState(null);
    const [usersToShow, setUsersToShow] = useState(null);

    const itemsPerPage = 8;
    const title = "PEOPLE";
    
    // Fetches user list and number of users
    useEffect(() => {
        fetchAllUsers((usersList) => {
            setUsers(Object.values(usersList));
            setUserKeys(Object.keys(usersList));
            setUsersToShow(Object.entries(usersList));
        });
    }, []);

    // Sets total number of pages for pagination; updates
    // whenever the list of users to show changes
    useEffect(() => {
        if (usersToShow !== null) {
            setTotalPages(Math.ceil(usersToShow.length / itemsPerPage));
        }
    }, [usersToShow]);

    useEffect(() => {
        // Users loaded asyncrhonously
        if (usersToShow !== null) {
            setDom(usersToShow
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map(([uid, user]) => (
            <Grid
                className={classes.card}
                key={uid}
                item
                xs={12}>
                <UserCard
                    image={user.image_url}
                    uid={uid}
                    name={user.name}
                    description={user.description}
                />
            </Grid>
            )));
            setLoading(false);
        }
    }, [classes.card, usersToShow, page]);

    const handleChange = (newPage) => {
        setPage(newPage);
    };

    const handleSearch = (query) => {
        if (!query && users !== null && userKeys !== null) {
            setUsersToShow(Object.entries(users));
        } else {
            const options = {
                findAllMatches: true,
                threshold: 0.1,
                keys: [
                    {
                        name: "name",
                        weight: 2
                    },
                ]
            };
    
            const fuse = new Fuse(users, options);
            const resultUsers = [];
            Object.entries(fuse.search(query))
                               .map((result) => 
                resultUsers.push(
                    [userKeys[(result[1].refIndex).toString()], result[1].item])
            )
            setUsersToShow(resultUsers);
        }
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
                justify="center"
                className={classes.root}>
                <Typography className={classes.title}>{title}</Typography>
                <SearchBar
                    placeholder="Search for users"
                    onSearch={handleSearch}/>
                <Grid
                    container>
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

export default UsersListPage;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '20px',
        height: '100%',
        width: '40%',
        background: '#FFFFFF',
        textAlign: 'center',
        margin: '0 auto',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 40,
        paddingTop: '150px',
        paddingBottom: '40px',
    },
    backdrop: {
        zIndex: 100,
        color: '#fff',
    },
    card: {
        minWidth: '250px',
        display: 'flex',
        textAlign:'left',
    },
    pagination: {
        marginTop: '20px',
        marginBottom: '30px',
    }
}));