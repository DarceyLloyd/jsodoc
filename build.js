const { log, cls } = require("aftc-node-tools");
const { JSODoc } = require("./jsodoc");
const version = require("./package.json").version;

cls();

let subs = {
    "[[version]]":version
}

new JSODoc({
    files: ['./jsodoc.js'],
    // dir: './tests',
    // recursive: false,
    // ext: 'js',
    template: './docs/template.md',
    substitutions: subs,
    output: './readme.md',
    overrideGitSummaryTag: "[[git-summary]]",
    overrideGitDocsTag: "[[git-docs]]"
})