import React, { Component } from 'react'
import Repos from './Searched';
import RepoData from './RepoData';
import { makeRequest } from '../utils/index'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searched: [],
            currentRepo: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    /**
     * Handles the change event on the input.
     * @returns {undefined}
     */
    handleChange(event) {
        this.setState({value: event.target.value});
    }


    /**
     * Initiates the submit action and init's the makeRequest
     * call to gather data.
     * @param {object} event
     * @returns {undefined}
     */
    handleSubmit(event) {
        const repo = {}
        const slug = this.state.value.toLowerCase();
        const response = makeRequest(slug);
        let currentRepo = {};
        let _this = this;

        response.then(function(res) {
            console.log(res);
            _this.setState({currentRepo:res})
        })

        this.searched(slug);
        event.preventDefault();
    }

    /**
     * Creates new array and sets the state to
     * the cumulative recent searches.
     * @param {string} repo
     * @returns {undefined}
     */
    searched(repo) {
        let newArray = this.state.searched.slice();
        if(!newArray.includes(repo)) {
            newArray.push(repo);
            this.setState({searched:newArray})
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">

                    <section className="col">
                        <Repos repos={this.state.searched}/>
                    </section>

                    <div className="col">
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Repository:
                                <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="facebook/react"/>
                            </label>
                            <input type="submit" value="Submit" />
                        </form>

                        {this.state.currentRepo != null ? <RepoData currentRepo={this.state.currentRepo}/> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
