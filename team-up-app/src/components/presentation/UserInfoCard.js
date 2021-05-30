import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteChanger } from '../../utils/RouteChanger';
import Grid from '@material-ui/core/Grid';

function UserInfoCard(props) {
    const classes = useStyles();
    const changeRoute = useRouteChanger();

    return (
        <Card
            className={classes.card}
            elevation={0}
            variant="outlined"
            onClick={() => changeRoute(`/users/${props.uid}`)}>
            <CardActionArea>
                <CardContent className={classes.cardContent}>
                    <Grid container wrap='nowrap'>
                        <Grid
                            item xs={1}
                            align={"center"}
                            className={classes.mediaGrid}>
                            <Avatar
                                className={classes.avatar}
                                src={props.image || "https://i.pinimg.com/originals/28/e0/9a/28e09af09026c705aa6973f343d710d3.jpg"}
                            />
                        </Grid>
                        <Grid
                            item xs={10}
                            className={classes.details}>
                            <Typography
                                variant="body1">
                                    <b>{props.name}</b> {props.userIsCreator ? '(Creator)' : ''}
                            </Typography>
                            <Typography
                                className={classes.description}
                                variant="body2"
                                color="textSecondary">
                                {props.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default UserInfoCard;

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: '10px',
        width: '100%',
    },
    description: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
    details: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        wordBreak: 'break-word',
    },
    mediaGrid: {
        marginRight: 10,
        minWidth: theme.spacing(6),
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
}));