'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Data = new function () {
    this.FIELDS = {};
    this.USERS = {};
    this.LINKS = {};
    this.REPOSITORIES = {};
    this.POSITION = {};
    this.FIELD_OF_KEY = {};

    var that = this;

    this.load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return $.getJSON('../data/fields_final.json');

                    case 2:
                        that.FIELDS = _context.sent;
                        _context.next = 5;
                        return $.getJSON('../data/users_final.json');

                    case 5:
                        that.USERS = _context.sent;
                        _context.next = 8;
                        return $.getJSON('../data/links_final.json');

                    case 8:
                        that.LINKS = _context.sent;
                        _context.next = 11;
                        return $.getJSON('../data/repos_final.json');

                    case 11:
                        that.REPOSITORIES = _context.sent;
                        _context.next = 14;
                        return $.getJSON('../data/position.json');

                    case 14:
                        that.POSITION = _context.sent;


                        _.forEach(that.FIELDS, function (field, fieldName) {
                            _.forEach(field.keywords, function (keyword) {
                                that.FIELD_OF_KEY[keyword] = fieldName;
                            });
                        });

                        userVis({ users: that.USERS, links: that.LINKS, fields: that.FIELDS }, { keywordLink: true, userLink: false, userNode: false });
                        trendVis({ data: _.keys(that.REPOSITORIES), conditionInfo: { descText: 'ALL PROJECT' } });
                        keywordRankingVis({ projectsData: _.keys(that.REPOSITORIES) });
                        projectsVis({ projects: _.keys(that.REPOSITORIES) });

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}();

Data.load();