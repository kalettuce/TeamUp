/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { regions } from '../../utils/RegionsList';

export function regionToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

export default function RegionSelect(props) {
    const classes = useStyles();

    return (
        <Autocomplete
            fullWidth
            openOnFocus
            onChange={props.onChange}
            options={regions}
            classes={{option: classes.option,}}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
                <React.Fragment>
                    <span>{regionToFlag(option.code)}</span>
                    {option.label}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Region"
                    variant="standard"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    )
};