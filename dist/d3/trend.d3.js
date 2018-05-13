const trendVis = new function () {
    this.data = []; // public

    const width = 730; // private
    const height = 580;
    const trendRoot = d3.select('#trendRenderer');

    const g_axis = trendRoot.append('g');
    const g_stacked_area = trendRoot.append('g');
}();

console.log("draw trend diagram");