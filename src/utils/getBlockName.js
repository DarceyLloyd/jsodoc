const log = require("aftc-node-tools").log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function getBlockName(jsonData) {
    let blockName = ""; // Class name || Method name
    if (jsonData.hasOwnProperty("class")) {
        blockName = jsonData.class.toString();

    } else if (jsonData.hasOwnProperty("method")) {
        blockName = jsonData.method;
    } else {
        blockName = "NoMethodClassName";
    }

    return blockName;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = {
    getBlockName
}

