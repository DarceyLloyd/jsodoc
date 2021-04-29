const fs = require("fs")
const path = require("path")

const aftc = require("aftc-node-tools")
const cls = aftc.cls
const log = aftc.log
const getFilesSync = aftc.getFilesSync;
const parseObjectToObject = aftc.parseObjectToObject;
const isDir = aftc.isDir;
const isFile = aftc.isFile;
const readFileToString = aftc.readFileToString;
const writeFile = aftc.writeFile;

const version = require("./package.json").version

// const { commentFooter } = require("./src/config")
const { argsValid } = require("./src/argsValid")
const { getCommentsFromString } = require("./src/getCommentsFromString")
const { formatExt } = require("./src/formatExt")
const { getCommentsFromFiles } = require("./src/getCommentsFromFiles")
const { getTitleAndParams } = require("./src/getTitleAndParams")
const { getGitDocsFromComment } = require("./src/getGitDocsFromComment")
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -





// JSODOC = {
//     "class": "JSODoc",
//     "info": "Comment generation from JSON comments.",
//     "params": [
//         {
//             "type": "object",
//             "def": [
//                 { "name": "Obj1Param1", "required": true, "default": null, "info": "Info..." },
//                 { "name": "Obj1Param2", "required": true, "default": null, "info": "Info..." },
//                 { "name": "Obj1Param3", "required": true, "default": null, "info": "Info..." }
//             ]
//         }
//     ],
//     "example": [
//        "// npm i -D aftc-node-tools",
//        "// npm i -D jsodoc",
//        "",
//        "const { log, cls } = require('aftc-node-tools');",
//        "const { JSODoc } = require('./jsodoc');",
//        "const version = require('./package.json').version;",
//        "",
//        "cls();",
//        "log('Building script starting!'.green)",
//        "",
//        "let subs = {",
//        "    '[[version]]':version,",
//        "    '[[author]]':'darcey.lloyd@gmail.com'",
//        "}",
//        "",
//        "new JSODoc({",
//        "    dir: './src',",
//        "    recursive: true,",
//        "    ext: 'js',",
//        "    template: './docs/template.md',",
//        "    substitutions: mySubs,",
//        "    output: './tests/test.md'",
//        "})",
//        "",
//        "log('Building script completed!'.green)"
//     ]
// } JSODOC




class JSODoc {
    // Ver defs
    args = {
        comments: false, // string (comments being supplied as a string)
        files: false, // array (we need to read and concat files to a string)
        dir: false, // path to scan files in
        recursive: false, // recurse through dir
        ext: false, // extension of files types to collect
        template: false, // the readme template file to use (if not supplied gitDocs will be injected)
        substitutions: false, // single dimensional object for key pair parsing
        output: false, // file create/output to
        overrideGitSummaryTag: false,
        overrideGitDocsTag: false,
    }

    docs = {
        comments: [], // array of all comments as JSON Objects
        collection: [], // array of all class's and methods
        gitSummary: "\n", // GitHub markup list of all class's and methods
        gitDocs: "", // GitHub documentation for all class's and methods found
    }

    configuredCorrectly = false
    mode = false
    template = "";

    readme = "";
    // - - - - - - - - - - - - -

    constructor() {
        log("# # # # # # # # # # # # # # # # # # # # # # # # #".yellow)
        log(("JSODoc v" + version).green)
        log("# # # # # # # # # # # # # # # # # # # # # # # # #".yellow)

        // Parse supplied arguments
        parseObjectToObject(arguments[0], this.args, true)
        // log(this.args)


        // Validate & Process supplied arguments
        // log(argsValid(this.args,false))
        if (!argsValid(this.args)) { return }
        this.configuredCorrectly = true


        // Work out what we are doing (string|files|dir)
        if (this.args.comments !== false) { this.mode = "string" }
        if (this.args.files !== false) { this.mode = "files" }
        if (this.args.dir !== false) { this.mode = "dir" }
        // log(this.mode);


        // Process mode
        switch (this.mode) {
            case "string":
                this.docs.comments = getCommentsFromString(this.args.comments);
                break;
            case "files":
                this.docs.comments = getCommentsFromFiles(this.args.files)
                break;
            case "dir":
                // Validate / format this.args.ext so we process the correct file extensions (.js .php etc)
                this.args.ext = formatExt(this.args.ext)

                // Process path for usage
                this.args.dir = path.resolve(this.args.dir)

                // Check dir exists
                if (!isDir(this.args.dir)) {
                    log(("JSODoc: Unable to find the specified dir '" + this.args.dir + "'.").red)
                    return;
                }

                this.args.files = getFilesSync(this.args.dir, this.args.ext, this.args.recursive)
                // this.args.files = getFilesSync("./tests", ".js", false)

                this.docs.comments = getCommentsFromFiles(this.args.files)
                break;
            default:
                log("JSODoc: Unable to detect the mode to generate your documentation!".red)
                log("Please ensure you have set either comments, files or dir parameters set correctly...".red)
                return;
                break;
        }


        // Parse array of json comments into docs.collection{}
        this.docs.comments.forEach(comment => {

            let title = getTitleAndParams(comment);
            this.docs.collection.push(title)

            this.docs.gitSummary += " - <b>" + title + "</b>\n"

            this.docs.gitDocs += getGitDocsFromComment(comment, title);
            // log("------------------".yellow)
        })

        // Append footer to docs.gitSummary
        this.docs.gitSummary += "\n<hr><br><br>\n\n";


        // Load template
        if (this.args.template !== false) {
            // Process path for usage
            this.args.template = path.resolve(this.args.template)
            if (!isFile(this.args.template)) {
                log(("JSODoc: Unable to find the specified template file '" + this.args.template + "'.").red)
                return;
            } else {
                this.template = readFileToString(this.args.template)
                // log(this.template)
            }
        }







        if (this.args.template === false) {
            // Not template specified, just dump this.docs.gitSummary and this.docs.gitDocs to the readme
            this.readme += "# <b>Available class's & Methods</b>\n"
            this.readme += this.docs.gitSummary
            this.readme += "# <b>Documentation</b>\n\n"
            this.readme += this.docs.gitDocs

        } else {
            // Process template
            this.readme = this.template

            // Process user substitutions
            if (this.args.substitutions) {
                // log(this.args.substitutions)
                for (const key in this.args.substitutions) {
                    let value = this.args.substitutions[key]
                    this.readme = this.readme.replace(key,value)
                }
            }

            // this.readme = this.readme.replace("[[version]]",version)
            if (this.args.overrideGitSummaryTag !== false){
                this.readme = this.readme.replace(this.args.overrideGitSummaryTag, this.docs.gitSummary)
            } else {
                this.readme = this.readme.replace("[[jsodoc-git-summary]]", this.docs.gitSummary)
            }

            if (this.args.overrideGitDocsTag !== false){
                this.readme = this.readme.replace(this.args.overrideGitDocsTag, this.docs.gitDocs)
            } else {
                this.readme = this.readme.replace("[[jsodoc-git-docs]]", this.docs.gitDocs)
            }
        }

        // log("-------")
        // log(readme)
        // log("-------")

        // Write file
        writeFile(this.args.output, this.readme)

        log(("File: " + this.args.output + " has been generated.").green)
        log("# # # # # # # # # # # # # # # # # # # # # # # # #".yellow)
    }
    // - - - - - - - - - - - - -








}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -






module.exports = {
    JSODoc
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -