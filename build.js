const { log, cls, getFilesSync, readFileToString, writeFile } = require("aftc-node-tools");
const { jsoGetDocs } = require("./jsodoc");
const version = require("./package.json").version;

cls();
log("JSODOC: Starting build process...".green);

// let files = getFilesSync("./src", ".js", true);
let files = ["./jsodoc.js"];

let docs = jsoGetDocs(files);

// Read REAMD-TEMPLATE.md
let readme = readFileToString("./docs/readme-template.md");

// Substitute values into readme
readme = readme.replace("[[version]]",version);
readme = readme.replace("[[summary]]",docs.gitSummary);
readme = readme.replace("[[docs]]",docs.gitDocs);

// Write readme.md
writeFile("./readme.md",readme);