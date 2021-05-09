import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {
  const classes = useStyles();

  return (
    <TextField
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        value={props.value}
        fullWidth
        margin="normal"
        InputProps= {{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton type="submit"
                                className={classes.iconButton}
                                aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            ),
        }}
        variant="outlined"
    />
  );
}

export default SearchBar;

const useStyles = makeStyles((theme) => ({
    iconButton: {
      padding: 10,
    },
  }));