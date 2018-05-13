const userNetworkRoot = d3.select('#userNetworkRenderer');
let userVis = {
    width: 1100,
    height: 990,

    g_userNet: userNetworkRoot.append('g')
};

console.log("draw user net");