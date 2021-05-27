import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserCard from '../presentation/UserCard';
import Pagination from '@material-ui/lab/Pagination';
import SearchBar from '../containers/SearchBar';
import { fetchAllUsers } from '../../utils/FindUsers.js'
import Fuse from 'fuse.js';

function UsersListPage() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [dom, setDom] = useState('');
    const [totalPages, setTotalPages] = useState(0);
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
                xs={3}>
                <UserCard
                    image={user.image_url}
                    uid={uid}
                    name={user.name}
                    description={user.description}
                />
            </Grid>
            )));
        }
    }, [classes.card, usersToShow, page]);

    const handleChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div>
            <Grid
                container
                justify="center"
                className={classes.root}>
                <Typography className={classes.title}>{title}</Typography>
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

export default UsersListPage;

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
    }
}));