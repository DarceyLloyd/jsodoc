const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const { getMethodTitleAndParams } = require("./getMethodTitleAndParams")
const { getGitDocsForMethod } = require("./getGitDocsForMethod")

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function getGitDocsForComment(jsonData) {

    if (jsonData.hasOwnProperty("method")) {
        return getGitDocsForMethod(jsonData) + "\n\n<hr><br><br>\n\n";
    } else if (jsonData.hasOwnProperty("class")) {
        // TO DO
        return "## Class docs coming soon";
    } else {
        return "## Unable to find method or class for ```\n" + jsonData + "\n```";
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




module.exports = {
    getGitDocsForComment
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -