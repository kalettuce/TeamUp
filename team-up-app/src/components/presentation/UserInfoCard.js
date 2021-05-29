import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRouteChanger } from '../../utils/RouteChanger';
import CardMedia from '@material-ui/core/CardMedia';
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
                    <Grid container direction="row">
                        <Grid item xs={1} align={"center"} className={classes.mediaGrid}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={props.image || "https://i.pinimg.com/originals/28/e0/9a/28e09af09026c705aa6973f343d710d3.jpg"}
                            />
                        </Grid>
                        <Grid item xs={9} className={classes.details}>
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
        justifyContent: "center"
    },
    mediaGrid: {
        marginRight: theme.spacing(2),
    },
    cardMedia: {
        paddingTop: '100%',
        borderRadius: '50%',
        width: '100%',
    },
}));


/*
function UserCard(props) {
    const classes = useStyles();
    const changeRoute = useRouteChanger();

    return (
        <Card 
            onClick={() => changeRoute(`/users/${props.uid}`)}
            style={{width: '100%'}}
            height="500">
            <CardActionArea>
                <Grid container direction="row" alignItems="center" justify="center">
                        <CardMedia
                            className={classes.cardMedia}
                            image={props.image || "https://i.pinimg.com/originals/28/e0/9a/28e09af09026c705aa6973f343d710d3.jpg"}
                        />
                </Grid>
                <CardContent>
                    <Typography className={classes.name} gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default UserCard;

const useStyles = makeStyles((theme) => ({
    name: {
        textAlign:'center',
    },
    cardMedia: {
        paddingTop: '60%',
        borderRadius: '50%',
        width: '60%',
        marginTop: '20px',
    },
}));

*/