import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

export const NOT_FOUND = 404;

function NotFoundPage() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>{NOT_FOUND} :(</Typography>
            <Typography variant={"body1"}>
                Oops, that page doesn't exist. Sorry about that!
            </Typography>
            <Button
                variant={"outlined"}
                className={classes.button}
                onClick={() => history.push('/')}>
                    HOME
            </Button>
        </div>
    );
}

export default NotFoundPage;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        flexGrow: 1,
        height: '100%',
        width: '100%',
        background: '#FFFFFF',
        textAlign: 'center',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 60,
        paddingTop: '30vh',
        paddingBottom: '5px',
    },
    button: {
        marginTop: '50px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        borderColor: '#000000',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingRight: '30px',
        paddingLeft: '30px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
        borderRadius: 0,
    },
  }));