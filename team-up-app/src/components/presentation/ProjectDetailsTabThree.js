import { Typography } from '@material-ui/core';
import JoinRequestCard from './JoinRequestCard';

function ProjectDetailsTabThree(props) {
    const project = props.project;
    const requests = props.requests;
    var dom = []

    if (requests.length === 0) {
        dom = "No pending requests."
    } else {
        for (const val of requests) {
            dom.push(<JoinRequestCard key={val} info={val} />);
        }
    }

    return (
        <div>
            <Typography variant={'h5'}>Pending Requests</Typography>
            <br/>
            <Typography
                variant={'body1'}>
                    {dom}
            </Typography>
            <br/>
        </div>
    )
}

export default ProjectDetailsTabThree;