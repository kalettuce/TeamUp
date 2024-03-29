import { Typography } from '@material-ui/core';
import JoinRequestCard from './JoinRequestCard';

function ProjectDetailsTabThree(props) {
    const requests = props.requests;

    var dom = []
    if (requests.length === 0) {
        dom = <Typography
                variant={"body1"}
                color={"textSecondary"}>
                    No pending requests.
                </Typography>
    } else {
        for (const request of requests) {
            dom.push(
                <JoinRequestCard
                    key={request.key}
                    info={request} />
            );
        }
    }

    return (
        <div>
            <Typography variant={'h5'}>Pending Requests</Typography>
            <br/>
            {dom}
            <br/>
        </div>
    )
}

export default ProjectDetailsTabThree;
