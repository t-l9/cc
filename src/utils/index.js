
export function makeRequest(slug) {
    let repo = {}

    return fetch(`https://api.codeclimate.com/v1/repos?github_slug=${slug}`)
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            repo['id'] = res.data[0].id
            repo['gpa'] = res.data[0].attributes.score;
            repo['latestSnapshot'] = res.data[0].relationships.latest_default_branch_snapshot.data.id
            return res;
        })
        .then(function(res) {
            return getFiles(repo['id'], repo['latestSnapshot']);
        })
        .then(function(res) {
            repo['files'] = res;
        })
        .then(function(res) {
            return getIssues(repo['id'], repo['latestSnapshot']);
        })
        .then(function(res) {
            repo['issues'] = res;
        })
        .then(function(res) {
            return getBuilds(repo['id']);
        })
        .then(function(res) {
            repo['builds'] = res;
            return repo;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function getIssues(repoId, snapshot) {
    return fetch(`https://api.codeclimate.com/v1/repos/${repoId}/snapshots/${snapshot}/issues?filter[severity]=minor`)
        .then(function(res) {
            return res.json();
        })
        .then(function(issues) {
            return issues;
        })
        .catch(function(error) {
            console.log(error);
        });
}


function getFiles(repoId, snapshot) {
    return fetch(`https://api.codeclimate.com/v1/repos/${repoId}/snapshots/${snapshot}/files`)
        .then(function(res) {
            return res.json();
        })
        .then(function(files) {

            return files;
        })
        .catch(function(error) {
            console.log(error);
        });
}


function getBuilds(repoId) {
    return fetch(`https://api.codeclimate.com/v1/repos/${repoId}/builds`)
        .then(function(res) {
            return res.json();
        })
        .then(function(build) {

            return build;
        })
        .catch(function(error) {
            console.log(error);
        });
}

function latestBuildIssues(repoId, snapshot) {
    return fetch(`https://api.codeclimate.com/v1/repos/${repoId}/snapshots/${snapshot}/issues`)
        .then(function(res) {
            return res.json();
        })
        .then(function(build) {

            return build;
        })
        .catch(function(error) {
            console.log(error);
        });
}
