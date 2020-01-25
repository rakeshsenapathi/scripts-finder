import React from 'react';

const Search = (props) => {
    return (
        <div>
            <input type="text"
                placeholder="Search"
                onChange={props.handleSearchChange}
                value={props.keyword} />
        </div>
    )
}

export default Search;