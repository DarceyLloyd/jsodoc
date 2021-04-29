const log = require("aftc-node-tools").log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function getPropValue(object,propToGet){

    if (object.hasOwnProperty(propToGet)) {
        return object[propToGet]
    } else {
        return false;
    }

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = {
    getPropValue
}