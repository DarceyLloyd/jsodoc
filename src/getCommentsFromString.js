const aftc = require("aftc-node-tools");
const cls = aftc.cls;
const log = aftc.log;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




function getCommentsFromString(input) {

    let lines = input.split("\n");
    // log(lines);
    let JSODocOpen = false;
    let jsonComments = [];

    // process lines array
    let comment = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // clean array entries (we wont be re-assembling the file anyway)
        line = line.replace(/(\r\n|\n|\t|\r)/gm, "").trim(); // remove \t \n \r
        // log(line.length + "    " + line);

        // Only check lines that are > 5 and < 20 chars long for Open and Close markers
        // Open: JSODOC {
        // Close: } JSODOC

        if (!JSODocOpen) {
            // Look for JSODOC start
            if (line.length > 5 && line.length < 20) {
                let foundOepener = line.toLowerCase().indexOf("jsodoc = {")
                if (foundOepener != -1) {
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
                let fullCommentString = comment.join("");
                let jsonComment = "";
                try {
                    jsonComment = JSON.parse(fullCommentString)
                    jsonComments.push(jsonComment);
                } catch (e){
                    log("")
                    log("JSODOC - ERROR - UNABLE TO PARSE THE FOLLOWING TO JSON:".red)
                    log(fullCommentString.red)
                    log("")
                    // console.log(e)
                    // console.log("------------------")
                }
                comment = []; // reset comment for next JSODoc comment
            } else {
                comment.push( cleanAndAddComment(line) );
            }

        }


    }


    return jsonComments;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




let cleanAndAddComment = function (rawComment) {
    let cleanComment = rawComment
    // cleanComment = rawComment.replace(/\\/g, "/"); // replaces all \\ to / (g flag)

    // Note this works well but as it removes all not just first // it stops any code comments or links being used
    // cleanComment = rawComment.replace(/\/\//g, "").trim(); // remove all //
    cleanComment = rawComment.replace(/\/\//, "").trim(); // remove first //
    // cleanComment = cleanComment.replace("\\"+"#")

    cleanComment = cleanComment.replace(/(\t)/gm, "").trim(); // remove all \t
    // comment.push(cleanComment);
    // log(cleanComment);
    return cleanComment;
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -






module.exports = {
    getCommentsFromString
}
// - - - - - - - - - - - - - - - - - - - - - - - - - -