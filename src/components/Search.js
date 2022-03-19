import React, {Component} from "react";
import '../css/App.css';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchQuery: ''
            };
        this.HandleSearch = this.HandleSearch.bind(this);
        this.HandleChange = this.HandleChange.bind(this);
    }

    // updates prop.query and fetches query results
    HandleSearch(e) {
        e.preventDefault();
        let tempQuery = this.state.searchQuery;
        this.props.ChangeQuery(tempQuery);
        this.props.SearchQuery(tempQuery);
    }

    // update value of query box when typed in
    HandleChange(e) {
        const target = e.target;
        const value = target.value
        this.setState({
            searchQuery: value
        });
    }

    render() {
        return (
            <div>
                <form id="queryform" noValidate onSubmit={this.HandleSearch}>
                    <h3>Please sumbit a string you would like to search for.</h3>
                    <br />
                    <input 
                        className='queryBox'
                        type="text"
                        placeholder="Enter Query"
                        value={this.state.SearchQuery}
                        onChange={this.HandleChange}
                    />
                    <br />
                    <button type="submit">Search</button>
                </form>
            </div>
        ) //end return
    } // end render

}

export default Search;