'use strict';

var userVis = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(param) {
        var root, g, WIDTH, HEIGHT, RADVIZ_RADIUS, RADVIZ_CENTER_X, RADVIZ_CENTER_Y, userData, linkData, keys, keyField, attractors, dataPoints, links, selectedNodes, selectedKeywords, selectedLinks, update, Attractor, DataPoint, Link;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        Link = function Link(link) {
                            var start = { x: 0, y: 0 };
                            var end = { x: 0, y: 0 };
                            var id = link.start + 'to' + link.end;

                            _.forEach(dataPoints, function (dataPoint) {
                                if (_.isEqual(userData[link.start], dataPoint.user)) {
                                    start.x = dataPoint.coordinate.x;
                                    start.y = dataPoint.coordinate.y;
                                }
                                if (_.isEqual(userData[link.end], dataPoint.user)) {
                                    end.x = dataPoint.coordinate.x;
                                    end.y = dataPoint.coordinate.y;
                                }
                                if (start === { x: 0, y: 0 } || end === { x: 0, y: 0 }) {
                                    console.log("ERR : 노드를 찾지 못했습니다.");
                                }
                            });

                            this.render = function () {
                                if (start.x === 0 || end.x === 0 || start.y === 0 || end.y === 0) {
                                    return;
                                }
                                var lineG = g.append('line').attrs({
                                    x1: start.x,
                                    x2: end.x,
                                    y1: start.y,
                                    y2: end.y,
                                    stroke: COLOR_LINK,
                                    opacity: 0.5,
                                    'stroke-weight': '100px',
                                    'class': 'link'
                                }).on("mouseover", function () {
                                    d3.select(this).style("cursor", "pointer");
                                }).on('click', function () {
                                    console.log('클릭 :', id);
                                    if (selectedLinks.indexOf(id) < 0) {
                                        selectedLinks.push(id);
                                        lineG.attr('opacity', 1);
                                    } else {
                                        selectedLinks.splice(selectedNodes.indexOf(id), 1);
                                        lineG.attr('opacity', UNSELECTED_OPACITY);
                                    }
                                    update();
                                });
                            };
                        };

                        DataPoint = function DataPoint(attractions, user) {
                            this.attractions = attractions;
                            this.user = user;
                            this.color = GIT_A_COLOR;
                            var thatNode = this;

                            this.totalAttractorForce = function () {
                                return this.attractions.map(function (a) {
                                    return a.force;
                                }).reduce(function (a, b) {
                                    return a + b;
                                });
                            };

                            this.getFieldScores = function () {
                                var scores = [];
                                var i = 0;
                                _.forEach(param.fields, function (field) {
                                    scores[i] = 0;
                                    _.forEach(field.keywords, function (keyword) {
                                        if (_.isNumber(thatNode.user.related_keyword[keyword])) {
                                            scores[i] += thatNode.user.related_keyword[keyword];
                                        }
                                    });
                                    i++;
                                });
                                return scores;
                            };

                            this.coordinateX = function () {
                                return this.attractions.map(function (a) {
                                    return a.force * a.attractor.x;
                                }).reduce(function (a, b) {
                                    return a + b;
                                }) / this.totalAttractorForce();
                            };

                            this.coordinateY = function () {
                                return this.attractions.map(function (a) {
                                    return a.force * a.attractor.y;
                                }).reduce(function (a, b) {
                                    return a + b;
                                }) / this.totalAttractorForce();
                            };

                            this.coordinate = { x: this.coordinateX(), y: this.coordinateY() };

                            this.render = function () {
                                if (this.coordinate.x === 0 || this.coordinate.y === 0) {
                                    return;
                                }
                                var r = thatNode.user.stars / 10000;
                                if (r < 3) r = 3;

                                var pieData = thatNode.getFieldScores();
                                d3Util.drawPie(g, thatNode.user.id, pieData, thatNode.coordinate.x, thatNode.coordinate.y, r, "node");

                                // mouse event zone
                                g.append('circle').attrs({
                                    cx: thatNode.coordinate.x,
                                    cy: thatNode.coordinate.y,
                                    r: r,
                                    fill: '#fff',
                                    'class': 'node',
                                    'opacity': 0.1
                                }).on('mouseover', function () {
                                    // addTooltip();
                                }).on('mouseout', function () {
                                    d3.selectAll('.tooltip').remove();
                                }).on("mouseover", function () {
                                    d3.select(this).style("cursor", "pointer");
                                }).on('click', function () {
                                    console.log('클릭 :', thatNode.user.id);
                                    if (selectedNodes.indexOf(thatNode.user.id) < 0) {
                                        selectedNodes.push(thatNode.user.id);
                                    } else {
                                        selectedNodes.splice(selectedNodes.indexOf(thatNode.user.id), 1);
                                    }
                                    update();
                                });
                            };

                            var addTooltip = function addTooltip() {
                                return;
                                var r = thatNode.user.star / 10000;
                                g.append('rect').attrs({
                                    x: thatNode.coordinate.x + r + 20,
                                    y: thatNode.coordinate.y - r - 20,
                                    width: 150,
                                    height: 200,
                                    fill: GIT_DARK_COLOR,
                                    'class': 'tooltip tooltip-box'
                                });
                                d3Util.drawTriangle(g, thatNode.coordinate.x + r + 20, thatNode.coordinate.y - 2, GIT_DARK_COLOR, 'tooltip tooltip-box');
                                g.append('text').text('name : ' + thatNode.user.name).attrs({
                                    x: thatNode.coordinate.x + r + 30,
                                    y: thatNode.coordinate.y - r - 10,
                                    'alignment-baseline': 'hanging',
                                    'text-anchor': 'start',
                                    fill: GIT_DARKBG_TEXT_COLOR,
                                    'font-size': FONT_SIZE_DESC,
                                    'class': 'tooltip tooltip-text'

                                });
                                g.append('text').text('star : ' + thatNode.user.star).attrs({
                                    x: thatNode.coordinate.x + r + 30,
                                    y: thatNode.coordinate.y - r - 10 + FONT_SIZE_DESC * 2,
                                    'alignment-baseline': 'hanging',
                                    'text-anchor': 'start',
                                    fill: GIT_DARKBG_TEXT_COLOR,
                                    'font-size': FONT_SIZE_DESC,
                                    'class': 'tooltip tooltip-text'
                                });
                            };
                        };

                        Attractor = function Attractor(name, theta) {
                            var _this = this;

                            this.name = name;
                            this.field = keyField[name];
                            this.x = RADVIZ_CENTER_X + Math.cos(theta) * RADVIZ_RADIUS;
                            this.y = RADVIZ_CENTER_Y + Math.sin(theta) * RADVIZ_RADIUS;
                            this.theta = theta;
                            var thatKeyword = this;

                            var textX = RADVIZ_CENTER_X + Math.cos(theta) * (RADVIZ_RADIUS + 10);
                            var textY = RADVIZ_CENTER_Y + Math.sin(theta) * (RADVIZ_RADIUS + 10);

                            var anchor = this.theta >= PI / 2 && this.theta <= 3 * PI / 2 ? 'end' : 'start';
                            var half = this.theta >= PI / 2 && this.theta <= 3 * PI / 2 ? 180 : 0;

                            this.render = function () {
                                var texgG = g.append('text').text(_this.name).attrs({
                                    x: 0,
                                    y: 0,
                                    'alignment-baseline': 'central',
                                    'text-anchor': anchor,
                                    'fill': FIELD_COLORS[_this.field],
                                    'font-size': FONT_SIZE_AXIS,
                                    'transform': 'translate(' + textX + ',' + textY + ') rotate(' + (Util.radians_to_degrees(theta) - half) + ')',
                                    'opacity': UNSELECTED_OPACITY,
                                    'casss': 'keyword-text'
                                }).on("mouseover", function () {
                                    d3.select(this).style("cursor", "pointer");
                                }).on('click', function () {
                                    console.log('클릭 :', thatKeyword.name);
                                    if (selectedKeywords.indexOf(thatKeyword.name) < 0) {
                                        selectedKeywords.push(thatKeyword.name);
                                        texgG.attr('opacity', 1);
                                    } else {
                                        selectedKeywords.splice(selectedKeywords.indexOf(thatKeyword.name), 1);
                                        texgG.attr('opacity', UNSELECTED_OPACITY);
                                    }
                                    update();
                                });

                                g.append('line').attrs({
                                    x1: -5,
                                    x2: 5,
                                    stroke: COLOR_AXIS,
                                    'stroke-weight': '1px',
                                    'opacity': 0.3,
                                    'transform': 'translate(' + _this.x + ',' + _this.y + ') rotate(' + (Util.radians_to_degrees(theta) - half) + ')'
                                });
                                return thatKeyword;
                            };
                        };

                        update = function update() {
                            console.log("선택된 아이들 : ", selectedNodes);
                            console.log("선택된 키워드들 : ", selectedKeywords);
                            console.log("선택된 링크들 : ", selectedLinks);

                            // 선택된 키워드 및 링크를 통해 유저 자동 선택
                            _.forEach(selectedKeywords, function (selected) {
                                _.forEach(Data.REPOSITORIES, function (repo) {
                                    if (repo.keywords.indexOf(selected) >= 0) {
                                        console.log(repo.name);
                                        selectedNodes.push(repo['owner_id']);
                                        selectedNodes.concat(_.keys(repo.users));
                                    }
                                });
                            });

                            _.forEach(selectedLinks, function (selected) {
                                selectedNodes.push(Data.LINKS[selected].start);
                                selectedNodes.push(Data.LINKS[selected].end);
                            });

                            // 선택된 애들 투명도 처리
                            _.forEach(dataPoints, function (dataPoint) {
                                d3.selectAll('#pie' + dataPoint.user.id).classed('selected', selectedNodes.indexOf(dataPoint.user.id) >= 0);
                            });

                            // 프로젝트 필터
                            var projects = [];
                            _.forEach(selectedNodes, function (selected) {
                                projects = projects.concat(Data.USERS[selected].projects);
                            });
                            _.forEach(selectedKeywords, function (selected) {
                                _.forEach(Data.REPOSITORIES, function (repo) {
                                    if (repo.keywords.indexOf(selected) >= 0) {
                                        projects.push(repo.id);
                                    }
                                });
                            });
                            _.forEach(selectedLinks, function (selected) {
                                projects = projects.concat(Data.LINKS[selected].projects);
                            });
                            _.uniq(projects);
                            console.log("project", projects);

                            d3.select('#trendRenderer > *').remove();
                            trendVis({ data: projects, conditionInfo: { descText: 'ALL PROJECT' } });

                            // trendVis({
                            //     conditionInfo: {
                            //         descText: 'IS USER ' + user.name + '?',
                            //
                            //     }
                            // });
                        };

                        root = d3.select('#userNetworkRenderer');
                        g = root.append('g');
                        WIDTH = 1100;
                        HEIGHT = 890;
                        RADVIZ_RADIUS = 335;
                        RADVIZ_CENTER_X = WIDTH / 2;
                        RADVIZ_CENTER_Y = (HEIGHT - 20) / 2;
                        userData = param.users;
                        linkData = param.links;
                        keys = [];
                        keyField = {};
                        attractors = []; // keyword

                        dataPoints = []; // node, developer

                        links = []; // link

                        selectedNodes = [];
                        selectedKeywords = [];
                        selectedLinks = [];


                        _.forEach(param.fields, function (field, fieldName) {
                            _.forEach(field.keywords, function (keyword) {
                                keys.push(keyword);
                                keyField[keyword] = fieldName;
                            });
                        });

                        // radviz 외부 원
                        g.append('circle').attrs({
                            cx: RADVIZ_CENTER_X,
                            cy: RADVIZ_CENTER_Y,
                            r: RADVIZ_RADIUS,
                            fill: 'none',
                            opacity: 0.5,
                            stroke: COLOR_AXIS
                        });

                        // radviz 외부 축
                        _.forEach(keys, function (key, i) {
                            var theta = 2 * PI * (i / keys.length); // 0 ~ 2*PI
                            attractors.push(new Attractor(key, theta).render());
                        });

                        // radviz 내부 노드 생성
                        _.forEach(userData, function (user) {
                            var attractions = [];
                            _.forEach(keys, function (key, i) {
                                var force = _.isUndefined(user['related_keyword'][key]) ? 0 : user['related_keyword'][key];
                                attractions.push({ attractor: attractors[i], force: force });
                            });
                            dataPoints.push(new DataPoint(attractions, user));
                        });
                        // 노드간 링크 생성
                        _.forEach(linkData, function (link) {
                            links.push(new Link(link));
                        });

                        // 링크 그리기
                        _.forEach(links, function (link) {
                            link.render();
                        });

                        // radviz 내부 노드 그리기
                        _.forEach(dataPoints, function (dataPoint) {
                            dataPoint.render();
                        });

                    case 28:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function userVis(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }