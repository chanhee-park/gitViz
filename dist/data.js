'use strict';

var Data = new function () {
    this.FIELDS = {};
    this.USERS = {};
    this.LINKS = {};
    this.REPOSITORIES = {};

    var that = this;

    $.getJSON('../data/fields_final.json', function (data) {
        that.FIELDS = data;
        console.log('fields', that.FIELDS);
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

    $.getJSON('../data/repos_final.json', function (data) {
        that.REPOSITORIES = data;
        console.log('repos', that.REPOSITORIES);
        trendVis({ data: _.keys(that.REPOSITORIES), conditionInfo: { descText: 'ALL PROJECT' } });
    });
}();