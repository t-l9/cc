import React, { Component } from 'react'

export default class Repos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repos: []
        };
    }


    favorited(event, repo) {
        if (typeof(Storage) !== "undefined") {
            const storage = localStorage.getItem("repos")
            if(!storage) {
                this.setStorage(repo);
            } else {
                if(!storage.includes(repo)) {
                    this.setStorage(repo);
                }
            }

        } else {
            console.log('Your browsers doesn\'t support local storage');
        }
    }


    setStorage(repo) {
        this.state.repos.push(repo)
        localStorage.setItem("repos", JSON.stringify(this.state.repos));
    }


    render() {
        let favoritedRepos = JSON.parse(localStorage.getItem('repos'));
        return (
            <div>
                {this.props.repos.length > 0 && (
                    <div>
                        <h1>Recently Searched:</h1>
                        <span>(click to favorite)</span>
                        <ul>
                            { this.props.repos.map((repo, i) => <li className="recent-search" onClick={(e) => this.favorited(e, repo)} key={i}>{repo}</li>) }
                        </ul>
                    </div>
                )}
                <h1>Favorited:</h1>
                {favoritedRepos != null && (
                    <ul>
                        { favoritedRepos.map((repo, i) => <li key={i}>{repo}</li>) }
                    </ul>
                )}
            </div>
        )
    }
}
