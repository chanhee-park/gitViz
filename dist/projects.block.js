'use strict';

function projectsVis(param) {
    var projectIds = param.projects;

    var $projectList = $('#project-list');
    $projectList.empty();
    var projects = [];
    _.forEach(projectIds, function (projectId) {
        projects.push(Data.REPOSITORIES[projectId]);
    });
    projects = _.sortBy(projects, [function (p) {
        return -p.star;
    }]);

    _.forEach(projects, function (project) {
        var desc = project.disc === undefined ? '설명 없음' : project.disc;
        var projectKeywordHtml = '';
        var keywordList = _.uniq(project.keywords);

        _.forEach(keywordList, function (keyword) {
            projectKeywordHtml += '<div class="keyword ' + Data.FIELD_OF_KEY[keyword] + '">' + keyword + '</div>';
        });

        $projectList.append('\n            <div class="project">\n                <div class="main-info">\n                    <a href="https://www.github.com/' + project['full_name'] + '" class="project-name" target="_blank">' + project.name + '</a>\n                    <div class="project-field ' + project.field + '">' + project.field + '</div>\n                </div>\n                <div class="project-description">' + desc + '</div>\n                <div class="project-keyword-list">' + projectKeywordHtml + '</div>\n            </div>\n        ');
    });
}