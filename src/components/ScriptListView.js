import React, { Component } from 'react';
import '../App.css';

class ScriptListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            data: []
        }
    }

    render() {

        const ShowScripts = () => (
            this.props.data.map(script => {
                return (
                    <div key={script.id} onClick={() => console.log("Selected" + script.id)}>
                        <p>{script.name}</p>
                    </div>
                )
            })
        );

        return (
            <div className="script-view">
                <ShowScripts />
            </div>
        );
    }
}

export default ScriptListView;