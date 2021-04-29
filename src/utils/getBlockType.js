const log = require("aftc-node-tools").log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function getBlockType(jsonData) {
    let blockType = "";

    if (jsonData.hasOwnProperty("class")) {
        blockType = "class"

    } else if (jsonData.hasOwnProperty("method")) {
        blockType = "method"
    } else {
        blockType = false;
    }

    return blockType;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = {
    getBlockType
}