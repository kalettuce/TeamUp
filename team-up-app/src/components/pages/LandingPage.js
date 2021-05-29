import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useRouteChanger } from '../../utils/RouteChanger';
import { useAuth } from '../../utils/AuthContext';

function LandingPage() {
    const classes = useStyles();
    const { currentUser } = useAuth();
    const changeRoute = useRouteChanger();

    const title = "CONNECTING PEOPLE TO PROJECTS";

    const handleFindAProject = () => {
       changeRoute("/projects");
    }

    const handlePostAProject = () => {
        if (currentUser) {
            changeRoute("/createproject");
        } else {
            changeRoute("/login");
        }
    }

    return (
        <div>
            <Grid
                container
                className={classes.root}>
                <Grid
                    item xs={7}
                    className={classes.grid}>
                    <Typography className={classes.title}>{title}</Typography>
                    <Button onClick={() => handleFindAProject()}
                            className={classes.button}
                            variant="outlined">
                        EXPLORE PROJECTS
                    </Button>
                    <Button onClick={() => handlePostAProject()}
                            className={classes.button}
                            variant="outlined">
                        CREATE A PROJECT
                    </Button>
                </Grid>
                <Grid
                    item xs={5}
                    className={classes.grid}>
                    <Card className={classes.card}>
                        <CardMedia 
                            className={classes.media}
                            image='https://i.gyazo.com/b8ab79087ec7360bc2d91c3199c98a6d.png'
                        />
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default LandingPage;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        flexGrow: 1,
        paddingTop: '20px',
        paddingRight: '100px',
        paddingLeft: '100px',
        height: '100%',
        width: '100%',
        background: '#FFFFFF',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 60,
        paddingTop: '150px',
        paddingBottom: '15px',
        paddingLeft: '25px',
        paddingRight: '25px',
    },
    grid: {
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '50px',
    },
    card: {
        backgroundColor: 'black',
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
    },
    media: {
        paddingTop: '115%',
        height: 0,
    },
    button: {
        marginTop: '15px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        borderColor: '#000000',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingRight: '50px',
        paddingLeft: '50px',
        marginLeft: '25px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
        borderRadius: 0,
    },
  }));