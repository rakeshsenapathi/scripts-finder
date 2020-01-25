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
            this.props.data.map(script => {
                return (
                    <div key={script.id}
                        onClick={() => this.props.handleSelectedScriptIdChange(script.id)}
                        className="container-listView">
                        <p>{script.name}</p>
                        <DisplayLabels labels={script.meta.labels} />
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