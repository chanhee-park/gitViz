let fs = require('fs');
let _ = require('lodash');

let repos = JSON.parse(fs.readFileSync('./repos_1000_with_descriptions.json'));
let csv = fs.readFileSync('./keywords2.csv').toString();
let lines = csv.split('\n');

let fields = {};

// 필드-키워드 json 생성
_.forEach(lines, function (line) {
    let keywords = line.split(',');
    let field = keywords.splice(0, 1);
    fields[field] = {
        keywords: [],
        project: [],
    };

    _.forEach(keywords, function (keyword) {
        if (keyword === '' || keyword === '\r') return;
        keyword = keyword.replace(/\s/g, '');
        fields[field].keywords.push(keyword);
    });
});

// 중복 제거
_.forEach(fields, function (field) {
    _.uniq(field.keywords);
});
// console.log(fields);
fs.writeFileSync('./fields.json', JSON.stringify(fields, null, 4));


_.forEach(repos, function (rep) {
    rep['keywords'] = [];
    _.forEach(fields, function (field) {
        _.forEach(field.keywords, function (keyword) {
            if (keyword.length < 4) keyword = ' ' + keyword + ' ';
            if (rep.name.toUpperCase().includes(keyword.toUpperCase())) {
                rep['keywords'].push(keyword.replace(/\s/g, ''));
                rep['keywords'].push(keyword.replace(/\s/g, ''));
                rep['keywords'].push(keyword.replace(/\s/g, ''));
                rep['keywords'].push(keyword.replace(/\s/g, ''));
                rep['keywords'].push(keyword.replace(/\s/g, ''));
            }
            if (rep.disc !== undefined && rep.disc.toUpperCase().includes(keyword.toUpperCase())) {
                rep['keywords'].push(keyword.replace(/\s/g, ''));
                rep['keywords'].push(keyword.replace(/\s/g, ''));
            }
            if (rep.tags !== undefined) {
                _.forEach(rep.tags, function (tag) {
                    if (tag.toLocaleUpperCase().includes(keyword.replace(/\s/g, '').toLocaleUpperCase())) {
                        // 키워드는 확실한 정보이므로 3배 가중치 적용
                        rep['keywords'].push(keyword.replace(/\s/g, ''));
                        rep['keywords'].push(keyword.replace(/\s/g, ''));
                        rep['keywords'].push(keyword.replace(/\s/g, ''));
                    }
                });
            }
            if (rep.md !== undefined && rep.md.toUpperCase().includes(keyword.toUpperCase())) {
                rep['keywords'].push(keyword.replace(/\s/g, ''));
            }
        });
    });

    // 한 프로젝트 내 키워드 중복 등장 제거 (안하면 --> 가중치 적용)
    // _.uniq(rep['keywords']);
    if (rep.keywords.length <= 1) {
        delete repos[rep.id];
    }
});

console.log(_.keys(repos).length);

fs.writeFileSync('./repos.json', JSON.stringify(repos, null, 4));

// console.log(cnt, '개 중');                         // 944 전체
// console.log(zero, '개가 0개의 태그를 가지고 있습니다.');  // 12  0 category
// console.log(one, '개가 1개의 태그를 가지고 있습니다.');   // 9   1 category

// git, fork
