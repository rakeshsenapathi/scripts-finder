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
      selectedScriptId: 0,
      keyword: "",
      data: [],
      filteredData: []
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);

  }

  componentDidMount() {

    // On mount, setting the data and filteredData state  
    api.get_scripts((data) => {
      this.setState({ data, filteredData: data });
      this.setState({ selectedScriptId: this.state.data[0].id });
    });

  }

  handleSearchChange(event) {

    this.setState({ keyword: event.target.value });
    let data = this.state.data;
    let keyword = this.state.keyword;
    let updatedData = data.filter(script => script.name.includes(keyword));
    this.setState({ filteredData: updatedData });

  }

  render() {
    return (
      <div>
        <div style={{ "float": "left" }} className="search-box">
          <Header />
          <Search handleSearchChange={this.handleSearchChange} keyword={this.state.keyword} />
          <Filter handleFilterChange={this.handleFilterChange} />
          <ScriptListView data={this.state.filteredData} />
        </div>
        <div style={{ "float": "left" }} className="display-box">
          <ScriptFullView selectedScriptId={this.state.selectedScriptId} />
        </div>
      </div>
    );
  }


}

export default App;
