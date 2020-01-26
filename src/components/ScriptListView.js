import React, { Component } from 'react';

class ScriptListView extends Component {

    render() {

        const DisplayLabels = (props) => (
            <div className="container-label">
                {props.labels.map((label, key) => {
                    return (
                        <p key={key}>
                            {label}
                        </p>
                    )
                })}
            </div>
        )

        const ShowScripts = () => (
            // rendering the list from filteredData and conditional rendering for star icon
            this.props.data.map(script => {
                return (
                    <div key={script.id}
                        onClick={() => this.props.handleSelectedScriptIdChange(script.id)}
                        className="container-listView">
                        <div className="listView-leftpanel">
                            <p>{script.name}</p>
                            <DisplayLabels labels={script.meta.labels} />
                        </div>
                        <div className="listView-rightpanel">
                            {this.props.favourites[script.id] === true &&
                                (<i className="material-icons favourite-icon">star</i>)}
                        </div>
                    </div>
                )
            })
        );

        return (
            <ShowScripts />
        );
    }
}

export default ScriptListView;