const trendVis = new function () {
    const root = d3.select('#trendRenderer');
    const g = root.append('g');

    const WIDTH = 920;
    const HEIGHT = 580;
    const PADDING_LEFT = 60;
    const PADDING_RIGHT = 30;
    const PADDING_TOP = 20;
    const PADDING_BOTTOM = 20;

    const GRAPH_WIDTH = WIDTH - PADDING_LEFT - PADDING_RIGHT;
    const GRAPH_HEIGHT = HEIGHT - PADDING_BOTTOM - PADDING_TOP;

    this.projectsData = TEST_PROJECT_DATA;

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

        let max_commit_count = 40; // 함수로 계산
        let time_len = 11;
        let interval_x = GRAPH_WIDTH / (time_len - 1);
        let ratio_y = GRAPH_HEIGHT / max_commit_count;

        let getCoord = (val) => {
            return {
                x: val.x * interval_x + PADDING_LEFT,
                y: PADDING_TOP + GRAPH_HEIGHT - val.y * ratio_y
            }
        };

        // 가로축 척도
        for (let time = 0; time < time_len; time++) {
            g.append('text')
                .text(time)
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
        for (let count = 0; count < max_commit_count; count += 5) {
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

        let stackedCommitCount = _.fill(new Array(time_len), 0);
        let preStackedCommitCount = _.fill(new Array(time_len), 0);
        // stacked Area Chart
        _.forEach(this.projectsData, function (project) {
            let lineData = [];
            let committed = true;

            _.forEach(project.each_commit_counts_by_time, function (counts, time) {
                if (committed) {
                    lineData.push(getCoord({ x: time, y: stackedCommitCount[time] }));
                    if (counts > 0) {
                        committed = false;
                    }
                }
                lineData.push(getCoord({ x: time, y: counts + stackedCommitCount[time] }));
                stackedCommitCount[time] += counts;
            });

            for (let i = time_len - 1; i >= 0; i--) {
                lineData.push(getCoord({ x: i, y: preStackedCommitCount[i] }));
            }

            preStackedCommitCount = _.clone(stackedCommitCount);

            g.append("path")
                .attr("d", d3Util.line(lineData))
                .attrs({
                    fill: FIELD_COLORS[project.field],
                    stroke: COLOR_AXIS,
                    'stroke-width': 2,
                });
        })
    };

    this.render();
}();