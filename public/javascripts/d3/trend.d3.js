function trendVis(params) {
    const root = d3.select('#trendRenderer');
    const g = root.append('g');

    const WIDTH = 920;
    const HEIGHT = 580;
    const PADDING_LEFT = 60;
    const PADDING_RIGHT = 50;
    const PADDING_TOP = 80;
    const PADDING_BOTTOM = 20;

    const GRAPH_WIDTH = WIDTH - PADDING_LEFT - PADDING_RIGHT;
    const GRAPH_HEIGHT = HEIGHT - PADDING_BOTTOM - PADDING_TOP;

    this.projectsData = {};
    const that = this;

    _.forEach(params.data, function (projectId) {
        if (Data.REPOSITORIES[projectId] !== undefined) {
            that.projectsData[projectId] = Data.REPOSITORIES[projectId];
        }
    });

    console.log(that.projectsData);

    // 가로축
    g.append('line')
        .attr('x1', PADDING_LEFT)
        .attr('x2', GRAPH_WIDTH + PADDING_LEFT)
        .attr('y1', GRAPH_HEIGHT + PADDING_TOP)
        .attr('y2', GRAPH_HEIGHT + PADDING_TOP)
        .attr('stroke', COLOR_AXIS);

    // 세로축
    g.append('line')
        .attr('x1', PADDING_LEFT)
        .attr('x2', PADDING_LEFT)
        .attr('y1', PADDING_TOP)
        .attr('y2', GRAPH_HEIGHT + PADDING_TOP)
        .attr('stroke', COLOR_AXIS);

    this.render = () => {
        d3.selectAll('.stackedArea').remove();

        let fieldsCount = {};
        _.forEach(Data.FIELDS, function (field, fieldName) {
            fieldsCount[fieldName] = {};
        });
        _.forEach(that.projectsData, function (project) {
            if (_.isNil(fieldsCount[project.field][project['create_date'].split('-')[0]])) fieldsCount[project.field][project['create_date'].split('-')[0]] = 0;
            fieldsCount[project.field][project['create_date'].split('-')[0]] += 1;
        });

        let projectCount = {};
        _.forEach(that.projectsData, function (project) {
            if (_.isNil(projectCount[project['create_date'].split('-')[0]])) projectCount[project['create_date'].split('-')[0]] = 0;
            projectCount[project['create_date'].split('-')[0]] += 1;
        });

        let max_commit_count = Util.max_key(projectCount).val;
        let ratio_y = GRAPH_HEIGHT / max_commit_count;
        let time_end = parseInt(_.max(_.keys(projectCount)));
        let time_start = parseInt(_.min(_.keys(projectCount)));
        let time_len = time_end - time_start + 1;
        let interval_x = GRAPH_WIDTH / (time_len);

        let getCoord = (val) => {
            return {
                x: val.x * interval_x + PADDING_LEFT,
                y: PADDING_TOP + GRAPH_HEIGHT - val.y * ratio_y
            }
        };

        g.append('text')
            .text('A change in the trend of a project filtered by the condition  "' + params.conditionInfo.descText + '" .')
            .attrs({
                x: PADDING_LEFT,
                y: 15,
                'alignment-baseline': 'hanging',
                'text-anchor': 'start',
                'fill': COLOR_TEXT_DESC,
                'font-weight': '600',
                'font-size': FONT_SIZE_DESC,
            });
        // 가로축 척도
        for (let time = 0; time <= time_len; time++) {
            g.append('text')
                .text(time + parseInt(_.min(_.keys(projectCount))))
                .attrs({
                    x: getCoord({ x: time, y: 0 }).x,
                    y: getCoord({ x: time, y: 0 }).y,
                    'alignment-baseline': 'hanging',
                    'text-anchor': 'start',
                    'fill': COLOR_TEXT_DESC,
                    'font-size': FONT_SIZE_AXIS,
                })
        }
        // 세로축 척도
        for (let count = 0; count <= max_commit_count; count += 10) {
            g.append('text')
                .text(count)
                .attrs({
                    x: getCoord({ x: 0, y: count }).x - 5,
                    y: getCoord({ x: 0, y: count }).y,
                    'alignment-baseline': 'alphabetic',
                    'text-anchor': 'end',
                    'fill': COLOR_TEXT_DESC,
                    'font-size': FONT_SIZE_AXIS,
                })
        }

        // 세로축 척도 설명
        g.append('text')
            .text("Number of projects created in thatKeyword year")
            .attrs({
                x: PADDING_LEFT - 25,
                y: PADDING_TOP - 10,
                'alignment-baseline': 'ideographic',
                'text-anchor': 'start',
                'font-style': 'italic',
                'fill': COLOR_TEXT_DESC,
                'font-size': FONT_SIZE_AXIS,
            });


        // stacked Area Chart
        let stacked = _.fill(new Array(time_len), 0);
        let preStacked = _.fill(new Array(time_len), 0);
        _.forEach(fieldsCount, function (fieldCount, fieldName) {
            let lineData = [];
            for (let year = time_start; year <= time_end; year++) {
                let time = year - time_start;
                let counts = fieldCount[year] === undefined ? 0 : fieldCount[year];
                if (time === 0) {
                    lineData.push(getCoord({ x: 0, y: stacked[time] }));
                    lineData.push(getCoord({ x: 0, y: stacked[time] + counts }));
                }
                lineData.push(getCoord({ x: time + 0.5, y: stacked[time] + counts }));
                stacked[time] += counts;
            }

            lineData.push(getCoord({ x: time_len, y: stacked[time_len - 1] }));
            lineData.push(getCoord({ x: time_len, y: preStacked[time_len - 1] }));
            for (let time = time_len - 1; time >= 0; time--) {
                lineData.push(getCoord({ x: time + 0.5, y: preStacked[time] }));
            }

            g.append("path")
                .attr("d", d3Util.line(lineData))
                .attrs({
                    fill: FIELD_COLORS[fieldName],
                    stroke: '#FFF',
                    opacity: UNSELECTED_OPACITY,
                    'stroke-width': 2,
                })
                .on('mouseover', function () {
                    d3.select(this).attr('opacity', 1);
                    // addTooltip(d3.mouse(this)[0], d3.mouse(this)[1], project);
                })
                .on('mouseout', function () {
                    d3.select(this).attr('opacity', UNSELECTED_OPACITY);
                    // d3.selectAll('.tooltip').remove();
                });
            preStacked = _.clone(stacked);
        });

        // _.forEach(projectCount, function (counts, time) {
        //     time = time - _.min(_.keys(projectCount));
        //     // console.log('year', time + time_start, '-> ', counts, 'project');
        //     if (time === 0) {
        //         lineData.push(getCoord({ x: 0, y: 0 }));
        //         lineData.push(getCoord({ x: 0, y: counts }));
        //     }
        //     lineData.push(getCoord({ x: time + 0.5, y: counts }));
        // });

    };

    let addTooltip = (x, y, project) => {
        g.append('rect').attrs({
            x: x + 40,
            y: y - 30,
            width: 250,
            height: 200,
            fill: GIT_DARK_COLOR,
            'class': 'tooltip tooltip-box'
        });
        d3Util.drawTriangle(g, x + 40, y, GIT_DARK_COLOR, 'tooltip tooltip-box');
        g.append('text')
            .text('name : ' + project.name)
            .attrs({
                x: x + 50,
                y: y - 15,
                'alignment-baseline': 'hanging',
                'text-anchor': 'start',
                fill: GIT_DARKBG_TEXT_COLOR,
                'font-size': FONT_SIZE_DESC,
                'class': 'tooltip tooltip-text'

            });
        g.append('text')
            .text('star : ' + project.star)
            .attrs({
                x: x + 50,
                y: y - 15 + FONT_SIZE_DESC * 2,
                'alignment-baseline': 'hanging',
                'text-anchor': 'start',
                fill: GIT_DARKBG_TEXT_COLOR,
                'font-size': FONT_SIZE_DESC,
                'class': 'tooltip tooltip-text'
            });
    };

    // this.setProjectData = (conditionInfo) => {
    //     // conditionInfo.descText
    //     // conditionInfo.conditions[0].key
    //     // conditionInfo.conditions[0].val
    //     if (conditionInfo.conditions.length < 1) return thatKeyword.projectsData;
    //     let extractedProject = {};
    //     _.forEach(conditionInfo.conditions, function (condition) {
    //         extractedProject = _.union(extractedProject, Util.extract(thatKeyword.projectsData, condition.key, condition.val));
    //     });
    //     console.log(extractedProject);
    //     return extractedProject;
    // };
    // this.projectsData = this.setProjectData(prams.conditionInfo);
    this.render({ project: this.projectsData });
}

