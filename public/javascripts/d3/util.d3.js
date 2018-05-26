let line = d3.line()
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    })
    .curve(d3.curveLinear);

let drawTriangle = (svg, x, y, color, classes) => {
    let triangles = [];
    triangles.push({
        x: x,
        y: y
    });
    let arc = d3.symbol().type(d3.symbolTriangle);

    let line = svg.selectAll('path')
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