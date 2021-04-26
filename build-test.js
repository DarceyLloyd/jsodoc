const { log, cls, getFilesSync, readFileToString, writeFile } = require("aftc-node-tools");
const { jsoGetDocs } = require("./jsodoc");
const version = require("./package.json").version;

cls();
log("JSODOC: Starting build process...".green);

// Get files to be merged
// let files = getFilesSync("./tests", ".js", true);
let files = ["./tests/test1.js"];
// log(files);

let docs = jsoGetDocs(files);
// log(docs.gitSummary);
// log(typeof(docs.gitDocs));
// log(docs.gitDocs);
// log(docs.comments);

// Template
// let readme = readFileToString("./docs/readme-template.md");
let readme = "# <b>TEST-README.md v[[version]]</b>\n\n";
readme += "## <b>Summary</b>\n\n[[summary]]\n\n<hr><br><br>\n\n";
readme += "# <b>Documentation</b>\n\n[[docs]]";
// log(readme)

// Substitute values into readme
readme = readme.replace("[[version]]",version);
readme = readme.replace("[[summary]]",docs.gitSummary);
readme = readme.replace("[[docs]]",docs.gitDocs);
// log(readme)

// Write readme.md
writeFile("./tests/test.md",readme);