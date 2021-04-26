const aftc = require("aftc-node-tools");
const concatFiles = aftc.concatFiles;
const cls = aftc.cls;
const log = aftc.log;

const { getJSOCommentsFromString } = require("./src/getJSOCommentsFromString.js")
const { getMethodTitleAndParams } = require("./src/getMethodTitleAndParams.js")
const { getGitDocsForComment } = require("./src/getGitDocsForComment.js")
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// JSODOC = {
//     "method": "jsoGetDocs",
//     "params": [
//         {
//             "name": "filePathsArrayOrString",
//             "type": "Array||String",
//             "required": true,
//             "info": "Either an array of file paths or a string which contains the documentation to process."
//         }
//     ],
//     "returns": {
//         "type": "Object",
//         "returns": [
//             {"name":"gitSummary","type":"String"},
//             {"name":"gitDocs","type":"String"},
//             {"name":"comments","type":"Array"}
//         ]
//     },
//     "info": "Generates documentation from JavaScript Object based code comments (JSON) .",
//     "example": [
//         "/* Generate docs from an array of files */",
//         "let docs = jsoGetDocs(filesArray)",
//         "",
//         "or",
//         "",
//         "/* Generate docs from a string which contains the JavaScript Object based code comments (JSON) */",
//         "let docs = jsoGetDocs(sourceString)"
//     ]
// } JSODOC

function jsoGetDocs(filePathsArrayOrString) {
    let docs = {
        gitSummary: "", // array of methods/class and arguments
        gitDocs: "", // string ready for github readme.md use
        comments: [], // array of json comments
    };
    let stringToParse = "";

    // Check if we are processing files or a string
    if (typeof (filePathsArrayOrString) == "string") {
        stringToParse = filePathsArrayOrString;
    } else if (filePathsArrayOrString instanceof Array) {
        stringToParse = concatFiles(filePathsArrayOrString);
    } else {
        log("getDocs(): Usage error, please either supply an array of files to process or a string to parse...".red);
        return;
    }

    // Clear - encase of duplicate which could be a lot of ram
    filePathsArrayOrString = false;

    // Parse string for JSODoc Documentation
    let commentsArray = getJSOCommentsFromString(stringToParse)
    // log(commentsArray);

    // Build docs object {gitSummary,gitDocs,comments}
    commentsArray.forEach(comment => {
        // log(comment);
        let jsonData = JSON.parse(comment)

        docs.gitSummary += " - " + getMethodTitleAndParams(jsonData) + "\n";

        docs.gitDocs += getGitDocsForComment(jsonData);

        docs.comments.push(jsonData);
    })

    return docs;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -







module.exports = {
    jsoGetDocs
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -