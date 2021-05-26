import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function ProjectDetailsTabOne(props) {
    const classes = useStyles();
    const project = props.project;

    return (
        <div>
            <Typography variant={'h5'}>Project Details</Typography>
            <br/>
            <Typography
                className={classes.description}
                variant={'body1'}>
                    {project.description}
            </Typography>
        </div>
    )
}

export default ProjectDetailsTabOne;

const useStyles = makeStyles((theme) => ({
    description: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    },
}));
