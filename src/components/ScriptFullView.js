import React from 'react';

const ScriptFullView = (props) => {

    // Fallback UI
    if (props.data.length === 0 || props.selectedScriptId === '') {
        return <div></div>;
    }

    const scriptFullView = props.data.filter(script => script.id === props.selectedScriptId)[0];

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
    );

    const DisplaySampleInvocation = (props) => (
        <ul className="content-ul">
            {props.sample_invocation.map((invocation, key) => {
                return (
                    <li key={key} className="content-li">{invocation}</li>
                )
            })}
        </ul>
    );

    const CommandsTable = (props) => (
        <table className="table-commands">
            {props.commands.map((command, key) => {
                return (
                    <tr key={key} className="table-commands__row">
                        <td className="table-commands__data">{command.command_main}</td>
                        <td className="table-commands__data">{command.command_description}</td>
                    </tr>)
            })}
        </table>
    )

    return (
        <div>

            <div className="container-markFav">
                <i className="material-icons"
                    style={{ "color": props.color }}
                    onClick={() => props.handleAddToFavourite(scriptFullView.id)}>star</i>
                <p>Mark as favourite</p>
            </div>

            <p className="content-name">{scriptFullView.name}</p>
            <DisplayLabels labels={scriptFullView.meta.labels} />

            <div className="content-desc">

                <p>Owner: {scriptFullView.meta.owner} | Last Updated: {scriptFullView.meta.last_updated}</p>

                <p>Created by: {scriptFullView.meta.creator} on </p>

                <p>Source: {scriptFullView.meta.link}</p>

                <hr />

                <p>Usage: {scriptFullView.usage}</p>

                <p>Sample Invocation: <DisplaySampleInvocation sample_invocation={scriptFullView.sample_invocation} /></p>

                <p>Description:
                    {scriptFullView.description}</p>

                <p>Commands:</p>
                <CommandsTable commands={scriptFullView.commands} />

            </div>
        </div>

    );

};

export default ScriptFullView;