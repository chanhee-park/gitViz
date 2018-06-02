let fs = require('fs');
let _ = require('lodash');

let repos = JSON.parse(fs.readFileSync('./repos_1000_with_descriptions.json'));
let users = {};
let sumOfContributions = {};
let links = {};

// 오너인 경우 추가
let cnt = 0;
_.forEach(repos, function (repo) {
    if (!_.has(users, repo.owner_id)) {
        cnt++;
        users[repo.owner_id] = {
            id: repo.owner_id,
            name: repo.owner_name,
            projects: [],
            stars: 0,
            joint_developers: []
        };
    }
    users[repo.owner_id]['projects'].push(repo.id);
    users[repo.owner_id]['stars'] += repo.star;

    sumOfContributions[repo.id] = 0;
    _.forEach(repo.users, function (repoUser) {
        sumOfContributions[repo.id] += repoUser.contributions;
    });
});
console.log(cnt, "명의 오너 추가");


// 기여자인 경우 추가
cnt = 0;
_.forEach(repos, function (repo) {
    _.forEach(repo.users, function (repoUser) {
        if (repoUser.contributions > sumOfContributions[repo.id] / 4) { // > 2% 기여도
            if (!_.has(users, repoUser.id)) {
                cnt++;
                users[repoUser.id] = {
                    id: repoUser.id,
                    name: repoUser.name,
                    projects: [],
                    stars: 0,
                    joint_developers: []
                };
            }
            users[repoUser.id]['projects'].push(repo.id);
            users[repoUser.id]['stars'] += repo.star;
        }
    });
});
console.log(cnt, "명의 기여자 추가");
console.log(_.keys(users).length, "명의 개발자");


// 링크 데이터 생성
_.forEach(repos, function (repo) {
    let repoUserList = _.keys(repo.users);
    let networkUserList = _.keys(users);

    for (let i = 0; i < repoUserList.length; i++) {
        let user1 = repoUserList[i];
        if (networkUserList.indexOf(user1) < 0) continue;

        for (let j = i + 1; j < repoUserList.length; j++) {
            let user2 = repoUserList[j];
            if (networkUserList.indexOf(user2) < 0) continue;
            let linkId = user1 + 'to' + user2;
            if (!_.has(links, linkId)) {
                links[linkId] = {
                    start: user1,
                    end: user2,
                    projects: [],
                };
                users[user1]['joint_developers'].push(user2);
                users[user2]['joint_developers'].push(user1);
            }
            links[linkId]['projects'].push(repo.id);
        }
    }
});

// 중복 제거
_.forEach(users, function (user) {
    _.uniq(user['joint_developers'])
});

console.log(_.keys(links).length, "개의 협업 링크");
// 25 % : 1158
// 50 % :  319
// 오너만 :  155

fs.writeFileSync('./links(25%).json', JSON.stringify(links, null, 4));
fs.writeFileSync('./users(25%).json', JSON.stringify(users, null, 4));

