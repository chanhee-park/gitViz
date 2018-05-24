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
        objs.map(function (obj) {
            if (obj.hasOwnProperty(key) && obj[key] === value) {
                extracted.push(obj);
            }
        });
        return extracted;
    };

    this.radians_to_degrees = (radians) => {
        return radians * (180 / PI);
    }
};
