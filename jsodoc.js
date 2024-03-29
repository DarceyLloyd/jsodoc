const fs = require("fs")
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const fse = require("fs-extra")
const path = require("path")
const { resolve } = require('path');

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
//                 { "name": "files", "required": false, "default": false, "info": "For using JSODoc in files mode" },
//                 { "name": "dir", "required": false, "default": false, "info": "For using JSODoc in directory mode" },
//                 { "name": "recursive", "required": false, "default": false, "info": "Directory mode recursive scan on or off" },
//                 { "name": "ext", "required": false, "default": null, "info": "Directory mode extensions of files to use" },
//                 { "name": "template", "required": false, "default": false, "info": "If you want JSODOC to use a template and sustitute into it" },
//                 { "name": "substitutions", "required": false, "default": false, "info": "User substitutions object (key value pairs)" },
//                 { "name": "output", "required": false, "default": "./readme.md", "info": "The full path to the .md file to create/write to" }
//             ]
//         }
//     ],
//     "example": [
//         "// npm i -D aftc-node-tools",
//         "// npm i -D jsodoc",
//         "",
//         "const { log, cls } = require('aftc-node-tools');",
//         "const { JSODoc } = require('./jsodoc');",
//         "const version = require('./package.json').version;",
//         "",
//         "cls();",
//         "log('Building script starting!'.green)",
//         "",
//         "let subs = {",
//         "    '[[version]]':version,",
//         "    '[[author]]':'darcey.lloyd@gmail.com'",
//         "}",
//         "",
//         "new JSODoc({",
//         "    dir: './src',",
//         "    recursive: true,",
//         "    ext: 'js',",
//         "    template: './docs/template.md',",
//         "    substitutions: mySubs,",
//         "    output: './tests/test.md'",
//         "})",
//         "",
//         "log('Building script completed!'.green)"
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
        output: "./readme.md", // file create/output to
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
        console.clear();
        log("")
        log(("JSODoc v" + version).green)

        // Parse supplied arguments
        parseObjectToObject(arguments[0], this.args, true)
        // log(this.args)
    }



    async start() {




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
                // this.args.ext = formatExt(this.args.ext)

                // Process path for usage
                this.args.dir = path.resolve(this.args.dir)

                // Check dir exists
                if (!isDir(this.args.dir)) {
                    log(("JSODoc: Unable to find the specified dir '" + this.args.dir + "'.").red)
                    return;
                }


                console.warn("####################")
                let allFiles = await this.getFiles(this.args.dir)
                // console.warn(allFiles);
                // this.args.files = [];

                // Filter files
                this.args.files = [];
                allFiles.forEach(fileToCheck =>{
                    // let temp = fileToCheck + "[" + path.extname(fileToCheck) + "]"
                    let fext = path.extname(fileToCheck);
                    fext = fext.replace(".","");
                    // log(fileToCheck,fext)
                    
                    this.args.ext.forEach(allowedExt => {
                        // log(allowedExt);
                        if (fext === allowedExt) {
                            // log(`Found ${fext} on ${fileToCheck}`)
                            this.args.files.push(fileToCheck);
                        }
                    })
                })

                // console.warn(this.args.files);
                // return;



                // console.warn(this.args.files);

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
                    this.readme = this.readme.replace(key, value)
                }
            }

            // this.readme = this.readme.replace("[[version]]",version)
            if (this.args.overrideGitSummaryTag !== false) {
                this.readme = this.readme.replace(this.args.overrideGitSummaryTag, this.docs.gitSummary)
            } else {
                this.readme = this.readme.replace("[[jsodoc-git-summary]]", this.docs.gitSummary)
            }

            if (this.args.overrideGitDocsTag !== false) {
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
    }
    // - - - - - - - - - - - - -



    async getFiles(dir) {
        const subdirs = await readdir(dir);
        const files = await Promise.all(subdirs.map(async (subdir) => {
            const res = resolve(dir, subdir);
            return (await stat(res)).isDirectory() ? this.getFiles(res) : res;
        }));
        return files.reduce((a, f) => a.concat(f), []);
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -



    async getFilesOfType(dir, ext) {
        const subdirs = await readdir(dir);
        const files = await Promise.all(subdirs.map(async (subdir) => {
            const res = resolve(dir, subdir);

            let f = (await stat(res)).isDirectory() ? await this.getFiles(res) : res;
            console.log(f);
            if (f.includes(ext)) {
                return f;
            }
            // return f;
        }));
        return files.reduce((a, f) => a.concat(f), []);
    }
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - -




}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -






module.exports = {
    JSODoc
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -