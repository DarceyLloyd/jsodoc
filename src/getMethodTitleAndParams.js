const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const { getMethodParams } = require("./getMethodParams")
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



let getMethodTitleAndParams = (jsonData) => {
    let str = "";
    // log(jsonData);
    // log(jsonData.hasOwnProperty("params"));
    // return "";

    if (jsonData.hasOwnProperty("method")) {
        str += jsonData.method;
    } else {
        return "- NoMethodFound(ERROR)\n";
    }

    return (str + getMethodParams(jsonData))
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -



module.exports = {
    getMethodTitleAndParams
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -