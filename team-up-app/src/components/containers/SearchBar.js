import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props) {
    const classes = useStyles();
    const [query, setQuery] = useState('');

    const handleSearchBarChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <TextField
            className={classes.searchBar}
            placeholder={props.placeholder}
            onInput={(e) => handleSearchBarChange(e)}
            onKeyPress={(e) => e.key === 'Enter' ? props.onSearch(query) : ''}
            value={query}
            spellCheck={false}
            fullWidth
            margin="normal"
            InputProps= {{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => props.onSearch(query)}
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
    searchBar: {
        margin: '0 !important',
    },
    iconButton: {
      padding: 10,
    },
}));