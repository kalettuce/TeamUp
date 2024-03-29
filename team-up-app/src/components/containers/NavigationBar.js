import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRouteChanger } from '../../utils/RouteChanger';
import { useAuth } from '../../utils/AuthContext';
import { fetchUserById } from '../../utils/FindUsers.js'
import Popover from '@material-ui/core/Popover';
import { Avatar } from '@material-ui/core';

export default function LoginBar(props) {
    const classes = useStyles();
    const { currentUser, logout } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const showPopover = Boolean(anchorEl);

    useEffect(() => {
        if (currentUser != null) {
            fetchUserById(currentUser.uid, setUserProfile);
        } else {
            setUserProfile(null);
        }
    }, [currentUser]);

    async function handleLogout() {
        try {
            setAnchorEl(null);
            await logout()
        } catch {
        }
      }

    const changeRoute = useRouteChanger();

    const handleLogin = () => {
        changeRoute("/login");
    }

    const handleSignup = () => {
        changeRoute("/signup");
    }

    const handleProjects = () => {
        setAnchorEl(null);
        changeRoute("/projects");
    }
    
    const handlePeople = () => {
        setAnchorEl(null);
        changeRoute("/users");
    }

    const handleLandingPage = () => {
        setAnchorEl(null);
        changeRoute("/");
    }

    const handleProfile = () => {
        changeRoute("/users/" + currentUser.uid);
        setAnchorEl(null);
    }

    const handleJoinedProjects = () => {
        changeRoute("/joinedprojects/" + currentUser.uid);
        setAnchorEl(null);
    }

    const handleOwnedProjects = () => {
        changeRoute("/ownedprojects/" + currentUser.uid);
        setAnchorEl(null);
    }

    const handleProfilePopover = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = (event) => {
        setAnchorEl(null)
    };

    return (
        <div>
            <Grid
                container
                className={classes.root}>
                <Grid item
                    xs={6}
                    className={classes.leftgrid}>
                    <Button
                        onClick={() => handleLandingPage()}
                        className={classes.loginbutton}>
                        TEAM UP
                    </Button>
                    <Button
                        onClick={() => handleProjects()}
                        className={classes.projectuserbutton}
                        variant="outlined">
                        PROJECTS
                    </Button>
                    <Button
                        onClick={() => handlePeople()}
                        className={classes.projectuserbutton}
                        variant="outlined">
                        PEOPLE
                    </Button>
                </Grid>
                {!userProfile && 
                    <Grid item
                        xs={6}
                        className={classes.rightgrid}>
                        <Button onClick={() => handleLogin()}
                                className={classes.loginbutton}>
                            LOG IN
                        </Button>
                        <Button onClick={() => handleSignup()}
                                className={classes.signupbutton}
                                variant="outlined">
                            SIGN UP
                        </Button>
                    </Grid>
                }  
                {userProfile && 
                    <Grid item
                        xs={6}
                        className={classes.rightgrid}>
                        <Button
                            onClick={(event) => handleProfilePopover(event)}
                            className={classes.name}
                            startIcon={
                                <Avatar
                                className={classes.avatar}
                                src={userProfile.image_url || "https://i.pinimg.com/originals/28/e0/9a/28e09af09026c705aa6973f343d710d3.jpg"}
                            />  
                            }
                            endIcon={<ExpandMoreIcon />}>

                            {userProfile.name}
                        </Button>
                    </Grid>
                }    
            </Grid>
            {userProfile && 
                <Popover
                    id='simple-popover'
                    open={showPopover}
                    anchorEl={anchorEl}
                    onClose={(event) => handlePopoverClose(event)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="center"
                        className={classes.mediaParent}>
                        <Button
                            className={classes.popoverButtons}
                            onClick={() => handleProfile()}>
                            Profile
                        </Button>  
                        <Button
                            className={classes.popoverButtons}
                            onClick={(event) => handleOwnedProjects()}>
                            Owned Projects
                        </Button>
                        <Button className={classes.popoverButtons}
                                onClick={(event) => handleJoinedProjects()}>
                            Joined Projects
                        </Button> 
                        <Button onClick={() => handleLogout()}
                                className={classes.logoutbutton}>
                            Log out
                        </Button>
                    </Grid> 
                </Popover>
            }
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        zIndex: 10000,
        flexGrow: 1,
        paddingBottom: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        background:'#fff',
    },
    name: {
        marginTop: '5px',
        marginBottom: '5px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        border: 'none',
        paddingRight: '25px',
        paddingLeft: '25px',
        marginRight: '25px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
        textTransform: 'none',
    },
    leftgrid: {
        paddingLeft: '15px',
        paddingRight: '15px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    rightgrid: {
        paddingLeft: '15px',
        paddingRight: '15px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    loginbutton: {
        whiteSpace: 'nowrap',
        marginTop: '5px',
        marginBottom: '5px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        border: 'none',
        paddingRight: '25px',
        paddingLeft: '25px',
        marginRight: '25px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
    },
    logoutbutton: {
        fontWeight: 700,
        width: '100%',
        marginBottom: '10px',
        color: 'red',
    },
    signupbutton: {
        marginTop: '5px',
        marginBottom: '5px',
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
    },
    projectuserbutton: {
        marginTop: '5px',
        marginBottom: '5px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        borderColor: '#000000',
        paddingRight: '25px',
        paddingLeft: '25px',
        marginLeft: '25px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
        borderRadius: 0,
    },
    avatar: {
        marginRight: '7px',
    },
    mediaParent: {
        paddingTop: '20px',
        minHeight: '150px',
        width: '150px',
    },
    popoverButtons: {
        fontWeight: 700,
        width: '100%',
        marginBottom: '10px',
    }
}));