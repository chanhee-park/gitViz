const Util = new function () {
    this.loadCsv = async url => await $.get(url);
    this.loadCsvByD3 = async url => new Promise(function (resolve, reject) {
        d3.csv(url, resolve);
    });
}();