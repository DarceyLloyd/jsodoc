const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const ucFirst = aftc.ucFirst;
const isArray = aftc.isArray;
const isObject = aftc.isObject;
const { getPropValue } = require("./utils/getPropValue");
const { hasProp } = require("./utils/hasProp");
const { hasProps } = require("./utils/hasProps");
const { getBlockType } = require("./utils/getBlockType");
const { getBlockName } = require("./utils/getBlockName");
const { getInputParamNames } = require("./getInputParamNames");
const { getNamesFromArray } = require("./utils/getNamesFromArray");
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function getGitDocsFromComment(jsonData, title) {

    // Process flow:
    // Get block type
    // Get class||method name
    // Get title parameters (already supplied by calling function/class)
    // Assemble title
    // Get block information
    // Generate input docs
    // Generate method docs
    // Generate return docs
    // Generate user code snippet
    // Assemble docs

    // Get class||method name
    let vars = {
        blockType: false,
        blockName: false,
        blockInfo: false,
        blockLink: false,

        hasInfo: false,
        hasLink: false,
        hasInputParams: false,
        hasMethods: false,
        hasReturn: false,
        hasExample: false,

        inputParamNames: false,
        inputDocs: "",
        methodDocs: "",
        returnDocs: "",
        exampleDocs: ""
    }

    vars.hasInfo = jsonData.hasOwnProperty("info")
    vars.hasLink = jsonData.hasOwnProperty("link")
    vars.hasInputParams = jsonData.hasOwnProperty("params")
    vars.hasMethods = jsonData.hasOwnProperty("methods")
    vars.hasReturn = jsonData.hasOwnProperty("returns")
    vars.hasExample = jsonData.hasOwnProperty("example")
    vars.inputParamNames = getInputParamNames(jsonData)

    // Get block type
    vars.blockType = getBlockType(jsonData)

    // Get class||method name
    vars.blockName = getBlockName(jsonData)

    // Get block information
    if (vars.hasInfo) {
        vars.blockInfo = jsonData.info
    }

    // Get block information
    if (vars.hasLink) {
        vars.blockLink = "<a href='jsonData.link' target='_blank'>" + jsonData.link + "</a>"
    }

    // Generate input docs
    if (vars.hasInputParams) {
        jsonData.params.forEach(param => {
            // log(param)

            if (param.hasOwnProperty("type")) {
                // We have found a type, but is it object and does object have a def (definition)?
                if (param.type === "object") {
                    if (param.hasOwnProperty("def")) {
                        // We have a valid input object with parameter definitions
                        vars.inputDocs += getGitDocsForObjectInputParam(param.def)
                    } else {
                        // No object def found, user has messed up the syntax, do not process comment
                    }
                } else {
                    // array, number, string, boolean, function etc data types (must have a name), the rest are optional
                    if (param.hasOwnProperty("name")) {
                        vars.inputDocs += getGitDocsForNonObjectInputParam(param)
                    } else {
                        // No name found, user has messed up the syntax, do not process comment
                    }

                }
            } else {
                // Param has no type, user has messed up the syntax, do not process comment
            }
        });
    }

    // Generate method docs
    if (vars.hasMethods) {
        jsonData.methods.forEach(method => {
            // log(param)

            if (method.hasOwnProperty("name")) {
                // We have found a method name
                vars.methodDocs += getGitDocsForMethod(method)
            } else {
                // No method name found, then we are not going to process it
            }
        });
    }

    // Generate return docs
    if (vars.hasReturn){
        vars.returnDocs += getGitDocsForReturns(jsonData)
    }

    // Generate user code snippet
    if (vars.hasExample){
        vars.exampleDocs += "```\n"
        jsonData.example.forEach(entry => {
            vars.exampleDocs += entry + "\n"
        });
        vars.exampleDocs += "```\n"
    }




    // log(vars)

    // Assemble docs
    let docs = "";
    docs += `## <b>${title})</b>\n`

    if (vars.hasInfo) {
        docs += `### <b>Information</b>\n`
        docs += `${vars.blockInfo}\n\n`
    }

    if (vars.hasLink) {
        docs += `### <b>Link</b>\n`
        docs += `${vars.blockLink}\n\n`
    }

    if (vars.hasInputParams){
        docs += `### <b>Parameters</b>\n\n`
        docs += vars.inputDocs
    }

    if (vars.hasReturn){
        docs += `### <b>Returns</b>\n\n`
        docs += vars.returnDocs
    }

    if (vars.hasMethods){
        docs += `### <b>Methods</b>\n\n`
        docs += vars.methodDocs
    }

    if (vars.hasExample){
        docs += `### <b>Example</b>\n\n`
        docs += vars.exampleDocs
    }

    // Pad footer of docs
    docs += "\n\n<hr><br><br>\n\n";

    return docs;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function getGitDocsForReturns(jsonData){
    let docs = "";

    if (jsonData.returns.hasOwnProperty("type")){

        if (jsonData.returns.type.toLowerCase() === "object"){
            if (jsonData.returns.hasOwnProperty("def")){
                // return is an object with defitions (2 tier indent response)

                docs += "- <b>Object</b>" + "\n"

                jsonData.returns.def.forEach(param => {
                    if (param.hasOwnProperty("name")) {
                        docs += "\t" + "- <b>" + param.name + "</b>" + "\n"
                    } else {
                        docs += "\t" + "- <b>NameNotFound</b>" + "\n"
                    }

                    if (param.hasOwnProperty("type")) {
                        docs += "\t\t" + "- <b>Type: </b>" + ucFirst(param.type) + "\n"
                    } else {
                        docs += "\t\t" + "- <b>Type: </b> NameNotFound" + "\n"
                    }

                    if (param.hasOwnProperty("required")) {
                        docs += "\t\t" + "- <b>Rrequired: </b>" + param.required + "\n"
                    }

                    if (param.hasOwnProperty("default")) {
                        docs += "\t\t" + "- <b>Default: </b>" + param.default + "\n"
                    }

                    if (param.hasOwnProperty("info")) {
                        docs += "\t\t" + "- <b>Info: </b>" + param.info + "\n"
                    }

                });

            } else {
                // return is an object with no defs (1 tier indent response)
                docs += "- <b>Object</b>" + "\n"
            }
        } else {
            // return should just be an object of name, type, required, default, info

            if (jsonData.returns.hasOwnProperty("type")) {
                docs += "- <b>Type: </b>" + ucFirst(jsonData.returns.type) + "\n"
            } else {
                docs += "- <b>Type: </b> NoTypeFound" + "\n"
            }

            if (jsonData.returns.hasOwnProperty("info")) {
                docs += "- <b>Info: </b>" + jsonData.returns.info + "\n\n"
            }
        }

    }


    return docs;
}



function getGitDocsForMethod(method) {
    let docs = ""
    let methodParams = ""

    if (method.hasOwnProperty("params")) {
        // Method has params
        methodParams = getNamesFromArray(method.params).join()

        if (method.hasOwnProperty("returns")) {
            docs += "- <b>" + method.name + "(" + methodParams + ") : " + ucFirst(method.returns) + "</b>" + "\n"
        } else {
            docs += "- <b>" + method.name + "(" + methodParams + ")</b>" + "\n"
        }

        method.params.forEach(methodParam => {
            if (methodParam.hasOwnProperty("name")) {
                docs += "\t" + "- <b>" + methodParam.name + "</b>" + "\n"
            } else {
                docs += "\t" + "- <b>NameNotFound</b>" + "\n"
            }

            if (methodParam.hasOwnProperty("type")) {
                docs += "\t\t" + "- <b>Type: </b>" + ucFirst(methodParam.type) + "\n"
            } else {
                docs += "\t\t" + "- <b>Type: </b> NameNotFound" + "\n"
            }

            if (methodParam.hasOwnProperty("required")) {
                docs += "\t\t" + "- <b>Rrequired: </b>" + methodParam.required + "\n"
            }

            if (methodParam.hasOwnProperty("default")) {
                docs += "\t\t" + "- <b>Default: </b>" + methodParam.default + "\n"
            }

            if (methodParam.hasOwnProperty("info")) {
                docs += "\t\t" + "- <b>Info: </b>" + methodParam.info + "\n"
            }

        });
    } else {
        if (method.hasOwnProperty("returns")) {
            docs += "- <b>" + method.name + "() : " + ucFirst(method.returns) + "</b>" + "\n"
        } else {
            docs += "" + "- <b>" + method.name + "()</b>" + "\n"
        }
    }

    // log(docs)

    return docs
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



function getGitDocsForNonObjectInputParam(param) {
    // log("-------".cyan)
    // log(param)

    let docs = ""

    if (param.hasOwnProperty("name")) {
        docs += "" + "- <b>" + param.name + "</b>" + "\n"
    } else {
        // No name found, user has messed up the syntax, but we have to process
        docs += "" + "- <b>UserError</b>" + "\n"
    }

    if (param.hasOwnProperty("type")) {
        docs += "\t" + "- <b>Type:</b> " + param.type + "\n"
    }

    if (param.hasOwnProperty("required")) {
        docs += "\t" + "- <b>Required:</b> " + param.required + "\n"
    }

    if (param.hasOwnProperty("default")) {
        docs += "\t" + "- <b>Default:</b> " + param.default + "\n"
    }

    if (param.hasOwnProperty("info")) {
        docs += "\t" + "- <b>Info:</b> " + param.info + "\n"
    }

    docs += "\n"

    // log(docs)

    return docs
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -





function getGitDocsForObjectInputParam(paramData) {
    // log("-------".cyan)
    // log(paramData)

    let docs = "- <b>Object:</b>\n\n"

    paramData.forEach(param => {
        if (param.hasOwnProperty("name")) {
            docs += "\t" + "- <b>" + param.name + "</b>" + "\n"
        } else {
            // No name found, user has messed up the syntax, but we have to process
            docs += "\t" + "- <b>UserError</b>" + "\n"
        }

        if (param.hasOwnProperty("required")) {
            docs += "\t\t" + "- <b>Required:</b> " + param.required + "\n"
        }

        if (param.hasOwnProperty("default")) {
            docs += "\t\t" + "- <b>Default:</b> " + param.default + "\n"
        }

        if (param.hasOwnProperty("info")) {
            docs += "\t\t" + "- <b>Info:</b> " + param.info + "\n"
        }

        // log(param)
    })

    docs += "\n"

    return docs
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -







// function getTitleParamsx(jsonData) {
//     let titleParams = []; // Collection of {object},string,number,boolean etc

//     if (jsonData.hasOwnProperty("params")) {
//         // Params found!

//         for (const key in jsonData.params) {
//             log("-----")
//             let param = jsonData.params[key]

//             if (Object.keys(param).length == 0) {
//                 log("- - - - - - - - - - - - - - - - - - - - - - - -".yellow)
//                 log("JSODOC: WARNING".yellow)
//                 log("You have a params entry which is just: {}".yellow)
//                 log("Entry will be ignored...".yellow)
//                 log("- - - - - - - - - - - - - - - - - - - - - - - -".yellow)
//             } else {
//                 if (!param.hasOwnProperty("type")) {
//                     let firstKey = Object.keys(param)[0];
//                     // log(firstKey)
//                     log("- - - - - - - - - - - - - - - - - - - - - - - -".red)
//                     log("JSODOC: ERROR: Syntax Error".red)
//                     log("Unable to find 'type' entry for:".red)
//                     log("- - - - - - - - - - - - - - - - - - - - - - - -".red)
//                     log(param)
//                     log("- - - - - - - - - - - - - - - - - - - - - - - -".red)
//                     log(`Found "${firstKey}" instead...`.red)
//                     log("- - - - - - - - - - - - - - - - - - - - - - - -".red)
//                 } else {
//                     // (Objects) If param has prop "def", "definition", "definitions" then we parse that as an object
//                     // Everything else looks for props name, required, default and info

//                     log(param);

//                     let paramType = param.type;
//                     let paramName = false;
//                     let paramRequired = false;
//                     let paramDefault = false;
//                     let paramInfo = false;

//                     let paramDefinition = hasProps(param, ["def", "definition", "definitions"])
//                     if (paramDefinition) {
//                         // Process object param type
//                         log("Processing: Object param collection")

//                         paramDefinition.forEach(objectParamDef => {

//                             paramName = getPropValue(objectParamDef, "name")
//                             // paramRequired = getPropValue(objectParamDef, "required")
//                             // paramDefault = getPropValue(objectParamDef, "default")
//                             // paramInfo = getPropValue(objectParamDef, "info")

//                             titleParams.push(paramName)
//                         });

//                         log(titleParams)

//                     } else {
//                         // Process array, string, number, boolean, function, etc param types
//                         log("Processing: Single param")

//                         paramName = getPropValue(paramDefinition, "name")
//                         titleParams.push(paramName)
//                     }
//                 } // if (!param.hasOwnProperty("type")) {

//             } // if (Object.keys(param).length == 0) {

//         } // for (const key in jsonData.params) {
//     }

//     // Assemble titleParams
//     let str = "";
//     for (let i = 0; i < titleParams.length; i++) {
//         const param = titleParams[i];
//         if (i < (titleParams.length)) {
//             str += param + ","
//         } else {
//             str += param
//         }
//     }

//     log(str)

//     return str;
// }
// // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -












module.exports = {
    getGitDocsFromComment
}