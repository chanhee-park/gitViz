'use strict';

var d3Util = new function () {
    this.line = d3.line().x(function (d) {
        return d.x;
    }).y(function (d) {
        return d.y;
    }).curve(d3.curveLinear); // curveBasis


    this.drawTriangle = function (svg, x, y, color, classes) {
        var g_tri = svg.append('g');
        var triangles = [];
        triangles.push({
            x: x,
            y: y
        });
        var arc = d3.symbol().type(d3.symbolTriangle);

        g_tri.selectAll('path').data(triangles).enter().append('path').attr('d', arc).attr('fill', color).attr('transform', function (d) {
            return "translate(" + d.x + "," + d.y + ") rotate(270) scale(1.5)";
        }).attr('class', classes);
    };

    var g_pie = {};
    // 데이터로는 각 영역별로 받은 스타의 개수 배열이 들어오도록 할 예정이다
    this.drawPie = function (g, id, data, cx, cy, r, classes) {
        g_pie[id] = g.append('g');

        // pie 생성
        var pie = d3.pie().sort(null); //  정렬안함
        var arc = d3.arc().innerRadius(0).outerRadius(r);

        // 원 그리기
        var oneGraph = g_pie[id].selectAll("path").data(pie(data));

        // 데이터 추가 및 렌더
        oneGraph.enter().append("path").attr('id', 'pie' + id).attr("class", "pie " + classes).attr("d", arc)
        // .attr("stroke", '#333')
        .attr("transform", "translate(" + cx + "," + cy + ")").style("fill", function (d, i) {
            return _.values(FIELD_COLORS)[i];
        }).attr('opacity', 1);
        return oneGraph;
    };
}();