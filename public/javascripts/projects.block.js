function projectsVis(param) {
    let projectIds = param.projects;

    let $projectList = $('#project-list');
    $projectList.empty();
    let projects = [];
    _.forEach(projectIds, function (projectId) {
        projects.push(Data.REPOSITORIES[projectId]);
    });
    projects = _.sortBy(projects, [function (p) {
        return -p.star;
    }]);

    _.forEach(projects, function (project) {
        let desc = project.disc === undefined ? '설명 없음' : project.disc;
        let projectKeywordHtml = '';
        let keywordList = _.uniq(project.keywords);

        _.forEach(keywordList, function (keyword) {
            projectKeywordHtml += `<div class="keyword ${Data.FIELD_OF_KEY[keyword]}">${keyword}</div>`
        });

        $projectList.append(`
            <div class="project">
                <div class="main-info">
                    <a href="https://www.github.com/${project['full_name']}" class="project-name" target="_blank">${project.name}</a>
                    <div class="project-field ${project.field}">${project.field}</div>
                </div>
                <div class="project-description">${desc}</div>
                <div class="project-keyword-list">${projectKeywordHtml}</div>
            </div>
        `)
    })
}