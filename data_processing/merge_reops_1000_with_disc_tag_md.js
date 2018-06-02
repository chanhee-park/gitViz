let fs = require('fs');
let _ = require('lodash');


let repos = JSON.parse(fs.readFileSync('./repos_1000.json'));
let descs = JSON.parse(fs.readFileSync('./repos_1000_disc_tag_md.json'));

let cnt = 0;
_.forEach(descs, function (desc) {
    _.forEach(repos, function (repo) {
        if (desc.name.substr(1) === repo.full_name) {
            console.log(desc.name);
            repo['disc'] = desc.disc;
            repo['tags'] = desc['list.tag.'];
            repo['md'] = desc.md;
        }
    })
});

fs.writeFileSync('./repos_1000_with_descriptions.json', JSON.stringify(repos, null, 4));
