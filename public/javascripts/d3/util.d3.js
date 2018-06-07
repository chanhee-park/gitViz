const d3Util = new function () {
    this.line = d3.line()
        .x(function (d) {
            return d.x;
        })
        .y(function (d) {
            return d.y;
        })
        .curve(d3.curveLinear);


    this.drawTriangle = (svg, x, y, color, classes) => {
        let g_tri = svg.append('g');
        let triangles = [];
        triangles.push({
            x: x,
            y: y
        });
        let arc = d3.symbol().type(d3.symbolTriangle);

        g_tri.selectAll('path')
            .data(triangles)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', color)
            .attr('transform', function (d) {
                return "translate(" + d.x + "," + d.y + ") rotate(270) scale(1.5)";
            })
            .attr('class', classes);
    };

    let g_pie = {};
    // 데이터로는 각 영역별로 받은 스타의 개수 배열이 들어오도록 할 예정이다
    this.drawPie = (g, id, data, cx, cy, r, classes) => {
        g_pie[id] = g.append('g');

        // pie 생성
        let pie = d3.pie().sort(null); //  정렬안함
        let arc = d3.arc().innerRadius(0).outerRadius(r);

        // 원 그리기
        let oneGraph = g_pie[id].selectAll("path").data(pie(data));

        // 데이터 추가 및 렌더
        oneGraph.enter()
            .append("path")
            .attr('id', 'pie' + id)
            .attr("class", "pie " + classes)
            .attr("d", arc)
            // .attr("stroke", '#333')
            .attr("transform", "translate(" + cx + "," + cy + ")")
            .style("fill", function (d, i) {
                return ['#5A1', '#32C', '#9B6', '#A31', '#1A9', '#16A', '#A81', '#A2A'][i];
            })
            .attr('opacity', 1);
        return oneGraph;
    };
};