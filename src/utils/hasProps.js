const log = require("aftc-node-tools").log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function hasProps(object,arrayOfProps){

    for (let i = 0; i < arrayOfProps.length; i++) {
        const propToLookFor = arrayOfProps[i]
        if (object.hasOwnProperty(propToLookFor)) {
            return object[propToLookFor]
        }        
    }

    return false;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = {
    hasProps
}