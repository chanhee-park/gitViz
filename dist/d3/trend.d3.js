'use strict';

function trendVis(params) {
    var root = d3.select('#trendRenderer');
    var g = root.append('g');

    var WIDTH = 667;
    var HEIGHT = 300;
    var PADDING_LEFT = 80;
    var PADDING_RIGHT = 40;
    var PADDING_TOP = 40;
    var PADDING_BOTTOM = 20;

    var GRAPH_WIDTH = WIDTH - PADDING_LEFT - PADDING_RIGHT;
    var GRAPH_HEIGHT = HEIGHT - PADDING_BOTTOM - PADDING_TOP;

    var projectsData = {};
    var that = this;

    _.forEach(params.data, function (projectId) {
        if (Data.REPOSITORIES[projectId] !== undefined) {
            projectsData[projectId] = Data.REPOSITORIES[projectId];
        }
    });

    // 가로축
    g.append('line').attr('x1', PADDING_LEFT).attr('x2', GRAPH_WIDTH + PADDING_LEFT).attr('y1', GRAPH_HEIGHT + PADDING_TOP).attr('y2', GRAPH_HEIGHT + PADDING_TOP).attr('stroke', COLOR_AXIS);

    // 세로축
    g.append('line').attr('x1', PADDING_LEFT).attr('x2', PADDING_LEFT).attr('y1', PADDING_TOP).attr('y2', GRAPH_HEIGHT + PADDING_TOP).attr('stroke', COLOR_AXIS);

    var render = function render() {

        d3.selectAll('.stackedArea').remove();

        var fieldsCount = {};
        _.forEach(Data.FIELDS, function (field, fieldName) {
            fieldsCount[fieldName] = {};
        });
        _.forEach(projectsData, function (project) {
            if (_.isNil(fieldsCount[project.field][project['create_date'].split('-')[0]])) fieldsCount[project.field][project['create_date'].split('-')[0]] = 0;
            fieldsCount[project.field][project['create_date'].split('-')[0]] += 1;
        });

        var projectCount = {};
        _.forEach(projectsData, function (project) {
            if (_.isNil(projectCount[project['create_date'].split('-')[0]])) projectCount[project['create_date'].split('-')[0]] = 0;
            projectCount[project['create_date'].split('-')[0]] += 1;
        });

        var max_commit_count = Util.max_key(projectCount).val;
        var ratio_y = GRAPH_HEIGHT / max_commit_count;
        var time_end = parseInt(_.max(_.keys(projectCount)));
        var time_start = parseInt(_.min(_.keys(projectCount)));
        var time_len = time_end - time_start + 1;
        var interval_x = GRAPH_WIDTH / time_len;

        var getCoord = function getCoord(val) {
            return {
                x: val.x * interval_x + PADDING_LEFT,
                y: PADDING_TOP + GRAPH_HEIGHT - val.y * ratio_y
            };
        };

        // 가로축 척도
        for (var time = 0; time <= time_len; time++) {
            g.append('text').text(time + parseInt(_.min(_.keys(projectCount)))).attrs({
                x: getCoord({ x: time, y: 0 }).x,
                y: getCoord({ x: time, y: 0 }).y,
                'alignment-baseline': 'hanging',
                'text-anchor': 'start',
                'fill': COLOR_TEXT_DESC,
                'font-size': FONT_SIZE_AXIS
            });
        }
        // 세로축 척도
        for (var count = 0; count <= max_commit_count; count += Math.ceil(max_commit_count / 10)) {
            g.append('text').text(count).attrs({
                x: getCoord({ x: 0, y: count }).x - 5,
                y: getCoord({ x: 0, y: count }).y,
                'alignment-baseline': 'alphabetic',
                'text-anchor': 'end',
                'fill': COLOR_TEXT_DESC,
                'font-size': FONT_SIZE_AXIS
            });
        }

        // 세로축 척도 설명
        g.append('text').text("Number of projects created in thatKeyword year").attrs({
            x: PADDING_LEFT - 25,
            y: PADDING_TOP - 10,
            'alignment-baseline': 'ideographic',
            'text-anchor': 'start',
            'font-style': 'italic',
            'fill': COLOR_TEXT_DESC,
            'font-size': FONT_SIZE_AXIS
        });

        // stacked Area Chart
        var stacked = _.fill(new Array(time_len), 0);
        var preStacked = _.fill(new Array(time_len), 0);
        _.forEach(fieldsCount, function (fieldCount, fieldName) {
            var lineData = [];
            for (var year = time_start; year <= time_end; year++) {
                var _time = year - time_start;
                var counts = fieldCount[year] === undefined ? 0 : fieldCount[year];
                if (_time === 0) {
                    lineData.push(getCoord({ x: 0, y: stacked[_time] }));
                    lineData.push(getCoord({ x: 0, y: stacked[_time] + counts }));
                }
                lineData.push(getCoord({ x: _time + 0.5, y: stacked[_time] + counts }));
                stacked[_time] += counts;
            }

            lineData.push(getCoord({ x: time_len, y: stacked[time_len - 1] }));
            lineData.push(getCoord({ x: time_len, y: preStacked[time_len - 1] }));
            for (var _time2 = time_len - 1; _time2 >= 0; _time2--) {
                lineData.push(getCoord({ x: _time2 + 0.5, y: preStacked[_time2] }));
            }

            g.append("path").attr("d", d3Util.line(lineData)).attrs({
                fill: FIELD_COLORS[fieldName],
                stroke: '#FFF',
                opacity: UNSELECTED_OPACITY + 0.2,
                'stroke-width': 2
            }).on('mouseover', function () {
                d3.select(this).style("cursor", "pointer");
                d3.select(this).attr('opacity', 1);
                addTooltip(d3.mouse(this)[0], d3.mouse(this)[1], fieldName);
            }).on('mouseout', function () {
                d3.select(this).attr('opacity', UNSELECTED_OPACITY + 0.2);
                d3.selectAll('.tooltip').remove();
            }).on('click', function () {
                var selectedProject = [];
                _.forEach(projectsData, function (project) {
                    if (project.field === fieldName) selectedProject.push(project.id);
                });
                projectsVis({ projects: selectedProject });
            });
            preStacked = _.clone(stacked);
        });
    };

    var addTooltip = function addTooltip(x, y, fieldName) {
        var projects = [];
        _.forEach(projectsData, function (project) {
            if (project.field === fieldName) {
                projects.push(project);
            }
        });
        projects = _.sortBy(projects, function (p) {
            return p.star;
        });
        var representativeProjects = [];
        for (var i = 0; i < 10; i++) {
            representativeProjects.push(projects.pop());
            if (projects.length === 0) break;
        }

        x = x + 20;
        y = y - 20;
        var width = 450;
        var height = 200;
        y = height + y > HEIGHT ? HEIGHT - height - 10 : y;

        g.append('rect').attrs({
            x: x,
            y: y,
            width: width,
            height: height,
            fill: GIT_LIGHT_COLOR,
            stroke: GIT_DARK_COLOR,
            'stroke-width': 1,
            'class': 'tooltip tooltip-box'
        });
        g.append('text').text('field : ' + fieldName).attrs({
            x: x + 10,
            y: y + 10,
            'alignment-baseline': 'hanging',
            'text-anchor': 'start',
            fill: GIT_DARK_COLOR,
            'font-size': FONT_SIZE_DESC,
            'class': 'tooltip tooltip-text'
        });
        g.append('text').text('Representative projects : ').attrs({
            x: x + 10,
            y: y + 10 + FONT_SIZE_DESC * 2,
            'alignment-baseline': 'hanging',
            'text-anchor': 'start',
            fill: GIT_DARK_COLOR,
            'font-size': FONT_SIZE_DESC,
            'class': 'tooltip tooltip-text'
        });
        _.forEach(representativeProjects, function (project, i) {
            g.append('text').text(project.name).attrs({
                x: x + 30 + i % 2 * 200,
                y: y + 10 + FONT_SIZE_DESC * 3 + FONT_SIZE_DESC * (Math.floor(i / 2) * 1.5),
                'alignment-baseline': 'hanging',
                'text-anchor': 'start',
                fill: GIT_DARK_COLOR,
                'font-size': FONT_SIZE_DESC,
                'class': 'tooltip tooltip-text'
            });
        });
    };

    render({ project: _.keys(projectsData) });
}