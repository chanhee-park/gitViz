const fs = require('fs');
const _ = require('lodash');
const RADVIZ_RADIUS = 430;
const RADVIZ_CENTER_X = 590;
const RADVIZ_CENTER_Y = 505;


function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getNormalize(x, y) {
    const dist = getDistance(x, y, 0, 0);
    return {
        x: x / dist,
        y: y / dist,
    }
}

function collisionTest(circle) {
    let flag = true;
    let index = 0;

    while (flag) {
        index++;
        flag = false;
        console.log('wtf ', index);
        _.forEach(circle, src => {
            _.forEach(circle, dst => {
                if (src.id === dst.id) {

                    return;
                }

                const dist = getDistance(src.x, src.y, dst.x, dst.y);


                if (dist < src.r + dst.r) {
                    flag = true;
                    // todo
                    const normal = getNormalize(dst.x - src.x, dst.y - src.y);
                    const r2 = dst.r * dst.r + src.r * src.r;
                    const diff = (dst.r + src.r - dist);

                    src.x = src.x - normal.x * dst.r * dst.r / r2 * diff;
                    src.y = src.y - normal.y * dst.r * dst.r / r2 * diff;

                    dst.x = dst.x + normal.x * src.r * src.r / r2 * diff;
                    dst.y = dst.y + normal.y * src.r * src.r / r2 * diff;

                    // dst.x -= normal.x * (src.r * src.r) / r2 * diff;
                    // dst.y -= normal.y * (src.r * src.r) / r2 * diff;

                    const distSrc = getDistance(RADVIZ_CENTER_X, RADVIZ_CENTER_Y, src.x, src.y);
                    let norm;
                    if (distSrc > RADVIZ_RADIUS) {
                        norm = getNormalize(src.x - RADVIZ_CENTER_X, src.y - RADVIZ_CENTER_Y);
                        src.x = norm.x * (RADVIZ_RADIUS - src.r) + RADVIZ_CENTER_X;
                        src.y = norm.y * (RADVIZ_RADIUS - src.r) + RADVIZ_CENTER_Y;
                    }

                    const distDst = getDistance(RADVIZ_CENTER_X, RADVIZ_CENTER_Y, dst.x, dst.y);
                    if (distDst > RADVIZ_RADIUS) {
                        norm = getNormalize(dst.x - RADVIZ_CENTER_X, dst.y - RADVIZ_CENTER_Y);
                        dst.x = norm.x * (RADVIZ_RADIUS - dst.r) + RADVIZ_CENTER_X;
                        dst.y = norm.y * (RADVIZ_RADIUS - dst.r) + RADVIZ_CENTER_Y;
                    }
                }
            });
        });

        // if (index % 50 === 0) {
        //     fs.writeFileSync(`./circles_collision_${index}.json`, JSON.stringify(collisionTest(json), null, 4));
        // }
        if (index > 200) break;
    }

    return circle
}


const raw = fs.readFileSync('./circles.json').toString();
const json = JSON.parse(raw);

fs.writeFileSync('./circles_collision.json', JSON.stringify(collisionTest(json), null, 4));
