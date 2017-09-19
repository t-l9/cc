import React, { Component } from 'react'

export default class Repos extends Component {
    constructor(props) {
        super(props)
    }

    favorited(event) {
        console.log(event);
    }

    render() {
        return (
            <ul>
                { this.props.repos.map((repo, i) => <li onClick={this.favorited} key={i}>{repo}</li>) }
            </ul>
        )
    }
}
