# <b>JSODOC v[[version]]</b>
### <b>JavaScript Object (JSON) based Documentation Generation</b>
<br>

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Darcey%2eLloyd%40gmail%2ecom&lc=GB&item_name=Darcey%20Lloyd%20Developer%20Donation&currency_code=GBP&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
<hr><br><br>

### <b>Coming Soon 1: Dynamically Generate Documentation Website</b>
This is on the agenda, but for now JSODoc is currently only handling github documentation generation.
<hr><br><br>

### <b>Coming Soon 2: Class documentation processing</b>
Parsing of methods/functions only at the moment, class parsing will be added soon. Want it sooner? Donate.
<hr><br><br>

### <b>Is it usable now?</b>
<b>YES</b> - Your reading docs generated from it now.
<hr><br><br>


### <b>What can it do? (It generated this readme.md)</b>
JSODoc currently generates documentation in github markup. You can also get the documentation in JSON format so you can do anything you want with it. Below are examples of dynamically generating github readme documentation parsing all your source files for JSON Formatted Comments.
<hr><br><br>

## <b>How do I add JSODOC comments to my files?</b>

Method example (Full):
```
// JSODOC = {
//     "method": "addTwoNumbers",
//     "params": [
//         {
//             "name": "a",
//             "type": "Number",
//             "required": true,
//             "info": "A number you want to add to b."
//         },
//         {
//             "name": "b",
//             "type": "Number",
//             "required": true,
//             "info": "A number you want add to a."
//         }
//     ],
//     "returns": "Number",
//     "info": "A function that adds two numbers together.",
//     "example": [
//         "let a = 1;",
//         "let b = 4;",
//         "let answer = addTwoNumbers(a,b);",
//         "/* Answer is 5 /*"
//     ]
// } JSODOC
```

Method example (Medium):
```
// JSODOC = {
//     "method": "logMessage",
//     "params": [
//         {
//             "name": "message",
//             "type": "String",
//             "required": true,
//             "info": "The message you want to console.log"
//         }
//     ],
//     "info": "A function that logs the argument you pass it.",
//     "example": [
//         "logMessage('hello world');",
//     ]
// } JSODOC
```

Method example (Minimal):
```
// JSODOC = {
//     "method": "enableLogging",
//     "info": "Enables logging, want to turn logging off? See disableLogging."
// } JSODOC
```

Method example (Tiny):
```
// JSODOC = {
//     "method": "enableLogging"
// } JSODOC
```

## <b>You use what you want, JSODoc will generate what is given...</b>

<hr><br><br>




## <b>Tips</b>
- <b>Tip 1 - Easy editing and editor validation and support</b><br>
You can edit enter the comments as a json object and then highlight the whole block and press your editors comment shortcut to comment out the whole block (you also get error flags in decent editors and json validation this way)

- <b>Tip 2 - Errors and Invalid JSON syntax</b><br>
Typically a "," is in the wrong place, at the end of one of your end entries, JSON does't parse it, so JSODOC won't either.<br><br>
I find it best to select the whole comment block, use your editors comment/uncomment shortcut and check for validation errors. Make sure you got no trailing , where they shouldn't be eg:
```
Incorrect: {"hello",}   Correct: {"hello"}
Incorrect: ["a","b",]   Correct: ["a","b",]
Incorrect: [1,2,]       Correct: [1,2]
```

```
Incorrect: 
{
    "color": "#FFCC00"},
}

Correct: 
{
    "color": "#FFCC00"}
{
```

```
Incorrect: 
[
    { "color": "#FFCC00"},
    { "color": "#FFCC00"},
]

Correct: 
[
    { "color": "#FFCC00"},
    { "color": "#FFCC00"}
]
```

If your having trouble entering the comments or have build errors, then your json syntax is probably incorrect.
<br><br>
Simply uncomment the JSODOC block in VSCode or your editor of choice, ignore the errors on the first and last lines, VSCode and other IDE's will still validate the JSON inbetween. Careful about trailing commas "," json doesn't parse them, so JSODOC can't either. 
<hr><br><br>





## <b>Generating documentation from your source files</b>
Supply JSODOC with an array of files to generate documentation from.

- Create folder "docs"



- Create file called "readme-template.md" in the docs folder



- Setup your readme-template.md with to look like
```
# <b>MyProject v[version]</b>
## <b>My Project Sub Title</b>
<hr><br><br>


## <b>Available Methods & Class's:</b>

[summary]

<hr><br><br>

## <b>Documentation</b>

[docs]
```



- Install a utility helper to scan directories and to read & write files 
```
npm i -D aftc-node-tools
```



- Setup your build script<br>
Create a file in your project root called build.js with the following code
```
const { log, cls, getFilesSync, readFileToString, writeFile } = require("aftc-node-tools");
const { jsoGetDocs } = require("jsodoc");
const version = require("./package.json").version;


cls(); // Clears the console log
log("Starting build process...".green);



// Get all .js files in the src directory and its sub directories
let files = getFilesSync("./src", ".js", true);

// Or you can set the file array up manually 
// let files = ["./myfile1.js","./myfile2.js"];

// Or you can feed it a string not an array of file paths



// Generate the docs returns an object {gitSummary,gitDocs,comments}
let docs = jsoGetDocs(files);

// Read your template readme file to a string
let template = readFileToString("./docs/readme-template.md");

// Create new readme
let readme = template.replace("[version]",version);
readme = readme.replace("[summary]",docs.gitSummary);
readme = readme.replace("[docs]",docs.gitDocs);

// Write new readme.md file
writeFile("./readme.md",readme);
```


- And finally build your readme by running
```
node build
```





<hr><br><br><br><br>




## <b>Available Methods & Class's:</b>

[[summary]]

<hr><br><br>

[[docs]]