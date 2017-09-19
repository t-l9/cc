import React, { Component } from 'react'

export default class RepoData extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let builds = this.props.currentRepo.builds.data
        let files = this.props.currentRepo.files.data
        let issues = this.props.currentRepo.issues.data

        return (
            <div id="repo-data">
                <div id="gpa">
                    { this.props.currentRepo.gpa }
                </div>

                <div id="builds">
                    Latest Builds:
                    <ul>
                        { builds.map((build, i) => <li key={i}><a href={build.links.self}  target="_blank">{build.links.self}</a></li>) }
                    </ul>
                </div>

                <div id="latest-snapshot-files-ratings">
                    Files and Their Their Ratings:
                    <ul>
                        { files.map((file, i) => <li key={i}>File: {file.attributes.path} Rating: {file.attributes.rating}</li>) }
                    </ul>
                </div>

                <div id="issues">
                    Issues by File In the Latest Build (Filtered by minor severity):
                    <ul>
                        { issues.map((issue, i) => <li key={i}>{issue.attributes.constant_name}</li>) }
                    </ul>
                </div>
            </div>
        )
    }
}
