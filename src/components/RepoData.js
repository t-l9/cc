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
                    <p>Repo GPA: { this.props.currentRepo.gpa }</p>
                </div>

                <div id="builds">
                    { builds.length > 0 && (
                        <div>
                            <p>Latest Builds:</p>
                            <ul>
                                { builds.map((build, i) => <li key={i}><a href={build.links.self}  target="_blank">{build.links.self}</a></li>) }
                            </ul>
                        </div>
                    )}
                </div>

                <div id="latest-snapshot-files-ratings">
                    { files.length > 0 && (
                        <div>
                            <p>Files and Their Their Ratings:</p>
                            <ul>
                                { files.map((file, i) => <li key={i}>File: {file.attributes.path} Rating: {file.attributes.rating}</li>) }
                            </ul>
                        </div>
                    )}
                </div>

                <div id="issues">
                    { issues.length > 0 && (
                        <div>
                            <p>Issues by File In the Latest Build (Filtered by minor severity):</p>
                            <ul>
                                { issues.map((issue, i) => <li key={i}>{issue.attributes.constant_name}</li>) }
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
