'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var $openButton = $('#category-select-zone-open-button');
var $closeButton = $('#category-select-zone-close-button');
var $selectZone = $('.category-select-zone');

var $fieldList = $('.field-list');

var MINIMUM_CNT_OF_KEYWORD = 0;

$openButton.click(function () {
    $selectZone.css({
        left: 10
    });
});

$closeButton.click(function () {
    $selectZone.css({
        left: -520
    });
});

var categorySelectZone = function categorySelectZone(fields) {
    var selected = [];
    var that = undefined;
    _.forEach(fields, function (field, fieldName) {
        var htmlStr = "<div class='field'>" + "<div class='field-name'>" + fieldName + "</div>" + "<div class='category-list'>";
        _.forEach(field.keywords, function (keyword) {
            if (field.keywordCounts[keyword] > MINIMUM_CNT_OF_KEYWORD) {
                selected.push(keyword);
                htmlStr += "<div class='category selected'>" + keyword + "</div>";
            }
        });
        htmlStr += "</div></div>";
        $fieldList.append(htmlStr);
    });

    $('.category').click(function () {
        var keyword = $(this).html();
        if (_.indexOf(that.selected, keyword) >= 0) {
            that.selected.splice(_.indexOf(that.selected, keyword), 1);
            $(this).removeClass('selected');
            $(this).addClass('unselected');
        } else {
            that.selected.push(keyword);
            $(this).removeClass('unselected');
            $(this).addClass('selected');
        }
        d3.select('#userNetworkRenderer > *').remove();
        var selectedField = {};
        _.forEach(fields, function (field, fieldName) {
            selectedField[fieldName] = { keywords: [] };
            _.forEach(field.keywords, function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keyword) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (_.indexOf(that.selected, keyword) >= 0) {
                                        selectedField[fieldName]['keywords'].push(keyword);
                                    }

                                case 1:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, this);
                }));

                return function (_x) {
                    return _ref.apply(this, arguments);
                };
            }());
        });
        userVis({ users: Data.USERS, links: Data.LINKS, fields: selectedField });
    });
};