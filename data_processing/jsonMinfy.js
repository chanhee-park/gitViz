let fs = require('fs');
let repos = JSON.parse(fs.readFileSync('./repos_final.json'));
fs.writeFileSync('./repos_final.min.json', JSON.stringify(repos, null, 0));
