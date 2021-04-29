const log = require("aftc-node-tools").log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function hasProp(object,propToFind){

    if (object.hasOwnProperty(propToFind)) {
        return true;
    }

    return false;

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = {
    hasProp
}