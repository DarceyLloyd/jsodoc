const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const { getInputParamNames } = require("./getInputParamNames");
const { getBlockName } = require("./utils/getBlockName");
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



let getTitleAndParams = (jsonData) => {

    let blockName = getBlockName(jsonData)
    let paramNames = getInputParamNames(jsonData)

    return (blockName + "(" + paramNames + ")")
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -



module.exports = {
    getTitleAndParams
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -