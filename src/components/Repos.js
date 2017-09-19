import React, { Component } from 'react'

export default class Repos extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
      <ul>
        { this.props.repos.map((repo, i) => <li key={i}>{repo}</li>)}
      </ul>
    )
  }
}
