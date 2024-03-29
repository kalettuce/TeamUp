import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useAuth } from '../../utils/AuthContext';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { addRequest } from "../../utils/AddJoinRequests.js";

function JoinAProjectDialog(props) {
    const [response, setResponse] = useState('');
    const [error, setError] = useState(false);
    const [joinIsSuccessful, setJoinIsSuccessful] = useState(false);
    const classes = useStyles();
    const { currentUser } = useAuth();

    const handleConfirmation = () => {
        if (props.project.info.application && response.length === 0) {
            setError(true);
        } else {
            try {
                addRequest(currentUser.uid, props.project.id, response);
                setJoinIsSuccessful(true);
            } catch {
                console.log("Join project failed");
            }
        }
    }

    useEffect(() => {
        if (joinIsSuccessful) {
            props.open(false);
            props.setCurrUserJustRequested(true);
        }
        // eslint-disable-next-line
    }, [joinIsSuccessful]);

    let dom = '';
    if (props.project.info.application) {
        dom = (
            <React.Fragment>
                <br/>
                <Typography
                    variant={'body2'}
                    color="textSecondary">
                    To join this project, the creator ({props.ownerName}) requires applicants
                    to answer the following prompt.
                </Typography>
                <br/>
                <Typography variant={'body1'}><b>{props.project.info.application}</b></Typography>
                <br/>
                <TextField
                        required
                        multiline
                        variant={"outlined"}
                        error={error}
                        id={"response"}
                        name={"response"}
                        placeholder={"Your amazing response"}
                        helperText={"Required"}
                        onClick={() => setError(false)}
                        onChange={(e) => {
                            setResponse(e.target.value);
                        }}
                        rows={4}
                        fullWidth
                        />
            </React.Fragment>
        )
    }

    return (
        <DialogContent>
            <Typography
                className={classes.title}
                variant={'h4'}>
                    {props.project.info.name}
            </Typography>
            {dom}
            <Typography
                className={classes.agreement}
                variant={'body1'}>
                    By pressing 'Submit', I confirm that I would like to request to join
                    this project and the information I have provided will be shared with
                    the creator (<b>{props.ownerName}</b>).
            </Typography>
            <DialogActions>
                <Button
                    className={classes.button}
                    variant={"outlined"}
                    onClick={handleConfirmation}
                    >SUBMIT</Button>
                <Button
                    onClick={() => props.open(false)}
                    >CANCEL</Button>
            </DialogActions>
        </DialogContent>
    )

}

export default JoinAProjectDialog;

const useStyles = makeStyles((theme) => ({
    agreement: {
        paddingTop: '20px',
        paddingBottom: '20px',
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
