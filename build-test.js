const { log, cls, getFilesSync, readFileToString, writeFile } = require("aftc-node-tools");
const { JSODoc, jsoGetDocs } = require("./jsodoc");


cls();
const version = require("./package.json").version;


let subs = {
    "[[version]]":version,
    "[[author]]":"darcey.lloyd@gmail.com"
}

// Test string input
let str = `// JSODOC = {
//     "method": "enableDebug",
//     "info": "Enables debugging.",
//     "example": [
//         "enableDebug();"
//     ]
// } JSODOC`;

let jsoDoc = new JSODoc({
    // comments: str,
    // files: ['./tests/basic.js'],
    dir: './tests',
    recursive: false,
    ext: ['js','ts'],
    template: './tests/template.md',
    substitutions: subs,
    output: './tests/test.md'
})
jsoDoc.start();



// v0.9.2
// // Get files to be merged
// // let files = getFilesSync("./tests", ".js", true);
// let files = ["./tests/test1.js"];
// // log(files);

// let docs = jsoGetDocs(files);
// // log(docs.gitSummary);
// // log(typeof(docs.gitDocs));
// // log(docs.gitDocs);
// // log(docs.comments);

// // Template
// // let readme = readFileToString("./docs/readme-template.md");
// let readme = "# <b>TEST-README.md v[[version]]</b>\n\n";
// readme += "## <b>Summary</b>\n\n[[summary]]\n\n<hr><br><br>\n\n";
// readme += "# <b>Documentation</b>\n\n[[docs]]";
// // log(readme)

// // Substitute values into readme
// readme = readme.replace("[[version]]",version);
// readme = readme.replace("[[summary]]",docs.gitSummary);
// readme = readme.replace("[[docs]]",docs.gitDocs);
// // log(readme)

// // Write readme.md
// writeFile("./tests/test.md",readme);