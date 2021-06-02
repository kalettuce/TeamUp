import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Typography
                variant={"body2"}>
            <b>Team Up:</b> A community-based platform for connecting people to projects
            </Typography>
        </div>
    )
}

export default Footer;

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 'auto',
        backgroundColor: '#f2f2f2',
        height: '12vh',
        color: '#999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));