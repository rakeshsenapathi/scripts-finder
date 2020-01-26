import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import Filter from './components/Filter';
import ScriptListView from './components/ScriptListView';
import ScriptFullView from './components/ScriptFullView';
import api from './api';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      favourites: [],
      labels: [],
      checkedLabels: {},
      addedToFavourite: {},
      showFavouriteIsChecked: false,
      selectedScriptId: '', // Know the active selectedId to view the fullScript
      keyword: "",
      color: "white", // For mark as favourite
      data: [],
      filteredData: []
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSelectedScriptIdChange = this.handleSelectedScriptIdChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleAddToFavourite = this.handleAddToFavourite.bind(this);
    this.handleApplyChanges = this.handleApplyChanges.bind(this);

  }

  componentDidMount() {

    // On mount, setting the data and filteredData state  
    api.get_scripts((_data) => {
      this.setState({ data: _data });
      this.setState({ filteredData: _data });
      this.setState({ selectedScriptId: this.state.data[0].id });
    });

    // Setting the state for labels and setting checkedLabels key-value pair 
    api.get_labels((_labels) => {
      this.setState({ labels: _labels });
      let checkedLabels = {};
      this.state.labels.map((label) => checkedLabels[label] = false);
      this.setState({ checkedLabels });
    })

  }

  handleSearchChange(event) {

    let data = this.state.data;
    let keyword = event.target.value;
    let updatedData = data.filter(script => script.name.includes(keyword));
    this.setState({ filteredData: updatedData });
    this.setState({ keyword: event.target.value });

  }

  handleSelectedScriptIdChange(scriptId) {

    this.setState({ selectedScriptId: scriptId });
    let color = this.state.addedToFavourite[scriptId] === true ? "yellow" : "white";

    this.setState({ color });

  }

  handleAddToFavourite(script_id) {

    const addedToFavourite = this.state.addedToFavourite;

    let color = this.state.color;

    // Looking for a new property in the addedToFavourite object
    if (!(addedToFavourite.hasOwnProperty(script_id))) {
      addedToFavourite[script_id] = true;
      color = "yellow";
    }
    else {
      addedToFavourite[script_id] = (addedToFavourite[script_id] ? false : true); // Toggle between add to favourite script and remove.
      color = (color === "white" ? "yellow" : "white");
    }

    this.setState({ addedToFavourite });
    this.setState({ color });

  }

  handleFilterChange(filter_type, label_name) {

    const checkedLabels = this.state.checkedLabels;

    let showFavouriteIsChecked = this.state.showFavouriteIsChecked;

    switch (filter_type) {
      case 0:
        checkedLabels[label_name] = (checkedLabels[label_name] ? false : true);
        this.setState({ checkedLabels });
        break;

      case 1:
        this.state.labels.map(label => checkedLabels[label] = true);
        this.setState({ checkedLabels });
        break;

      case 2:
        this.state.labels.map(label => checkedLabels[label] = false);
        this.setState({ checkedLabels });
        break;

      case 3:
        showFavouriteIsChecked = (showFavouriteIsChecked ? false : true);
        this.setState({ showFavouriteIsChecked });
        break;

      case 4:
        this.state.labels.map(label => checkedLabels[label] = false);
        showFavouriteIsChecked = false;
        this.setState({ showFavouriteIsChecked }, () => console.log("Is fav check removed" + JSON.stringify(showFavouriteIsChecked)));
        this.setState({ checkedLabels });
        break;

      default:
        break;

    }

  }

  handleApplyChanges() {

    // Take all the ids which are favourite first and create another filtered data

    let filteredData = [];

    const checkedLabels = this.state.checkedLabels;

    const addedToFavourite = this.state.addedToFavourite;


    if (this.state.showFavouriteIsChecked) {

      filteredData = this.state.data.filter(script => addedToFavourite[script.id] === true);

    }

    else {

      filteredData = this.state.data.filter(script =>
        script.meta.labels.some(label => checkedLabels[label] === true));

      if (filteredData.length !== 0) {
        this.handleSelectedScriptIdChange(filteredData[0].id);
      }

    }

    this.setState({ filteredData });

  }



  render() {
    return (
      <div className="container">

        <div className="container-leftpanel">

          <Header />

          <div className="container-search">

            <Search handleSearchChange={this.handleSearchChange}
              keyword={this.state.keyword} />

            <Filter handleFilterChange={this.handleFilterChange}
              labels={this.state.labels}
              showFavouriteIsChecked={this.state.showFavouriteIsChecked}
              handleApplyChanges={this.handleApplyChanges}
              checkedLabels={this.state.checkedLabels} />

          </div>

          <ScriptListView data={this.state.filteredData}
            color={this.state.color}
            favourites={this.state.addedToFavourite}
            handleSelectedScriptIdChange={this.handleSelectedScriptIdChange} />

        </div>

        <div className="container-fullView">

          <ScriptFullView selectedScriptId={this.state.selectedScriptId}
            data={this.state.filteredData}
            color={this.state.color}
            handleAddToFavourite={this.handleAddToFavourite} />

        </div>

      </div >
    );
  }


}

export default App;
