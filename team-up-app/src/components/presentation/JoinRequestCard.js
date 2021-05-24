import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { fetchUserById } from '../../utils/FindUsers';

function JoinRequestCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState("");

    fetchUserById(props.info.from, user => setUser(user.name));

    return (
        <Card
            className={classes.card}
            elevation={0}
            variant="outlined"
            style={{width: '100%'}}
            height="500">
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary">{`${user} has requested to join`}
                </Typography>
                <Typography
                    className={classes.description}
                    variant="body1">
                    {props.info.message}
                </Typography>
            </CardContent>
            <CardActions>
            <Button
                size={"small"}
                onClick={() => {console.log("accepted")}}>
                Accept
            </Button>
            <Button
                size={"small"}
                onClick={() => {console.log("rejected")}}>
                Reject
            </Button>
            </CardActions>
        </Card>
    );
}

export default JoinRequestCard;

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: '10px',
    },
    description: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 4,
    },
}));
