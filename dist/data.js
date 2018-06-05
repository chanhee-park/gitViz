const Data = new function () {
    this.FIELDS = {};
    this.USERS = {};
    this.LINKS = {};
    this.REPOSITORIES = {};

    let that = this;

    $.getJSON('../data/fields_final.json', function (data) {
        that.FIELDS = data;
        categorySelectZone(that.FIELDS);
    });

    $.getJSON('../data/links_final.json', function (data) {
        that.LINKS = data;
    });

    $.getJSON('../data/users_final.json', function (data) {
        that.USERS = data;
        userVis({ users: that.USERS, links: that.LINKS, fields: that.FIELDS });
    });

    $.getJSON('../data/repos_final.min.json', function (data) {
        that.REPOSITORIES = data;
        trendVis({ data: _.keys(that.REPOSITORIES), conditionInfo: { descText: 'ALL PROJECT', conditions: [] } });
    });
}();