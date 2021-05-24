import { Typography } from '@material-ui/core';
import UserInfoCard from './UserInfoCard';

function ProjectDetailsTabTwo(props) {
    const joinedMembersInfo = props.joinedMembersInfo;
    const currUserHasJoined = props.currUserHasJoined;

    var dom = []
    if (joinedMembersInfo.length === 0) {
        dom = <Typography
                variant={"body1"}
                color={"textSecondary"}>
                    There are currently no members in this project.
                </Typography>
    } else if (!currUserHasJoined) {
        dom = <Typography
                variant={"body1"}
                color={"textSecondary"}>
                    Join this project to view its members.
                </Typography>
    } else {
        for (const member of joinedMembersInfo) {
            dom.push(
                <UserInfoCard
                    key={member.uid}
                    isCurrUserProject={props.isCurrUserProject}
                    id={member.uid}
                    name={member.name}
                    email={member.email} />
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