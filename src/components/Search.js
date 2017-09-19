import React, { Component } from 'react'
import Repos from './Repos';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searched: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        const slug = this.state.value;
        this.searched(slug);
        fetch(`https://api.codeclimate.com/v1/repos?github_slug=${slug}`)
            .then( function(res) {
                return res.json();
            })
            .then(function(json) {
                console.log(json);
            })
            .catch(function(error) {
                console.log(error);
            });

        event.preventDefault();
    }

    searched(repo) {
        var newArray = this.state.searched.slice();
        newArray.push(repo);
        this.setState({searched:newArray})
        console.log(this.state.searched);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Repository:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

                {this.state.searched.length > 0 ? <Repos repos={this.state.searched}/> : null}
            </div>
        )
    }
}

export default Search;
