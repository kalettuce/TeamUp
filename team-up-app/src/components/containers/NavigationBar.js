import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRouteChanger } from '../../utils/RouteChanger';
import { useAuth } from '../../utils/AuthContext';
import { fetchUserById } from '../../utils/FindUsers.js'

export default function LoginBar(props) {
    const classes = useStyles();

    const { currentUser, logout } = useAuth();

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        if (currentUser != null) {
            fetchUserById(currentUser.uid, setUserProfile);
        } else {
            setUserProfile(null);
        }
    }, [currentUser]);

    async function handleLogout() {
        try {
          await logout()
          //history.push("/login")
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
        console.log(currentUser);
        changeRoute("/projects");
    }
    
    const handlePeople = () => {
        changeRoute("/users");
    }

    const handleLandingPage = () => {
        changeRoute("/");
    }

    return (
        <div>
            <Grid
                container
                className={classes.root}
            >
                <Grid item
                    xs={6}
                    className={classes.leftgrid}
                >
                    <Button onClick={() => handleLandingPage()} className={classes.loginbutton}>
                        TEAM UP
                    </Button>
                    <Button onClick={() => handleProjects()} className={classes.projectuserbutton} variant="outlined" endIcon={<ExpandMoreIcon />}>
                        PROJECTS
                    </Button>
                    <Button onClick={() => handlePeople()} className={classes.projectuserbutton} variant="outlined" endIcon={<ExpandMoreIcon />}>
                        PEOPLE
                    </Button>
                </Grid>
                {!userProfile && 
                    <Grid item
                        xs={6}
                        className={classes.rightgrid}
                    >
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
                        className={classes.rightgrid}
                    >
                        <Button onClick={() => handleLogout()}
                                className={classes.signupbutton}
                                variant="outlined">
                            LOG OUT
                        </Button>
                        <Typography className={classes.name}>
                            {userProfile.name}
                        </Typography>
                    </Grid>
                }    
            </Grid>
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
        fontWeight: 700,
        marginTop: '10px',
        fontSize: 25,
        color: "black",
        border: 'none',
        marginRight: 25,
        paddingLeft: '5%',
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
}));