'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Util = new function () {
    var _this = this;

    this.loadCsv = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return $.get(url);

                        case 2:
                            return _context.abrupt('return', _context.sent);

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
    this.loadCsvByD3 = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return d3.csv(url);

                        case 2:
                            return _context2.abrupt('return', _context2.sent);

                        case 3:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this);
        }));

        return function (_x2) {
            return _ref2.apply(this, arguments);
        };
    }();
    this.loadNumberCsvByD3 = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(url) {
            var data, keys;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return d3.csv(url);

                        case 2:
                            data = _context3.sent;
                            keys = Object.keys(data[0]);

                            _.forEach(data, function (d) {
                                _.forEach(keys, function (key) {
                                    d[key] = parseInt(d[key]);
                                });
                            });
                            return _context3.abrupt('return', data);

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this);
        }));

        return function (_x3) {
            return _ref3.apply(this, arguments);
        };
    }();

    this.extract = function (objs, key, value) {
        var extracted = [];
        _.forEach(objs, function (obj) {
            if (Array.isArray(obj[key]) && obj[key].indexOf(value) >= 0) {
                extracted.push(obj);
            } else if (obj[key] === value) {
                extracted.push(obj);
            }
        });
        return extracted;
    };

    this.radians_to_degrees = function (radians) {
        return radians * (180 / PI);
    };

    this.max_attr_of_objs = function (objs, attr) {
        var max = -1000000;
        for (var i = 0; i < objs.length; i++) {
            if (max < objs[i][attr]) {
                max = objs[i][attr];
            }
        }
        return max;
    };

    this.min_attr_of_objs = function (objs, attr) {
        var min = 1000000000000;
        for (var i = 0; i < objs.length; i++) {
            if (min > objs[i][attr]) {
                min = objs[i][attr];
            }
        }
        return min;
    };

    this.max_key = function (obj) {
        var max = -1000000;
        var maxkey = '';
        _.forEach(obj, function (val, key) {
            if (val > max) {
                max = val;
                maxkey = key;
            }
        });
        return { key: maxkey, val: max };
    };
}();