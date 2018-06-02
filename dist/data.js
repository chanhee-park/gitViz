const Data = new function () {
    this.FIELDS = {};
    this.USERS = {};
    this.LINKS = {};
    this.REPOSITORIES = {};

    let that = this;

    $.getJSON('../data/fields_final.json', function (data) {
        that.FIELDS = data;
        console.log('fields', that.FIELDS);
        categorySelectZone(that.FIELDS);
    });

    $.getJSON('../data/links_final.json', function (data) {
        that.LINKS = data;
        console.log('links', that.LINKS);
    });

    $.getJSON('../data/users_final.json', function (data) {
        that.USERS = data;
        console.log('users', that.USERS);
        userVis({ users: that.USERS, links: that.LINKS, fields: that.FIELDS });
    });

    $.getJSON('../data/repos_final.min.json', function (data) {
        that.REPOSITORIES = data;
        console.log('repos', that.REPOSITORIES);
        trendVis({ data: that.REPOSITORIES, conditionInfo: { descText: 'ALL PROJECT', conditions: [] } });
    });
}();