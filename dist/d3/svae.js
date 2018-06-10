"use strict";

console.log(keywordCor);
_.forEach(keywordCor, function (eachKeywordCor, from) {
    _.forEach(eachKeywordCor, function (cor, to) {
        if (cor > 1) {
            _.forEach(attractors, function (attractorA) {
                _.forEach(attractors, function (attractorB) {
                    if (attractorA.name === from && attractorB.name === to && attractorA.theta < attractorB.theta) {
                        var thetaDiff = attractorB.theta - attractorA.theta;

                        if (Util.radians_to_degrees(thetaDiff) > 180) {
                            console.log(from, to);
                            console.log(Util.radians_to_degrees(thetaDiff));

                            var temp = attractorA;
                            attractorA = attractorB;
                            attractorB = temp;
                            thetaDiff = attractorB.theta - attractorA.theta;
                            console.log(Util.radians_to_degrees(thetaDiff));
                        }

                        var lineData = [];
                        lineData.push({ x: attractorA.x - 0.1, y: attractorA.y });
                        lineData.push({ x: attractorA.x, y: attractorA.y });
                        lineData.push({ x: attractorA.x + 0.1, y: attractorA.y });

                        if (Util.radians_to_degrees(thetaDiff) < 10) {
                            var theta = attractorA.theta + thetaDiff / 2;
                            var mid_x = RADVIZ_CENTER_X + Math.cos(theta) * (RADVIZ_RADIUS + 200);
                            var mid_y = RADVIZ_CENTER_Y + Math.sin(theta) * (RADVIZ_RADIUS + 200);
                            lineData.push({ x: mid_x, y: mid_y });
                        } else {
                            var maxIter = Math.ceil(Util.radians_to_degrees(thetaDiff) / 15);
                            for (var i = 1; i < maxIter; i++) {
                                var _theta = attractorA.theta + thetaDiff * i / maxIter;
                                var addedR = 300;
                                if (i < maxIter / 2) {
                                    addedR = 300 * i / maxIter;
                                } else {
                                    addedR = 300 - 300 * i / maxIter;
                                }
                                var _mid_x = RADVIZ_CENTER_X + Math.cos(_theta) * (RADVIZ_RADIUS + addedR);
                                var _mid_y = RADVIZ_CENTER_Y + Math.sin(_theta) * (RADVIZ_RADIUS + addedR);
                                lineData.push({ x: _mid_x, y: _mid_y });
                            }
                        }

                        lineData.push({ x: attractorB.x - 0.1, y: attractorB.y });
                        lineData.push({ x: attractorB.x, y: attractorB.y });
                        lineData.push({ x: attractorB.x + 0.1, y: attractorB.y });
                        // console.log(lineData);
                        g.append("path").attr("d", lineBasis(lineData)).attrs({
                            fill: 'none',
                            stroke: '#E179C1',
                            opacity: 0.5,
                            // opacity: UNSELECTED_OPACITY/2,
                            'stroke-width': cor / 2
                        });
                    }
                });
            });
        }
    });
});