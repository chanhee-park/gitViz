async function userVis(param) {
    const root = d3.select('#userNetworkRenderer');
    const g = root.append('g');

    const WIDTH = 920;
    const HEIGHT = 990;
    const RADVIZ_RADIUS = 300;
    const RADVIZ_CENTER_X = WIDTH / 2;
    const RADVIZ_CENTER_Y = 400;

    const userData = param.users;
    const linkData = param.links;
    let keys = [];
    let keyField = {};

    let attractors = []; // keyword
    let dataPoints = []; // node, developer
    let links = []; // link

    _.forEach(param.fields, function (field, fieldName) {
        _.forEach(field.keywords, function (keyword) {
            if (field.keywordCounts[keyword] > MINIMUM_CNT_OF_KEYWORD) {
                keys.push(keyword);
                keyField[keyword] = fieldName;
            }
        });
    });

    function Attractor(name, theta) {
        this.name = name;
        this.field = keyField[name];
        this.x = RADVIZ_CENTER_X + Math.cos(theta) * RADVIZ_RADIUS;
        this.y = RADVIZ_CENTER_Y + Math.sin(theta) * RADVIZ_RADIUS;
        this.theta = theta;
        this.that = this;

        let textX = RADVIZ_CENTER_X + Math.cos(theta) * (RADVIZ_RADIUS + 10);
        let textY = RADVIZ_CENTER_Y + Math.sin(theta) * (RADVIZ_RADIUS + 10);

        let anchor = this.theta >= PI / 2 && this.theta <= 3 * PI / 2 ? 'end' : 'start';
        let half = this.theta >= PI / 2 && this.theta <= 3 * PI / 2 ? 180 : 0;

        this.render = () => {
            g.append('text').text(this.name).attrs({
                x: 0,
                y: 0,
                'alignment-baseline': 'central',
                'text-anchor': anchor,
                'fill': FIELD_COLORS[this.field],
                'font-size': FONT_SIZE_AXIS,
                'transform': 'translate(' + textX + ',' + textY + ') rotate(' + (Util.radians_to_degrees(theta) - half) + ')'
            });

            g.append('line').attrs({
                x1: -5,
                x2: 5,
                stroke: COLOR_AXIS,
                'stroke-weight': '1px',
                'transform': 'translate(' + this.x + ',' + this.y + ') rotate(' + (Util.radians_to_degrees(theta) - half) + ')'
            });
            return this.that;
        };
    }

    function DataPoint(attractions, user) {
        this.attractions = attractions;
        this.user = user;
        this.color = GIT_A_COLOR;
        const that = this;

        this.totalAttractorForce = function () {
            return this.attractions.map(function (a) {
                return a.force;
            }).reduce(function (a, b) {
                return a + b;
            });
        };

        this.getFieldScores = function () {
            let scores = [];
            let i = 0;
            _.forEach(param.fields, function (field) {
                scores[i] = 0;
                _.forEach(field.keywords, function (keyword) {
                    if (_.isNumber(that.user.related_keyword[keyword])) {
                        scores[i] += that.user.related_keyword[keyword];
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
            let r = that.user.stars / 10000;
            if (r > 35) r = 35;
            if (r < 3) r = 3;

            let pieData = that.getFieldScores();
            d3Util.drawPie(g, that.user.id, pieData, that.coordinate.x, that.coordinate.y, r, "node");

            // mouse event zone
            g.append('circle').attrs({
                cx: that.coordinate.x,
                cy: that.coordinate.y,
                r: r,
                fill: '#fff',
                opacity: 0.1,
                'class': 'node'
            }).on('mouseover', function () {
                // addTooltip();
            }).on('mouseout', function () {
                d3.selectAll('.tooltip').remove();
            }).on('click', function () {
                console.log(that.user.id);
                d3.select('#trendRenderer > *').remove();
                trendVis({
                    data: Data.REPOSITORIES,
                    conditionInfo: {
                        descText: 'IS USER ' + user.name + '?',
                        conditions: [{ key: 'owner_id', val: user.id }, { key: 'users', val: user.id }]
                    }
                });
            });
        };

        let addTooltip = () => {
            let r = that.user.star / 10000;
            g.append('rect').attrs({
                x: that.coordinate.x + r + 20,
                y: that.coordinate.y - r - 20,
                width: 150,
                height: 200,
                fill: GIT_DARK_COLOR,
                'class': 'tooltip tooltip-box'
            });
            d3Util.drawTriangle(g, that.coordinate.x + r + 20, that.coordinate.y - 2, GIT_DARK_COLOR, 'tooltip tooltip-box');
            g.append('text').text('name : ' + that.user.name).attrs({
                x: that.coordinate.x + r + 30,
                y: that.coordinate.y - r - 10,
                'alignment-baseline': 'hanging',
                'text-anchor': 'start',
                fill: GIT_DARKBG_TEXT_COLOR,
                'font-size': FONT_SIZE_DESC,
                'class': 'tooltip tooltip-text'

            });
            g.append('text').text('star : ' + that.user.star).attrs({
                x: that.coordinate.x + r + 30,
                y: that.coordinate.y - r - 10 + FONT_SIZE_DESC * 2,
                'alignment-baseline': 'hanging',
                'text-anchor': 'start',
                fill: GIT_DARKBG_TEXT_COLOR,
                'font-size': FONT_SIZE_DESC,
                'class': 'tooltip tooltip-text'
            });
        };
    }

    function Link(link) {
        let start = { x: 0, y: 0 };
        let end = { x: 0, y: 0 };
        // let that = this;

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

        this.render = () => {
            if (start.x === 0 || end.x === 0 || start.y === 0 || end.y === 0) {
                return;
            }
            g.append('line').attrs({
                x1: start.x,
                x2: end.x,
                y1: start.y,
                y2: end.y,
                stroke: COLOR_LINK,
                'stroke-weight': '1px',
                'class': 'link'
            });
        };
    }

    // radviz 외부 원
    g.append('circle').attrs({
        cx: RADVIZ_CENTER_X,
        cy: RADVIZ_CENTER_Y,
        r: RADVIZ_RADIUS,
        fill: 'none',
        stroke: COLOR_AXIS
    });

    // radviz 외부 축
    _.forEach(keys, function (key, i) {
        let theta = 2 * PI * (i / keys.length); // 0 ~ 2*PI
        attractors.push(new Attractor(key, theta).render());
    });

    // radviz 내부 노드 생성
    _.forEach(userData, function (user) {
        let attractions = [];
        _.forEach(keys, function (key, i) {
            let force = _.isUndefined(user['related_keyword'][key]) ? 0 : user['related_keyword'][key];
            attractions.push({ attractor: attractors[i], force: force });
        });
        dataPoints.push(new DataPoint(attractions, user));
    });
    // 노드간 링크 생성
    _.forEach(linkData, function (link) {
        // if(link.projects.length>1){
            links.push(new Link(link));
        // }
    });

    // 링크 그리기
    _.forEach(links, function (link) {
        // link.render();
    });

    // radviz 내부 노드 그리기
    _.forEach(dataPoints, function (dataPoint) {
        dataPoint.render();
    });
}