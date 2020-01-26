import React from 'react';
import '../App.css';

const Filter = (props) => {

    const ShowLabels = () => (
        props.labels.map((label, key) => {
            return (
                <li key={key}>
                    <input type="checkbox" id={label}
                        checked={props.checkedLabels[label]}
                        onChange={() => props.handleFilterChange(0, label)}
                    />
                    <label htmlFor={label}>{label}</label>
                </li>
            );
        })
    );

    const Select = () => (
        <div className="container-select">Select :
            <button onClick={() => props.handleFilterChange(1)} className="container-select__all">All</button>|
            <button onClick={() => props.handleFilterChange(2)} className="container-select__none"> None</button>
        </div>
    );

    return (
        <div className="filter">
            <i className="material-icons filter-button">filter_list</i>
            <div className="filter-menu">
                <p>Filter By Label</p>
                <ul>
                    <ShowLabels />
                    <hr />
                    <Select />
                </ul>
                <input type="checkbox"
                    id="showFavourites"
                    checked={props.showFavouriteIsChecked}
                    onChange={() => props.handleFilterChange(3)} />
                <label htmlFor="showFavourites">Show only my favourites</label>
                <button
                    onClick={props.handleApplyChanges}
                    className="btn-apply">APPLY</button>
                <button
                    onClick={() => props.handleFilterChange(4)}
                    className="btn-reset">RESET ALL FILTERS</button>
            </div>
        </div>
    );
}

export default Filter;