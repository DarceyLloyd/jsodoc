const aftc = require("aftc-node-tools");
const log = aftc.log;

const fs = require('fs-extra');
const path = require('path');
const util = require('util');
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class Docs
{
    constructor()
    {
        this.comments = [];
    }
    add(vo){
        this.comments.push(vo);
    }
    build(){
        // Parse object to html using standard object syntax, no parser required!
        let out = "";
        this.comments.forEach(function(comment){
            out += comment.name + "\n";
        });
        return out;
    }
    getPrependCode(){
        let code = "";
        code += "const anu = require(\"../node-docs\");\n";
        code += "const docs = new anu.Docs();\n";
        return code;
    }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




function getPrependCode(){
    let code = "";
    code += "const anu = require(\"../node-docs\");\n";
    code += "const docs = new anu.Docs();\n";
    return code;
}




function parseComments(filePath,startMarker,endMarker,silent=true,showLinesAdded=false) {
    if (!silent){
        log(`node-docs.parseComments(
        filePath:${filePath},
        startMarker:${startMarker},
        endMarker:${endMarker},
        silent:${silent}`,"cyan");
    }

    const readline = require('readline');
    let lines = [];
    let newFile = "";
    let lineNo = 0;
    let linesAdded = 0;
    let open = false; // flag for // CStart

    return promise = new Promise((resolve, reject) => {
        let rl = readline.createInterface({
            input: fs.createReadStream(filePath)
        });
    
        rl.on('line', function (line) {
            lineNo++;
    
            if (!open) {
                if (line.indexOf(startMarker) > -1) {
                    open = true;
                    // newFile += line + "\n";
                    // linesAdded++;
                    // if (!silent && showLinesAdded){
                    //     log("ADDING ["+lineNo+"]: " + line,"yellow");
                    // }
                }
            } else {
                if (line.indexOf(endMarker) > -1) {
                    open = false;
                } else {
                    if (!silent && showLinesAdded){
                        log("ADDING ["+lineNo+"]: " + line,"yellow");
                    }
                    newFile += line + "\n";
                    linesAdded++;
                }
                
                
            }
        });
    
        rl.on('close', function (line) {
            if (!silent && showLinesAdded){
                log('Processed ' + lineNo + " lines...","green");
                log('New file has ' + linesAdded + " lines...","green");
            }
            
            resolve(newFile);
        });


    });
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -







module.exports = {
    Docs:Docs,
    parseComments:parseComments,
    getPrependCode:getPrependCode
}






// Tempate of a single docs object
/*
// ndoc start
{
    a: "dace",
    c: [
        {
            name
        }
    ]
}
docs.add({
    name: "xxx",
    type: "function",
    desc: "xxxx",
    version: "0.0.0",
    params: [
        {
            name: "elementId",
            type: "string",
            desc: "id of element to retrieve from the DOM"
        },
        {
            name: "color",
            type: "number",
            desc: "color value to set DOM element background"
        }
    ],
    methods: [
        {
            name: "randomizeColor",
            desc: "id of element to retrieve from the DOM",
            params: [],
            returns: []
        },
        {
            name: "setColor",
            desc: "update the background color to a specified value",
            params: [

            ]
        }
    ],
    returns: [],
    alias: [],
    links: []
});

// ndoc end
*/