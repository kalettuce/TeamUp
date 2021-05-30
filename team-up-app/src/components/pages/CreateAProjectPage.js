import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { addAProject } from '../../utils/AddProjects';
import { useAuth } from '../../utils/AuthContext';
import { useRouteChanger } from '../../utils/RouteChanger';
import ImageUploaderElement from '../containers/ImageUploaderElement';
import RegionSelect from '../containers/RegionSelect';
import TagsInputField from '../containers/TagsInputField';

function CreateAProjectPage() {
    const classes = useStyles();
    const { currentUser } = useAuth();

    const [name, setName] = useState('');
    const [tagline, setTagline] = useState('');
    const [region, setRegion] = useState('');
    const [description, setDescription] = useState('');
    const [application, setApplication] = useState('');
    const [tags, setTags] = useState([]);
    const [pid, setPid] = useState('');
    const [picture, setPicture] = useState([]);
    
    const changeRoute = useRouteChanger();

    // TODO: restyle error messages

    const handleConfirmation = () => {
        if (name.length === 0) {
            alert('Project name is required');
        } else if (tagline.length === 0) {
            alert('Project summary is required');
        } else if (region.length === 0) {
            alert('Time zone is required');
        } else if (description.length === 0) {
            alert('Project description is required');
        } else {
            try {
                addAProject(name, currentUser.uid, tagline,
                    region, description, application, tags, picture, setPid);
            } catch {
                alert("Project creation failed");
            }
        }
    }

    // Putting changeRoute in the dependency array kept refreshing the page
    useEffect(() => {
        if (pid !== '') {
            changeRoute(`/projects/${pid}`);
        }
    });

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>SUBMIT A PROJECT</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    required
                    id="name"
                    name="name"
                    inputProps={{ maxLength: 30 }}
                    helperText={'30 characters max'}
                    label="Project name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <TextField
                    required
                    id="tagline"
                    name="tagline"
                    inputProps={{ maxLength: 50 }}
                    helperText={'50 characters max'}
                    placeholder="Brief summary of the project *"
                    variant="outlined"
                    onChange={(e) => {
                      setTagline(e.target.value);
                    }}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <RegionSelect onChange={(e, region) => setRegion([region.label, region.code])}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    multiline
                    id="desc"
                    name="desc"
                    placeholder="What's the project about? What skills are you looking for? *"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    variant={"outlined"}
                    rows={4}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="application"
                    name="application"
                    placeholder="Question for applicants to respond to"
                    variant="outlined"
                    onChange={(e) => {
                      setApplication(e.target.value);
                    }}
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TagsInputField
                        tags={tags}
                        setTags={setTags}/>
                </Grid>
                <ImageUploaderElement onDrop={(e) => {
                    setPicture(e[0]);
                }}/>
            </Grid>
            <Button
                variant="outlined"
                className={classes.button}
                onClick={handleConfirmation}
            >Submit</Button>
        </div>
    );
}

export default CreateAProjectPage; 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingTop: '20px',
        paddingLeft: '200px',
        paddingRight: '200px',
        width: '70%',
        margin: 'auto',
        background: '#FFFFFF',
    },
    title: {
        fontWeight: 700,
        color: '#000000',
        fontSize: 40,
        paddingTop: '100px',
        paddingBottom: '15px',
        textAlign:'center',
    },
    button: {
        marginTop: '30px',
        fontSize: 20,
        fontWeight: 700,
        color: "black",
        background: '#FFFFFF',
        borderColor: '#000000',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingRight: '50px',
        paddingLeft: '50px',
        "&:hover": {
            backgroundColor: '#FFFFFF'
        },
        borderRadius: 0,
    },
  }));