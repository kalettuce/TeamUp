import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useAuth } from '../../utils/AuthContext';
import { useRouteChanger } from '../../utils/RouteChanger';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

function JoinAProjectPage(props) {
    const [response, setResponse] = useState('');
    const classes = useStyles();
    let dom = '';

    if (props.project.application) {
        dom = (
            <React.Fragment>
                <Typography
                    variant={'body2'}
                    color="textSecondary">
                    To join this project, the creator ({props.ownerName}) requires applicants
                    to answer the following prompt.
                </Typography>
                <br/>
                <Typography variant={'body1'}><b>{props.project.application}</b></Typography>
                <TextField
                        required
                        id="response"
                        name="response"
                        label="Your response"
                        onChange={(e) => {
                        setResponse(e.target.value);
                        }}
                        fullWidth
                        />
            </React.Fragment>
        )
    }

    return (
        <DialogContent>
            <Typography className={classes.title} variant={'h4'}>{props.project.name}</Typography>
            {dom}
            <Typography
                    className={classes.agreement}
                    variant={'body2'}>
                        By pressing 'Submit', I confirm that I would like to join
                        this project and the information I have provided will be shared with
                        the creator ({props.ownerName}).
            </Typography>
            <DialogActions>
                <Button
                    className={classes.button}
                    variant="outlined"
                    >SUBMIT</Button>
            </DialogActions>
        </DialogContent>
    )

}

export default JoinAProjectPage;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '20px',
        paddingLeft: '200px',
        paddingRight: '200px',
        width: '70%',
        margin: 'auto',
        background: '#FFFFFF',
    },
    agreement: {
        paddingTop: '20px',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 32,
    },
    button: {
        fontSize: '1rem',
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        border: '1px solid',
        borderRadius: 0,
    }
}));
