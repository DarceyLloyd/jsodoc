const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




function getJSOCommentsFromString(input) {

    let lines = input.split("\n");
    let JSODocOpen = false;
    let comments = [];

    // process lines array
    let comment = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // clean array entries (we wont be re-assembling the file anyway)
        line = line.replace(/(\r\n|\n|\t|\r)/gm, "").trim(); // remove \t \n \r
        // log(line.length + "    " + line);

        // Only check lines that are > 10 and < 15 chars long for JSON Open and Close tags
        // Open: JSODOC {
        // Close: } JSODOC

        if (!JSODocOpen) {
            // Look for JSODOC start
            if (line.length > 10 && line.length < 15) {
                let foundOepener = line.toLowerCase().indexOf("jsodoc = {");
                if (foundOepener != -1) {
                    // log(line);
                    JSODocOpen = true;
                    // line = line.replace("jsodoc = {", "{");
                    comment.push( cleanAndAddComment("{") );
                }
            }

        } else {
            // Look for JSODOC end or add comment
            let foundCloser = line.toLowerCase().indexOf("} jsodoc");
            if (foundCloser != -1) {
                // log(line);
                JSODocOpen = false;
                // line = line.replace("} jsodoc", "}");
                comment.push( cleanAndAddComment("}") );
                comments.push(comment.join(""));
                comment = [];
            } else {
                comment.push( cleanAndAddComment(line) );
            }

        }


    }


    return comments;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




let cleanAndAddComment = function (rawComment) {
    let cleanComment = rawComment.replace(/\/\//g, "").trim(); // remove all //
    // cleanComment = rawComment.replace(/\\/g, "/"); // replaces all \\ to / (g flag)
    cleanComment = cleanComment.replace(/(\t)/gm, "").trim(); // remove all \t
    // comment.push(cleanComment);
    // log(cleanComment);
    return cleanComment;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -






module.exports = {
    getJSOCommentsFromString
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -