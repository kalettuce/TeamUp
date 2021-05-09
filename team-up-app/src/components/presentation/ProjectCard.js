import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouteChanger } from '../../utils/RouteChanger';

function ProjectCard(props) {
    const changeRoute = useRouteChanger();

    return (
        <Card 
            onClick={() => changeRoute(`/projects/${props.projectTitle}`)}
            height="500">
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image="https://husmen.xyz/portfolio/scope-timer/featured.png"
                title="Placeholder"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.projectTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.projectDesc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProjectCard;
