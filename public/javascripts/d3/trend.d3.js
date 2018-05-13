const trendRoot = d3.select('#trendRenderer');
let trendVis = {
    width: 1100,
    height: 990,

    g_userNet: trendRoot.append('g')
};

console.log("draw trend diagram");