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

    handleChange(event) {
        this.setState({value: event.target.value});
    }

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

    searched(repo) {
        let newArray = this.state.searched.slice();
        if(!newArray.includes(repo)) {
            newArray.push(repo);
            this.setState({searched:newArray})
        }
    }

    render() {
        return (
            <div>
                <section className="side-bar">
                    {this.state.searched.length > 0 ? <Repos repos={this.state.searched}/> : null}
                </section>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Repository:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {this.state.currentRepo != null ? <RepoData currentRepo={this.state.currentRepo}/> : null}
            </div>
        )
    }
}

export default Search;
