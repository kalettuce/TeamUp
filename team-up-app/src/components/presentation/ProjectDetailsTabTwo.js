import { Typography } from '@material-ui/core';

function ProjectDetailsTabTwo(props) {
    const joinedMemberNames = props.joinedMemberNames;
    const currUserHasJoined = props.currUserHasJoined;
    var dom = []

    if (joinedMemberNames.length === 0) {
        dom = "There are currently no members in this project."
    } else if (!currUserHasJoined) {
        dom = "Join this project to view its members."
    } else {
        for (const val of joinedMemberNames) {
            dom.push(<div key={val}>{val}<br/></div>);
        }
    }

    return (
        <div>
            <Typography variant={'h5'}>Team Members</Typography>
            <br/>
            <Typography
                variant={'body1'}>
                    {dom}
            </Typography>
            <br/>
        </div>
    )
}

export default ProjectDetailsTabTwo;