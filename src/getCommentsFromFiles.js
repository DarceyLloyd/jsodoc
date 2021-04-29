const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const concatFiles = aftc.concatFiles;

const { getCommentsFromString } = require("./getCommentsFromString")
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




function getCommentsFromFiles(files) {

    let mergedFiles = concatFiles(files)
    // log(mergedFiles);
    
    let jsonCommentsArray = getCommentsFromString(mergedFiles)
    // log(comments)

    return jsonCommentsArray
}
// - - - - - - - - - - - - -




module.exports = {
    getCommentsFromFiles
}