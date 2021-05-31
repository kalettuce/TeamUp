import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useRouteChanger } from '../../utils/RouteChanger';
import StyledTags from './StyledTags';
import placeholder from '../../placeholder.jpg';

function ProjectCard(props) {
    const changeRoute = useRouteChanger();
    return (
        <Card 
            elevation={0}
            variant="outlined"
            onClick={() => changeRoute(`/projects/${props.projectID}`)}
            style={{width: '100%', position: 'relative'}}
            height="500">
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.projectImage || placeholder} />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h6"
                        style={{fontWeight: 700}}>
                        {props.projectTitle}
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        component="p">
                        {props.projectTagline}
                    </Typography>
                </CardContent>
                <div style={{paddingLeft: 16, paddingBottom: 8, paddingTop: 8}}>
                    <StyledTags tagList={props.projectTags || []} />
                </div>
            </CardActionArea>
        </Card>
    );
}

export default ProjectCard;
