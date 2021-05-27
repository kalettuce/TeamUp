import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useRouteChanger } from '../../utils/RouteChanger';
import Grid from '@material-ui/core/Grid';

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
