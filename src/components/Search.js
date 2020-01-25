import React from 'react';
import '../App.css';

const Search = (props) => {
    return (
        <input type="text"
            className="input-search"
            placeholder="Search"
            onChange={props.handleSearchChange}
            value={props.keyword} />
    )
}

export default Search;