const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const isArray = aftc.isArray;
const isObject = aftc.isObject;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



let getInputParamNames = (jsonData,returnArray=false) => {

    // log(jsonData)
    let paramNames = [];

    if (jsonData.hasOwnProperty("params")) {
        // Params found!

        for (const key in jsonData.params) {
            // log("-----")
            let param = jsonData.params[key]
            if (param.hasOwnProperty("type")) {
                let paramType = param.type.toLowerCase();
                if (paramType === "object") {
                    paramNames.push("{object}")
                } else {
                    // Check to see if name prop exists
                    if (param.hasOwnProperty("name")) {
                        paramNames.push(param.name)
                    } else {
                        paramNames.push("{object}")
                    }
                }
            } else {
                log("- - - - - - - - - - - - - - - - - - - - - - - -".red)
                log("JSODOC: ERROR: Syntax Error".red)
                log("Params has no type.".red)
                log("- - - - - - - - - - - - - - - - - - - - - - - -".red)
                log(param)
                log("- - - - - - - - - - - - - - - - - - - - - - - -".red)
            }
        }
    }

    // log(paramNames)


    if (returnArray){
        return paramNames;
    }

    let str = "";
    for (let i = 0; i < paramNames.length; i++) {
        const param = paramNames[i]
        if (i < (paramNames.length-1)) {
            str += param + ","
        } else {
            str += param
        }
    }

    // log(str)
    return str
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -



module.exports = {
    getInputParamNames
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -