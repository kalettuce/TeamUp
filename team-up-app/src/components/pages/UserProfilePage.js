import { useParams, useHistory } from 'react-router-dom';
//import { useAuth } from '../../utils/AuthContext';
import { fetchUserById } from '../../utils/FindUsers.js';
import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "react-bootstrap";
import { regionToFlag } from '../containers/RegionSelect';
import { NOT_FOUND } from './NotFoundPage';
import StyledTags from '../presentation/StyledTags';

function UserProfilePage() {
    const classes = useStyles();
    const history = useHistory();
    const {uid} = useParams();
    //const {currentUser} = useAuth();

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (uid != null) {
            fetchUserById(uid, setUserProfile);
        } else {
            setUserProfile(null);
        }
    }, [uid]);

    useEffect(() => {
        // Send to NotFoundPage (404) if a user cannot be found
        if (userProfile === NOT_FOUND) {
            history.push("/" + NOT_FOUND);
        }
    // eslint-disable-next-line
    }, [userProfile]);

    return (
        <div>
            {userProfile && 
                <Container
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}>
                    <div
                        className="w-100"
                        style={{ maxWidth: "600px" }}>
                        <Button
                            disableRipple
                            className={classes.backButton}
                            onClick={() => history.goBack()}>
                            &#8592; Back
                        </Button>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="center">
                                <Avatar
                                    className={classes.avatar}
                                    src={userProfile.image_url || "https://i.pinimg.com/originals/28/e0/9a/28e09af09026c705aa6973f343d710d3.jpg"}
                                />    
                            </Grid> 
                            <Typography className={classes.title}>{userProfile.name}</Typography>
                            <Typography className={classes.region}>
                                <span>{userProfile.region ? regionToFlag(userProfile.region[1]) : ''} </span>
                                        {userProfile.region ? userProfile.region[0] : "Global"}
                            </Typography>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <Grid
                                    item xs={6}
                                    className={classes.descSect}>
                                    <Typography className={classes.main}>Bio:</Typography>
                                    <Typography className={classes.sub}>{userProfile.description}</Typography>
                                    <Typography className={classes.main} style={{paddingBottom: 8}}>Interests:</Typography>
                                    <StyledTags
                                        className={classes.sub}
                                        tagList={userProfile.tags ? userProfile.tags : []}/>
                                </Grid> 
                            </Grid>
                            {/*currentUser.uid == uid &&
                                <Grid container direction="column" justify="center" alignItems="center">
                                    <Button variant="outlined" className={classes.editprofilebutton}>
                                        Edit profile
                                    </Button>
                                </Grid>*/
                            }  
                    </div>
                </Container>
            }
        </div>
    );
}

export default UserProfilePage;

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 40,
        paddingTop: '30px',
        textAlign:'center',
    },
    region: {
        fontSize: 20,
        paddingTop: '10px',
        textAlign:'center',
        paddingBottom: '30px',
    },
    main: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 20,
        paddingTop: '10px',
    },
    sub: {
        fontWeight: 400,
        color: '#000000',
        fontSize: 20,
        paddingBottom: '10px',
        paddingRight: '5px',
    },
    descSect: {
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    avatar: {
        height: theme.spacing(23),
        width: theme.spacing(23),
        marginTop: '20px',
    },
    editprofilebutton: {
        marginTop: '5px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        borderColor: '#000000',
        paddingRight: '25px',
        paddingLeft: '25px',
        marginRight: '25px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
        borderRadius: 0,
        marginBottom: '20px'
    },
}));