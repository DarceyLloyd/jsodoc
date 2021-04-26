const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



let getMethodParams = (jsonData) => {
    let str = "";
    // log(jsonData);
    // log(jsonData.hasOwnProperty("params"));

    if (jsonData.hasOwnProperty("params")) {
        str += "(";

        jsonData.params.forEach(param => {
            // log(param.label)
            str += param["name"] + ",";
        })
        str += ")";

        // Trim last ,
        // log(str[str.length-2]);
        if (str[str.length - 2] == ",") {
            str = str.replace(",)", ")");
        }

        return str + ""
    } else {
        // No params
        return str + "()";
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -



module.exports = {
    getMethodParams
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -