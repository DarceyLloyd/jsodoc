const log = require("aftc-node-tools").log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


function getNamesFromArray(arr){
    let names = []

    arr.forEach(obj => {
        
        if (obj.hasOwnProperty("name")){
            names.push(obj.name)
        }

    });

    return names;

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = {
    getNamesFromArray
}