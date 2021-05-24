import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useRouteChanger } from '../../utils/RouteChanger';
import placeholder from '../../placeholder.jpg';

function ProjectCard(props) {
    const changeRoute = useRouteChanger();

    return (
        <Card 
            elevation={0}
            variant="outlined"
            onClick={() => changeRoute(`/projects/${props.projectID}`)}
            style={{width: '100%'}}
            height="500">
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={props.projectImage || placeholder}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.projectTitle}
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {props.projectTagline}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                        {`Tags: ${props.projectTags.toString()}`}
                    </Typography>
            </CardContent>
        </Card>
    );
}

export default ProjectCard;
