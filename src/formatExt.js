const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




function formatExt(ext) {

    let foundDot = ext.indexOf(".")
    if (foundDot !== -1) {
        // Dot found
        return ext
    } else {
        return "." + ext
    }

}
// - - - - - - - - - - - - -




module.exports = {
    formatExt
}