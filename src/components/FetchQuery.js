import '../css/App.css';
import React, { Component } from "react";

export default class FetchQuery extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
        this.SelectedText = this.SelectedText.bind(this);
        this.HandleSearch = this.HandleSearch.bind(this);
    }

    HandleSearch(e) {
        e.preventDefault();
        // if there is text selected
        // TODO: should validate selected string to remove "--" etc..
        if (this.props.selected !== "") {
            let tempQuery = this.props.selected;
            //console.log("inner search");
            this.props.ChangeQuery(tempQuery);
            this.props.SearchQuery(this.props.selected);
        }
    }

    // updates selected value of props with new selected value
    SelectedText() {
        this.props.ChangeSelected(window.getSelection().toString());
    }
    
    render() {
        const resultList = this.props.queryResults;

        return (
            <div>
                <form id="innerSearch" noValidate onSubmit={this.HandleSearch}>
                    <ol className='result-list' onMouseUpCapture={this.SelectedText}>
                        {resultList === '' ? <li className='result-item' key="none">No results found</li> : resultList.map((r, index) => (
                            <li className='result-item' key={index}>{r}</li>
                        ))}
                    </ol>
                    <br />
                    <button type="submit">Search Within</button>
                </form>
            </div>
        );
    }
}