let fs = require('fs');
let _ = require('lodash');

// toDo : user 별 keyword 값을 구한다. (XXX)
// toDo : repo 별 field 값을 구한다.   (XXX)
// toDo : field 별 repo id 를 기록한다. (XXX)

let fields = JSON.parse(fs.readFileSync('./fields.json'));
let repos = JSON.parse(fs.readFileSync('./repos.json'));
let users = JSON.parse(fs.readFileSync('./users(onlyOwner).json'));

// 제2외국어 및 튜토리얼 프로젝트, 인터뷰모음집, 책 모음 등 분야를 구분하기 힘든 프로젝트 제거 (40개)
let remove = ['ResumeSample', 'interviews', 'Interview-Notebook', 'fonts', 'Mantle', 'wrk', 'wechat_jump_game', 'loopback', 'minikube', 'kitematic', 'Best-App', 'slate', 'avelino/awesome-go', 'SlackTextViewController', 'system-design-primer', 'shellcheck', 'gitlabhq', 'grpc', 'my-mac-os', 'nuclide', 'vim', 'Aerial', 'cpython', 'algorithms', 'lantern', 'UITableView-FDTemplateLayoutCell', 'zstd', 'dep', 'og-aws', 'awesome-go', 'wekan', 'OpenAPI-Specification', 'interactive-coding-challenges', 'material-theme', 'HowToBeAProgrammer', 'getlantern/forum', 'deeplearningbook-chinese', 'spf13-vim', 'postal', 'bash-guide'];
_.forEach(repos, function (rep, key) {
    if (remove.indexOf(rep.name) >= 0) {
        delete repos[key];
    }
});


// user 별 keyword 값을 구한다.
_.forEach(users, function (user) {
    user.related_keyword = {};
    _.forEach(user.projects, function (projectId) {
        // keywords 없거나 적어서 삭제한 프로젝트들을 user data 에서 삭제
        if (repos[projectId] === undefined) {
            user.projects.splice(user.projects.indexOf(projectId), 1);
            if (user.projects.length === 0) {
                delete users[user.id];
            }
        } else {
            _.forEach(repos[projectId].keywords, function (keyword) {
                if (!_.has(user.related_keyword, keyword)) {
                    user.related_keyword[keyword] = 1;
                } else {
                    user.related_keyword[keyword] += 1;
                }
            });
        }
    });
    // console.log(user.name, user.related_keyword);
});


// id를 객체내에도 보유하는 것이 관리하기 편하다.
_.forEach(fields, function (f, id) {
    f.name = id;
});


// repo 별 field 값을 구한다.
// field 별 repo id 를 기록한다.
let fieldCount = {};
_.forEach(repos, function (rep) {
    // 0 으로 초기화
    _.forEach(fields, function (f) {
        fieldCount[f.name] = 0;
    });

    // 키워드 총계 구하기
    _.forEach(rep.keywords, function (keyword) {
        _.forEach(fields, function (f) {
            if (f.keywords.indexOf(keyword) >= 0) {
                fieldCount[f.name]++;
            }
        });
    });

    let max = 0;
    let maxFieldName = '';
    _.forEach(fieldCount, function (fc, fieldname) {
        if (max < fc) {
            maxFieldName = fieldname;
            max = fc;
        } else if (max === fc) {
            maxFieldName = fieldname; // 8개의 케이스에 대하여 뒤에 나온 필드 선택
        }
    });
    rep.field = maxFieldName;
    fields[maxFieldName].project.push(rep.id);
});

// 분포
// {
//     graphics: 10,
//     mobile: 110,
//     web: 507,
//     visualization: 11,
//     ML: 58,
//     db: 40,
//     Network: 86,
//     OS: 2
// }


// 키워드별 등장 횟수를 구한다.
_.forEach(fields, function (f) {
    f['keywordConts'] = {};
    _.forEach(f.keywords, function (keyword) {
        // console.log(keyword);
        f['keywordConts'][keyword] = 0;
        _.forEach(repos, function (rep) {
            if (rep.keywords.indexOf(keyword) >= 0) {
                f['keywordConts'][keyword]++;
            }
        });
    });
});

// fs.writeFileSync('./fields_final.json', JSON.stringify(fields, null, 4));
// fs.writeFileSync('./users_final.json', JSON.stringify(users, null, 4));
// fs.writeFileSync('./repos_final.json', JSON.stringify(repos, null, 4));

