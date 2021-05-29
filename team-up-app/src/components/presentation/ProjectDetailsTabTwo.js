import { Typography } from '@material-ui/core';
import UserInfoCard from './UserInfoCard';

function ProjectDetailsTabTwo(props) {
    const joinedMembers = props.joinedMembers;
    const currUserHasJoined = props.currUserHasJoined;
    const project = props.project;

    var dom = []
    if (joinedMembers.length === 0) {
        dom = 
            <Typography
                variant={"body1"}
                color={"textSecondary"}>
                    There are currently no members in this project.
            </Typography>
    } else if (!currUserHasJoined) {
        dom =
            <Typography
                variant={"body1"}
                color={"textSecondary"}>
                    Join this project to view its members.
            </Typography>
    } else {
        for (const member of joinedMembers) {
            dom.push(
                <UserInfoCard
                    key={member.uid}
                    userIsCreator={project.owner === member.uid}
                    image={member.image_url}
                    uid={member.uid}
                    name={member.info.name}
                    description={member.info.email} />
            );
        }
    }

    return (
        <div>
            <Typography variant={'h5'}>Team Members</Typography>
            <br/>
            {dom}
            <br/>
        </div>
    )
}

export default ProjectDetailsTabTwo;