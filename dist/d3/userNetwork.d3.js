const userVis = new function () {
    this.data = []; // public

    const width = 1100; // private
    const height = 990;
    const userNetworkRoot = d3.select('#userNetworkRenderer');

    const g_userNet = userNetworkRoot.append('g');
}();

console.log("draw user network");