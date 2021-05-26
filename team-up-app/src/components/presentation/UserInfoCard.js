import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteChanger } from '../../utils/RouteChanger';

function UserInfoCard(props) {
    const classes = useStyles();
    const changeRoute = useRouteChanger();

    return (
        <Card
            className={classes.card}
            elevation={0}
            variant="outlined"
            style={{width: '100%'}}
            height="500"
            onClick={() => changeRoute(`/users/${props.id}`)}>
            <CardActionArea>
                <CardContent>
                    <Typography
                        variant="body1">
                            <b>{props.name}</b> {props.userIsCreator ? '(Creator)' : ''}
                    </Typography>
                    <Typography
                        className={classes.description}
                        variant="body2"
                        color="textSecondary">
                        {props.email}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default UserInfoCard;

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: '10px',
    },
    description: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
}));
