const { log, cls } = require("aftc-node-tools");
const { JSODoc } = require("./jsodoc");
const version = require("./package.json").version;

cls();

let subs = {
    "[[version]]":version,
    "[[author]]":"darcey.lloyd@gmail.com"
}

new JSODoc({
    files: ['./jsodoc.js'],
    // dir: './tests',
    // recursive: false,
    // ext: 'js',
    template: './docs/template.md',
    substitutions: subs,
    output: './tests/test.md',
    overrideGitSummaryTag: "[[git-summary]]",
    overrideGitDocsTag: "[[git-docs]]"
})