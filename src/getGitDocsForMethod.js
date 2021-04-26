const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const { getMethodTitleAndParams } = require("./getMethodTitleAndParams")
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


const getGitDocsForMethod = (jsonData) => {
    // readme += jsoDocGetTitle(j)
    let str = "";
    str += "## <b>" + getMethodTitleAndParams(jsonData) + "</b>\n";
    str += getMethodInfo(jsonData);
    str += getMethodParams(jsonData);
    str += getMethodReturns(jsonData);
    str += jsoDocGetExample(jsonData);

    return str;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


const getMethodInfo = (jsonData) => {
    let str = "";
    if (jsonData.hasOwnProperty("info")) {
        str += "<b>Information:</b><br>\n" + jsonData.info + "<br>\n";
    }
    return str;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


const getMethodParams = (jsonData) => {
    let str = "";

    if (jsonData.hasOwnProperty("params")) {
        str += "#### <b>Parameters:</b>\n"

        jsonData.params.forEach(param => {
            str += "- "
            if (param.hasOwnProperty("name")) {
                str += "<b>Name:</b> " + param["name"] + "<br>\n"
                // str += "<b>" + param["name"] + "</b><br>\n"
            }
            if (param.hasOwnProperty("type")) {
                str += "<b>Type: </b>" + param["type"] + "<br>\n"
            }
            if (param.hasOwnProperty("required")) {
                str += "<b>Required: </b>" + param["required"] + "<br>\n"
            }
            if (param.hasOwnProperty("default")) {
                str += "<b>Default: </b>" + param["default"] + "<br>\n"
            }
            if (param.hasOwnProperty("info")) {
                str += "<b>Info: </b>" + param["info"] + "<br>\n"
            }
            str += "\n";

        })
        return str
    } else {
        return "";
    }

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



let getMethodReturns = (jsonData) => {

    let str = "";

    if (jsonData.hasOwnProperty("returns")) {
        // Handle old and new
        if (typeof (jsonData.returns) == "string") {
            // The old
            if (jsonData.returns != "") {
                return "<b>Returns:</b>\n" + jsonData.returns + "<br>\n";
            }
        } else {
            // New
            if (jsonData.returns.hasOwnProperty("type")) {
                // log("jsonData.returns.type = " + jsonData.returns.type)

                if (jsonData.returns.type.toLowerCase() == "object") {
                    if (jsonData.returns.hasOwnProperty("params")) {
                        // log(jsonData.returns.params)


                        str += "<b>Returns:</b> Object \n\n"

                        jsonData.returns.params.forEach(param => {
                            str += "- "
                            // log(param)
                            if (param.hasOwnProperty("name")) {
                                str += "<b>Name: </b>" + param["name"] + "<br>\n"
                            }
                            if (param.hasOwnProperty("type")) {
                                str += "<b>Type: </b>" + param["type"] + "<br>\n"
                            }
                            str += "\n";
                        });

                        return str;
                    } else {
                        return "<b>Returns:</b>\nObject<br>\n";
                        // log(("Incorrect syntax on method [" + jsonData.method + "] in the [returns] section...").red);
                    }
                } else {
                    // Arrays || Strings || Numbers || Booleans etc
                    return "<b>Returns:</b>\n" + jsonData.returns.type + "<br>\n";
                }
            }
        }
    } else {
        // log("no returns found on [" + jsonData.method + "]");
    }

    return str;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



let jsoDocGetExample = (jsonData) => {
    let str = "";

    if (jsonData.hasOwnProperty("example")) {
        str += "```\n";
        jsonData.example.forEach(line => {
            str += line + "\n";
        });
        str += "```\n";
    }

    return str;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



module.exports = {
    getGitDocsForMethod
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -