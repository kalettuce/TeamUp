import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function LoginBar(props) {
    const classes = useStyles()

    const handleLogin = () => {
        console.log("Login");
    }

    const handleSignup = () => {
        console.log("Signup");
    }

    const handleProjects = () => {
        console.log("Projects");
    }
    
    const handlePeople = () => {
        console.log("People");
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
                    <Typography className={classes.name}>
                        TEAM UP
                    </Typography>
                    <Button onClick={() => handleProjects()} className={classes.projectuserbutton} variant="outlined" endIcon={<ExpandMoreIcon />}>
                        PROJECTS
                    </Button>
                    <Button onClick={() => handlePeople()} className={classes.projectuserbutton} variant="outlined" endIcon={<ExpandMoreIcon />}>
                        PEOPLE
                    </Button>
                </Grid>
                <Grid item
                    xs={6}
                    className={classes.rightgrid}
                >
                    <Button onClick={() => handleLogin()} className={classes.loginbutton}>
                        LOG IN
                    </Button>
                    <Button onClick={() => handleSignup()} className={classes.signupbutton} variant="outlined">
                        SIGN UP
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
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