const Util = new function () {
    this.loadCsv = async (url) => await $.get(url);
    this.loadCsvByD3 = async (url) => {
        return await d3.csv(url);
    };
    this.loadNumberCsvByD3 = async (url) => {
        let data = await d3.csv(url);
        const keys = Object.keys(data[0]);
        _.forEach(data, function (d) {
            _.forEach(keys, function (key) {
                d[key] = parseInt(d[key]);
            });
        });
        return data;
    };

    this.extract = (objs, key, value) => {
        let extracted = [];
        _.forEach(objs, function (obj) {
            if (Array.isArray(obj[key]) && obj[key].indexOf(value) >= 0) {
                extracted.push(obj);
            } else if (obj[key] === value) {
                extracted.push(obj);
            }
        });
        return extracted;
    };

    this.radians_to_degrees = (radians) => {
        return radians * (180 / PI);
    };

    this.max_attr_of_objs = (objs, attr) => {
        let max = -1000000;
        for (let i = 0; i < objs.length; i++) {
            if (max < objs[i][attr]) {
                max = objs[i][attr]
            }
        }
        return max;
    };

    this.min_attr_of_objs = (objs, attr) => {
        let min = 1000000000000;
        for (let i = 0; i < objs.length; i++) {
            if (min > objs[i][attr]) {
                min = objs[i][attr]
            }
        }
        return min;
    };

    this.max_key = (obj) => {
        let max = -1000000;
        let maxkey = '';
        _.forEach(obj, function (val, key) {
            if (val > max) {
                max = val;
                maxkey = key;
            }
        });
        return { key: maxkey, val: max };
    }
};
