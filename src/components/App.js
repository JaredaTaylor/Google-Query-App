import '../css/App.css';
import Search from './Search';
import React, { Component } from 'react';
import FetchQuery from './FetchQuery';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      query: '',
      querySumbit: false,
      queryResults: '',
      selected: '',
    };
    //bind functions
    this.ChangeQuery = this.ChangeQuery.bind(this);
    this.SearchQuery = this.SearchQuery.bind(this);
    this.ChangeSelected = this.ChangeSelected.bind(this);
  }

  // updates value of query, and changes querySumbit to display results
  ChangeQuery(str) {
    let searchQuery = str;

    this.setState({
      query: searchQuery,
      querySumbit: true
    });
  }

  // updates selected value
  ChangeSelected(str) {
    let newSelected = str;

    this.setState({
      selected: newSelected
    });
  }

  // fetches query results from backend
  async SearchQuery(query) {
    const url = "http://127.0.0.1:8000/search/" + query;
    // const url = "http://0.0.0.0:8000/search/" + query;
    const response = await fetch(url);
    const result = await response.json();
    this.setState({
        queryResults: result,
        loading: false,
    });
  }
  
  render() {
    return(
      <main>
        <div className='App'>
          <Search
            query={this.state.query}
            queryResults={this.state.queryResults}
            Runquery={this.Runquery}
            ChangeQuery={this.ChangeQuery}
            SearchQuery={this.SearchQuery}
          />
          {this.state.querySumbit ? <h4>results for: {this.state.query}</h4> : <h4 />}
          {this.state.querySumbit ? <FetchQuery
                                      query={this.state.query}
                                      queryResults={this.state.queryResults}
                                      selected={this.state.selected}
                                      ChangeQuery={this.ChangeQuery}
                                      ChangeSelected={this.ChangeSelected}
                                      SearchQuery={this.SearchQuery}
                                    /> : <div>No current query</div>}
        </div>
      </main>
    );
  }

}


export default App;

