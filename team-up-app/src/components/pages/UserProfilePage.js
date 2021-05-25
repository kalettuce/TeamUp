import { useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { fetchUserById } from '../../utils/FindUsers.js';
import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import { Typography, Card, CardMedia, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "react-bootstrap";

function UserProfilePage() {
    const classes = useStyles();
    const {uid} = useParams();
    const {currentUser} = useAuth();

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (uid != null) {
            fetchUserById(uid, setUserProfile);
        } else {
            setUserProfile(null);
        }
    }, [currentUser]);

    return (
        <div>
            {userProfile && 
                <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
                >
                    <div className="w-100" style={{ maxWidth: "500px" }}>
                        <Paper elevation={3}>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid item xs={6}>
                                    <Grid container direction="row" alignItems="center" justify="center">
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={userProfile.image || "https://i.pinimg.com/originals/28/e0/9a/28e09af09026c705aa6973f343d710d3.jpg"}
                                        />    
                                    </Grid> 
                                    <Typography className={classes.title}>{userProfile.name}</Typography>
                                </Grid>
                                <Grid item xs={6} className={classes.descSect}>
                                    <Typography className={classes.main}>Bio:</Typography>
                                    <Typography className={classes.sub}>{userProfile.description}</Typography>
                                    <Typography className={classes.main}>Email:</Typography>
                                    <Typography className={classes.sub}>{userProfile.email}</Typography>
                                    <Typography className={classes.main}>Region:</Typography>
                                    <Typography className={classes.sub}>{userProfile.region}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                </Container>
            }
        </div>
    );
}

export default UserProfilePage;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingLeft: '20px',
        paddingRight: '20px',
        width: '30%',
        margin: 'none',
        background: '#FFFFFF',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 40,
        paddingTop: '10px',
        paddingLeft: '20px',
        paddingRight: '10px',
        textAlign:'center',
        paddingBottom: '10px',
    },
    main: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 20,
        paddingTop: '10px',
        paddingLeft: '20px',
    },
    sub: {
        fontWeight: 400,
        color: '#000000',
        fontSize: 20,
        paddingBottom: '10px',
        paddingLeft: '20px',
    },
    descSect: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    cardMedia: {
        paddingTop: '60%',
        borderRadius: '50%',
        width: '60%',
        marginTop: '20px',
    },
}));