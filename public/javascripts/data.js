const Data = new function () {
    this.FIELDS = {};
    this.USERS = {};
    this.LINKS = {};
    this.REPOSITORIES = {};
    this.POSITION = {};
    this.FIELD_OF_KEY = {};

    let that = this;


    this.load = async function () {
        that.FIELDS = await $.getJSON('../data/fields_final.json');
        that.USERS = await $.getJSON('../data/users_final.json');
        that.LINKS = await $.getJSON('../data/links_final.json');
        that.REPOSITORIES = await $.getJSON('../data/repos_final.json');
        that.POSITION = await $.getJSON('../data/position.json');

        _.forEach(that.FIELDS, function (field, fieldName) {
            _.forEach(field.keywords, function (keyword) {
                that.FIELD_OF_KEY[keyword] = fieldName;
            });
        });

        userVis({ users: that.USERS, links: that.LINKS, fields: that.FIELDS });
        trendVis({ data: _.keys(that.REPOSITORIES), conditionInfo: { descText: 'ALL PROJECT' } });
        keywordRankingVis({projectsData: _.keys(that.REPOSITORIES) });
    };

};

Data.load();
