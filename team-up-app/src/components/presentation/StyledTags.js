import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

function StyledTags(props) {
    const classes = useStyles();

    var dom = []
    var i = 0;
    for (const tag of props.tagList) {
        dom.push(
            <span
                key={i}
                className={classes.tag}
                variant="body1">
                {tag}
            </span>
        );
        i++;
    }

    return (
        <div className={classes.tagsList}>
            {dom}
        </div>
    );
}

export default StyledTags;

const useStyles = makeStyles((theme) => ({
    tagsList: {
        display: 'flex', 
        flexWrap: 'wrap',
    },
    tag: {
        fontFamily: "'Inconsolata', monospace",
        fontSize: '12px',
        backgroundColor: '#f2f2f2',
        borderRadius: 4,
        padding: 5,
        marginRight: 8,
        marginBottom: 8,
        color: '#555',
    },
}));
