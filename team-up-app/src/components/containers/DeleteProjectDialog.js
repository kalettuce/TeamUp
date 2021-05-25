import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { removeProject } from "../../utils/RemoveProjects";
import { useHistory } from "react-router-dom";

function DeleteProjectDialog(props) {
    const classes = useStyles();
    const history = useHistory();

    const handleDelete = () => {
        removeProject(props.pid, () => {
            history.push('/projects/');
        });
        props.open(false);
    }

    return (
        <DialogContent>
            <Typography
                className={classes.agreement}
                variant={'body1'}>
                    Are you sure you want to permanently delete this project?
            </Typography>
            <DialogActions>
                <Button
                    onClick={() => props.open(false)}
                    >CANCEL</Button>
                <Button
                    className={classes.deleteButton}
                    variant={"outlined"}
                    onClick={handleDelete}
                    >DELETE</Button>
            </DialogActions>
        </DialogContent>
    )

}

export default DeleteProjectDialog;

const useStyles = makeStyles((theme) => ({
    agreement: {
        paddingBottom: '20px',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 32,
    },
    deleteButton: {
        fontSize: '1rem',
        fontWeight: 700,
        color: '#fff',
        background:'#e74f4e',
        border: '1px solid black',
        borderRadius: 0,
        "&:hover": {
            background: '#e74f4e',
        }
    },
}));
