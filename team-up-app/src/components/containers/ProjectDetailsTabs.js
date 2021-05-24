import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ProjectDetailsTabOne from '../presentation/ProjectDetailsTabOne';
import ProjectDetailsTabTwo from '../presentation/ProjectDetailsTabTwo';
import ProjectDetailsTabThree from '../presentation/ProjectDetailsTabThree';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            {value === index && (
                <Box>
                {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: '#fff',
        color: '#000',
        marginBottom: '40px',
        borderBottom: '1px solid #000',
    },
}));

function ProjectDetailsTabs(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <AppBar
                className={classes.appBar}
                position="static"
                elevation={0}>
                <Tabs
                    TabIndicatorProps={{style: {background:'transparent'}}}
                    value={value}
                    onChange={handleChange}>
                    <Tab
                        disableRipple
                        label={'Project Details'}
                        {...a11yProps(0)} />
                    <Tab 
                        disableRipple
                        label={`Team Members (${props.joinedMembersInfo.length})`}
                        {...a11yProps(1)} />
                    <Tab 
                        disableRipple
                        hidden={!props.isCurrUserProject}
                        label={`Pending Requests (${props.requests.length})`} 
                        {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel
                value={value}
                index={0}>
                <ProjectDetailsTabOne
                    project={props.project}/>
            </TabPanel>
            <TabPanel
                value={value}
                index={1}>
                <ProjectDetailsTabTwo
                    project={props.project}
                    isCurrUserProject={props.isCurrUserProject}
                    currUserHasJoined={props.currUserHasJoined}
                    joinedMembersInfo={props.joinedMembersInfo}/>
            </TabPanel>
            <TabPanel
                value={value}
                index={2}>
            <ProjectDetailsTabThree
                requests={props.requests}/>
            </TabPanel>
        </div>
    );
}

export default ProjectDetailsTabs;