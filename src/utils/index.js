
export function makeRequest(slug) {
    let repo = {}

    return fetch(`https://api.codeclimate.com/v1/repos?github_slug=${slug}`)
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            repo['latestSnapshot'] = res.data[0].relationships.latest_default_branch_snapshot.data.id
            return res;
        })
        .then(function(json) {
            const id = json.data[0].id
            return getBuilds(id);
        })
        .then(function(res) {
            repo['builds'] = res
            return repo;
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
