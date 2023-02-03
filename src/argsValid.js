const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
const isArray = aftc.isArray;
const isObject = aftc.isObject;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




function argsValid(args, showMessages = true) {

    let commonMessage = `
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
Usage guide:

// Comments/String mode
let docs = new JSODoc({
    comments: 'abc',
    // template: './docs/template.md',
    // substitutions: subs,
    output: './readme.md'
})
docs.build();

// Files mode
let docs = new JSODoc({
    files: ['./tests/1.0.0/test.js'],
    // template: './docs/template.md',
    // substitutions: subs,
    output: './readme.md'
})
docs.build();

// Directory mode
let docs = new JSODoc({
    dir: './src',
    recursive: true,
    ext: 'js', // use '*' for all files
    // template: './docs/template.md',
    // substitutions: subs,
    output: './readme.md'
})
docs.build();

Please see usage documentation at: https://github.com/DarceyLloyd/jsodoc
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    `;

    let msg = "";

    // Check not setting up for multiple modes
    if (args.comments === false && args.files === false && args.dir === false) {
        msg = "JSODoc: Usage error: Please setup JSODoc correctly."
        log(msg.red)
        log(commonMessage.yellow)
        return false
    }

    if (args.comments !== false && args.files !== false && args.dir !== false) {
        msg = "JSODoc: Usage error: You have supplied comments, files and a directory to parse, only 1 mode at a time."
        log(msg.red)
        log(commonMessage.yellow)
        return false
    }

    if (args.comments !== false && args.files === false && args.dir !== false) {
        msg = "JSODoc: Usage error: You have supplied comments and a directory to parse, only 1 mode at a time."
        log(msg.red)
        log(commonMessage.yellow)
        return false
    }

    if (args.comments !== false && args.files !== false && args.dir === false) {
        msg = "JSODoc: Usage error: You have supplied comments and files to parse, only 1 mode at a time."
        log(msg.red)
        log(commonMessage.yellow)
        return false
    }

    if (args.comments === false && args.files !== false && args.dir !== false) {
        msg = "JSODoc: Usage error: You have supplied files and a directory to parse, only 1 mode at a time."
        log(msg.red)
        log(commonMessage.yellow)
        return false
    }

    // Validate output
    if (args.output !== false) {
        if (typeof (args.output) !== "string") {
            msg = "JSODoc: Usage error: output must be a string."
            log(msg.red)
            log(commonMessage.yellow)
            return false
        }
    } else {
        msg = "JSODoc: Usage error: You need to specify an output file to write your docs to."
        log(msg.red)
        log(commonMessage.yellow)
        return false
    }


    // Work out what mode we are processing and validate for that
    let mode = false;
    if (args.comments !== false) { mode = "string" }
    if (args.files !== false) { mode = "files" }
    if (args.dir !== false) { mode = "dir" }

    switch (mode) {
        case "string":
            if (args.comments !== false) {
                if (typeof (args.comments) !== "string") {
                    msg = "JSODoc: Usage error: You have supplied 'comments' to parse but comments must be a string."
                }
            }
            break;
        case "files":
            if (args.files !== false) {
                if (!isArray(args.files)) {
                    msg = "JSODoc: Usage error: You have supplied 'files' to parse but files must be an array of strings."
                    log(msg.red)
                    log(commonMessage.yellow)
                    return false
                }
            }
            break;
        case "dir":
            // Validate ext and recursive
            if (args.recursive !== false) {
                if (typeof (args.recursive) !== "boolean") {
                    msg = "JSODoc: Usage error: You have set 'recursive' to something other than a boolean, only booleans are supported."
                }
            }

            if (args.ext !== false) {
                if (typeof (args.ext) !== "string" && typeof (args.ext) !== "object") {
                    msg = "JSODoc: Usage error: You have set 'ext' to something other than a string, only strings and arrays are supported."
                    log(msg.red)
                    log(`${typeof(args.ext)}`.red)
                    log(commonMessage.yellow)
                    return false
                }
            } else {
                msg = "JSODoc: Usage error: You need to set the file extension 'ext', eg '.js' or '.php' or use '*' for all files."
                log(msg.red)
                log(commonMessage.yellow)
                return false
            }
            break;
        default:
            msg = "JSODoc: Unable to detect the mode to generate your documentation!\n"
            msg += "Please ensure you have set either comments, files or dir parameters set correctly..."
            log(msg.red)
            log(commonMessage.yellow)
            return false
            break;
    }



    // Check user hasn't screwed up any of the other args

    if (args.template !== false) {
        if (typeof (args.template) !== "string") {
            msg = "JSODoc: Usage error: template must be a string."
            log(msg.red)
            log(commonMessage.yellow)
            return false
        }
    }

    if (args.substitutions !== false) {
        if (!isObject(args.substitutions)) {
            msg = "JSODoc: Usage error: substitutions must be an Object {'marker_to_replace':'replacement_value','version':4}."
            log(msg.red)
            log(commonMessage.yellow)
            return false
        }
    }



    // If we get to this point in the execution process then we have no errors
    return true;
}
// - - - - - - - - - - - - -




module.exports = {
    argsValid
}