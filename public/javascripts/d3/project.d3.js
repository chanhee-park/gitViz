function keywordRankingVis(params) {
    const WIDTH = 735;
    const HEIGHT = 530;
    const PADDING_LEFT = 80;
    const PADDING_RIGHT = 40;
    const PADDING_TOP = 20;
    const PADDING_BOTTOM = 50;

    const GRAPH_WIDTH = WIDTH - PADDING_LEFT - PADDING_RIGHT;
    const GRAPH_HEIGHT = HEIGHT - PADDING_BOTTOM - PADDING_TOP;

    const root = d3.select('#keywordRankingRenderer');
    const g = root.append('g');

    let fieldName = params.fieldName;
    let projectsData = params.projectsData;
    const MAX_RANKING = 8;

    // 가로축
    g.append('line')
        .attr('x1', PADDING_LEFT)
        .attr('x2', GRAPH_WIDTH + PADDING_LEFT)
        .attr('y1', GRAPH_HEIGHT + PADDING_TOP)
        .attr('y2', GRAPH_HEIGHT + PADDING_TOP)
        .attr('stroke', COLOR_AXIS);


    let getRankingData = (fieldName, projectsData) => {
        console.log(fieldName);
        let projects = [];
        // 필드와 관련된 프로젝트 목록 추출
        _.forEach(projectsData, function (project) {
            if (project.field === fieldName) {
                projects.push(project);
            }
        });
        // 필드와 관련된 프로젝트에서 자주 쓰인 키워드를 각 년도별로 추출
        let keywordsByYears = {};
        _.forEach(projects, function (project) {
            if (keywordsByYears[project['create_date'].split('-')[0]] === undefined) keywordsByYears[project['create_date'].split('-')[0]] = [];
            keywordsByYears[project['create_date'].split('-')[0]] = keywordsByYears[project['create_date'].split('-')[0]].concat(project['keywords']);
        });
        // 추출된 키워드를 빈도순으로 정렬함  ===> 해당 필드의 년도별 키워드 랭킹 데이터 생성 완료 !
        _.forEach(keywordsByYears, function (keywordsByYear, key) {
            keywordsByYears[key] = Util.extractSortedArray(keywordsByYear)
        });

        let ret = {};
        _.forEach(keywordsByYears, function (keywordsByYear, year) {
            ret[year] = [];
            for (let i = 0; i < MAX_RANKING; i++) {
                ret[year].push(keywordsByYear[i]);
            }
        });
        return ret;
    };

    let lineBasis = d3.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .curve(d3.curveBasis); // curveBasis

    let drawRanking = (keywordsByYears) => {
        // 모든 키워드 리스트 뽑기
        let allKeywordList = [];
        let allYearList = [];
        let keywordAppear = {};
        _.forEach(keywordsByYears, function (keywordByYear, year) {
            allYearList.push(year);
            _.forEach(keywordByYear, function (keyword) {
                allKeywordList.push(keyword);
                keywordAppear[keyword] = false;
            });
        });
        allKeywordList = _.uniq(allKeywordList);

        let ratio_y = GRAPH_HEIGHT / (MAX_RANKING + 1);
        let time_end = _.max(allYearList);
        let time_start = _.min(allYearList);
        let time_len = time_end - time_start + 1;
        let interval_x = GRAPH_WIDTH / (time_len);

        let getCoord = (val) => {
            return {
                x: val.x * interval_x + PADDING_LEFT,
                y: PADDING_TOP + GRAPH_HEIGHT - val.y * ratio_y
            }
        };

        // 가로축 척도
        for (let year = _.min(allYearList); year <= _.max(allYearList); year++) {
            g.append('text')
                .text(year)
                .attrs({
                    x: getCoord({ x: year - _.min(allYearList), y: 0 }).x,
                    y: getCoord({ x: year - _.min(allYearList), y: 0 }).y,
                    'alignment-baseline': 'hanging',
                    'text-anchor': 'start',
                    'fill': COLOR_TEXT_DESC,
                    'font-size': FONT_SIZE_AXIS,
                })
        }

        // 세로축 척도
        for (let count = 1; count <= MAX_RANKING; count++) {
            console.log(count); //  1 ~ max
            g.append('text')
                .text(count)
                .attrs({
                    x: getCoord({ x: 0, y: MAX_RANKING - count + 1 }).x - 25,
                    y: getCoord({ x: 0, y: MAX_RANKING - count + 1 }).y,
                    'alignment-baseline': 'alphabetic',
                    'text-anchor': 'end',
                    'fill': COLOR_TEXT_DESC,
                    'font-size': FONT_SIZE_AXIS,
                })
        }

        const COLOR_RANKING = ['#1f77b4',
            '#aec7e8',
            '#ff7f0e',
            '#ffbb78',
            '#2ca02c',
            '#98df8a',
            '#d62728',
            '#ff9896',
            '#9467bd',
            '#c5b0d5',
            '#8c564b',
            '#c49c94',
            '#e377c2',
            '#f7b6d2',
            '#7f7f7f',
            '#c7c7c7',
            '#bcbd22',
            '#dbdb8d',
            '#17becf',
            '#9edae5'];
        console.log(allKeywordList);
        // 키워드 리스트 돌면서 년도별 등수에 따라 선그래프 그리기
        _.forEach(allKeywordList, function (keyword) {
            let lineData = [];
            let circleData = [];
            _.forEach(allYearList, function (year) {
                let ranking = keywordsByYears[year].indexOf(keyword) + 1; // 1 ~ max
                let time = year - time_start;
                console.log(keyword, year, ranking);
                if (ranking > 0) {
                    lineData.push(getCoord({ x: time - 0.15, y: MAX_RANKING - ranking + 1 }));
                    lineData.push(getCoord({ x: time + 0.15, y: MAX_RANKING - ranking + 1 }));
                    console.log(COLOR_RANKING[allKeywordList.indexOf(keyword) % 20]);
                    if (keywordAppear[keyword] === false) {
                        keywordAppear[keyword] = true;
                        g.append('text')
                            .text(keyword)
                            .attrs({
                                x: getCoord({ x: time + 0.2, y: MAX_RANKING - ranking + 1 }).x,
                                y: getCoord({ x: time + 0.2, y: MAX_RANKING - ranking + 1 }).y,
                                'alignment-baseline': 'ideographic',
                                'text-anchor': 'start',
                                'fill': COLOR_TEXT_DESC,
                                'font-size': FONT_SIZE_AXIS,
                            })
                    }
                    circleData.push({
                        x: getCoord({ x: time, y: MAX_RANKING - ranking + 1 }).x,
                        y: getCoord({ x: time, y: MAX_RANKING - ranking + 1 }).y,
                        color: COLOR_RANKING[allKeywordList.indexOf(keyword) % 20]
                    });
                } else {
                    if (lineData.length > 2) {
                        g.append("path")
                            .attr("d", lineBasis(lineData))
                            .attrs({
                                fill: 'none',
                                stroke: COLOR_RANKING[allKeywordList.indexOf(keyword) % 20],
                                opacity: UNSELECTED_OPACITY + 0.2,
                                'stroke-width': 3,
                            });
                    }
                    keywordAppear[keyword] = false;
                    lineData = [];
                }
            });
            if (lineData.length > 2) {
                g.append("path")
                    .attr("d", lineBasis(lineData))
                    .attrs({
                        fill: 'none',
                        stroke: COLOR_RANKING[allKeywordList.indexOf(keyword)],
                        opacity: UNSELECTED_OPACITY + 0.2,
                        'stroke-width': 3,
                    });
            }
            _.forEach(circleData, function (circle) {
                g.append('circle')
                    .attrs({
                        cx: circle.x,
                        cy: circle.y,
                        r: 5,
                        fill: '#FFF',
                        stroke: circle.color,
                        'stroke-width': 3,
                        'class': 'node',
                    });
            })

        });

    };

    // 키워드 추출
    let keywordsByYears = getRankingData(fieldName, projectsData);
    drawRanking(keywordsByYears);
}