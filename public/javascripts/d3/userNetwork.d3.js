const userVis = async function () {
    this.data = [];

    const WIDTH = 920;
    const HEIGHT = 990;
    const RADVIZ_RADIUS = 300;
    const RADVIZ_CENTER_X = WIDTH / 2;
    const RADVIZ_CENTER_Y = 400;

    const root = d3.select('#userNetworkRenderer');
    const g = root.append('g');

    const userData = await Util.loadNumberCsvByD3('../data/testRadviz.csv');
    const keys = Object.keys(userData[0]);

    let attractors = [];
    let dataPoints = [];

    function Attractor(name, theta) {
        this.name = name;
        this.x = RADVIZ_CENTER_X + Math.cos(theta) * RADVIZ_RADIUS;
        this.y = RADVIZ_CENTER_Y + Math.sin(theta) * RADVIZ_RADIUS;
        this.theta = theta;
        this.that = this;

        let textX = RADVIZ_CENTER_X + Math.cos(theta) * (RADVIZ_RADIUS + 10);
        let textY = RADVIZ_CENTER_Y + Math.sin(theta) * (RADVIZ_RADIUS + 10);

        let anchor = (this.theta >= PI / 2 && this.theta <= 3 * PI / 2) ? 'end' : 'start';
        let half = (this.theta >= PI / 2 && this.theta <= 3 * PI / 2) ? 180 : 0;

        this.render = () => {
            g.append('text')
                .text(this.name)
                .attrs({
                    x: 0,
                    y: 0,
                    'alignment-baseline': 'central',
                    'text-anchor': anchor,
                    'fill': COLOR_TEXT_DESC,
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
        }
    }

    function DataPoint(attractions, species, color) {
        this.attractions = attractions;
        this.species = species;
        this.color = color;

        this.totalAttractorForce = function () {
            return this.attractions.map(function (a) {
                return a.force
            }).reduce(function (a, b) {
                return a + b
            })
        };
        this.coordinateX = function () {
            return this.attractions.map(function (a) {
                return a.force * a.attractor.x
            }).reduce(function (a, b) {
                return a + b
            }) / this.totalAttractorForce()
        };
        this.coordinateY = function () {
            return this.attractions.map(function (a) {
                return a.force * a.attractor.y
            }).reduce(function (a, b) {
                return a + b
            }) / this.totalAttractorForce()
        };

        this.coordinate = { x: this.coordinateX(), y: this.coordinateY() };
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
        let theta = (2 * PI) * (i / keys.length); // 0 ~ 2*PI
        attractors.push(new Attractor(key, theta).render());
    });

    // radviz 내부 노드 생성
    _.forEach(userData, function (user) {
        let attractions = [];
        _.forEach(keys, function (key, i) {
            attractions.push({ attractor: attractors[i], force: user[attractors[i].name] })
        });
        dataPoints.push(new DataPoint(attractions, 'developer', '#c5c'));
    });

    // radviz 내부 노드 그리기
    _.forEach(dataPoints, function (dataPoint) {
        g.append('circle').attrs({
            cx: dataPoint.coordinate.x,
            cy: dataPoint.coordinate.y,
            r: 5,
            fill: dataPoint.color,
            opacity: 0.5
        }).on('mouseover', function () {
            d3.select(this).attr('opacity', 1).attr('r', 8)
        }).on('mouseout', function () {
            d3.select(this).attr('opacity', 0.5).attr('r', 5)
        })
    });
}();

console.log("draw user network");
