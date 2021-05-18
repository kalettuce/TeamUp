import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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

function CreateAProjectPage() {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <Typography className={classes.title}>CREATE A PROJECT</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                    required
                    id="name"
                    name="name"
                    label="Project name"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    id="tagline"
                    name="tagline"
                    label="One-sentence summary of the project"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    id="region"
                    name="region"
                    label="Region"
                    fullWidth
                    />
                    <FormControlLabel
                    control={
                        <Checkbox
                            color="secondary"
                            name="checkbox"
                            value="yes" />}
                    label="Remote OK"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    id="desc"
                    name="desc"
                    label="What's the project about? What types of people will be a good fit?"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="application"
                    name="application"
                    label="Application question (optional)"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    id="tags"
                    name="tags"
                    label="Add tags separated by colons"
                    fullWidth
                    />
                </Grid>
            </Grid>
            <Button
                variant="outlined"
                className={classes.button}
            >Create</Button>
        </div>
    );
}

export default CreateAProjectPage; 