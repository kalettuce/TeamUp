import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { fetchUserById } from '../../utils/FindUsers';
import { acceptRequest, rejectRequest } from '../../utils/HandleRequests';
import MiniUserCard from './MiniUserCard';

function JoinRequestCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [dom, setDom] = useState("");

    useEffect(() => {
        fetchUserById(props.info.from, setUser);
    }, [props.info.from]);

    useEffect(() => {
        if (user) {
            console.log(user)
            setDom(
                <div>
                    <CardContent>
                        <MiniUserCard 
                            uid={props.info.from}
                            image={user.image_url}
                            name={""}
                            description={`${user.name} has requested to join`}/>
                        <Typography
                            className={classes.description}
                            hidden={props.info.message.length === 0}
                            variant="body1">
                            {props.info.message}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            size={"small"}
                            onClick={() => acceptRequest(props.info.key, () => history.go(0))}>
                            Accept
                        </Button>
                        <Button
                            size={"small"}
                            onClick={() => rejectRequest(props.info.key, () => history.go(0))}>
                            Reject
                        </Button>
                    </CardActions>
                </div>
            )
        }
    }, [user, classes.description, props.info, history])

    return (
        <Card
            className={classes.card}
            elevation={0}
            variant="outlined"
            style={{width: '100%'}}
            height="500">
                {dom}
        </Card>
    );
}

export default JoinRequestCard;

const useStyles = makeStyles((theme) => ({
    userLink: {
        display: "flex",
    },
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
