import { useParams } from 'react-router-dom';

function ProjectDetailsPage(props) {
    const {project} = useParams();
    //const title = "PROJECT DETAILS";
    
    return (
        <div>
            Project details for: {project}
        </div>
    );
}

export default ProjectDetailsPage;