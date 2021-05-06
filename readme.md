# <b>JSODOC v1.0.1</b>
### <b>JavaScript Object (JSON) based Documentation Generation</b>
<br>

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Darcey%2eLloyd%40gmail%2ecom&lc=GB&item_name=Darcey%20Lloyd%20Developer%20Donation&currency_code=GBP&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)
<hr><br><br>


### <b>Coming Soon 1: Dynamically Generate Documentation Website</b>
This is on the agenda, but for now JSODoc is currently only handling github documentation generation. Want it sooner? Donate.
<hr><br><br>


### <b>What can it do? (It generated this readme.md)</b>
JSODoc currently generates documentation in github markup. You can also get the documentation in JSON format so you can do anything you want with it. It can process any file type which supports // as code comments.

It supports class's, methods, inputs & return definitions
<hr><br><br>




## <b>Quick Summary</b>
### <b>Installs</b>
```
npm i -D JSODOC
```

### <b>Create file: ./docs/template.js</b>
```
# <b>Project v[[version]]</b>

## <b>Available class's & Methods</b>
[[jsodoc-git-summary]]

# <b>Documentation</b>
[[jsodoc-git-docs]]
```

### <b>Create file: build.js</b>
```
const { JSODoc } = require("jsodoc");
const version = require("./package.json").version;

console.clear()

let subs = {
    "[[version]]":version,
    "darcey.lloyd@gmail.com":"darcey.lloyd@gmail.com"
}

new JSODoc({
    dir: './src',
    recursive: true,
    ext: 'js',
    template: './docs/template.md',
    substitutions: subs,
    output: './tests/test.md'
})
```

### <b>Run build script</b>
```
node build
```

Remember to add to your comments to your src files in the JSODOC way or it wont generate anything (examples of this are below).

<hr><br><br><br>







## <b>How do I add JSODOC comments to my files?</b>

### <b>Tiny example 1:</b>
```
// JSODOC = {
//     "method": "enableLogging"
// } JSODOC
```

### <b>Tiny example 2:</b>
```
// JSODOC = {
//     "class": "Vector3",
//     "info": "Deals with vectors baby!"
// } JSODOC
```

### <b>Medium example 1:</b>
```
// JSODOC = {
//     "class": "AFTCColor",
//     "info": "Color handing utility.",
//     "link": "https://aftc.io",
//     "returns":
//     {
//         "type": "array",
//         "info": "Array of colors."
//     },
//     "example": [
//         "/* Use this comment style */",
//         "enableDebug1();"
//     ]
// } JSODOC
```

### <b>Full example 1:</b>
```
// JSODOC = {
//     "class": "BlowUpTheMoon",
//     "info": "Nukes the moon.",
//     "link": "https://aftc.io",
//     "params": [
//         {
//             "type": "object",
//             "def": [
//                 { "name": "Obj1Param1", "required": true, "default": null, "info": "Info..." },
//                 { "name": "Obj1Param2", "required": true, "default": null, "info": "Info..." },
//                 { "name": "Obj1Param3", "required": true, "default": null, "info": "Info..." }
//             ]
//         },
//         {
//             "name": "arrayParam",
//             "type": "array",
//             "required": true,
//             "default": null,
//             "info": "Info..."
//         }
//     ],
//     "methods": [
//         {
//             "name": "updateConfig",
//             "params": [
//                 { "name": "Obj1Param1", "type": "String", "required": true, "default": null, "info": "Info..." },
//                 { "name": "Obj1Param2", "type": "Boolean", "required": true, "default": null, "info": "Info..." },
//                 { "name": "Obj1Param3", "type": "Number", "required": true, "default": null, "info": "Info..." }
//             ],
//             "returns": "Boolean"
//         },
//         {
//             "name": "start"
//         },
//         {
//             "name": "stop"
//         },
//         {
//             "name": "getMessage",
//             "returns": "string"
//         }
//     ],
//     "returns": {
//         "type": "object",
//         "def": [
//             { "name": "ObjParam1Name", "type": "string", "info": "Info..." },
//             { "name": "ObjParam2Name", "type": "string", "info": "Info..." },
//             { "name": "ObjParam3Name", "type": "string", "info": "Info..." }
//         ]
//     },
//     "example": [
//         "// Code comment test 1",
//         "/* Code comment test 2*/",
//         "enableDebug1();"
//     ]
// } JSODOC
```


### <b>Full example 2 (simple params, methods and returns (non object returns)):</b>
```
// JSODOC = {
//     "method": "drawBox",
//     "info": "Draws a box.",
//     "params": [
//         {
//             "name": "width",
//             "type": "number",
//             "required": true,
//             "default": null,
//             "info": "The width of your box in pixels"
//         },
//         {
//             "name": "height",
//             "type": "number",
//             "required": true,
//             "default": null,
//             "info": "The height of your box in pixels"
//         }
//     ],
//     "methods": [
//         {
//             "name": "clear"
//         },
//         {
//             "name": "dispose"
//         }
//     ],
//     "returns":
//     {
//         "type": "Element",
//         "info": "Canvas with box drawn on it."
//     },
//     "example": [
//         "// Code comment test 1",
//         "/* Code comment test 2*/",
//         "let canvas = drawBox(100);"
//     ]
// } JSODOC
```
<hr><br><br>



## <b>You use what you want, JSODoc will generate what it is given...</b>

<hr><br><br>




## <b>Tips</b>
- <b>Tip 1 - Want to get started quickly?</b><br>
Pick one of the above examples, copy it and paste it above your method or class in any language source file js, php etc that supports // code comments and edit away.

- <b>Tip 2 - Easy editing and editor validation and support</b><br>
Select/highlight your JSODOC comment block and uncomment the whole block, VSCode and others editors will highlight syntax errors (ignore ending "} JSODOC" line as that will cause an error). Then when your done editing select the comment block again and comment it out again. You must use // not /* */ or /** * **/ commenting types

- <b>Tip 3 - Errors and Invalid JSON syntax</b><br>
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
JSODOC Can work in 3 modes:
- String
- Files
- Directory

### <b>String mode</b>
This allows you to feed JSODoc a string and parse that string for JSODOC comments.

```
let str = `// JSODOC = {
//     "method": "enableDebug",
//     "info": "Enables debugging.",
//     "example": [
//         "enableDebug();"
//     ]
// } JSODOC`;

new JSODoc({
    comments: str,
    output: './test.md'
})
```

### <b>Files mode</b>
This allows you to feed JSODoc an array of file paths and JSDOC will read those files and parse for JSDOC comments.

```
new JSODoc({
    files: ['./src/file1.js'],
    template: './docs/template.md',
    substitutions: subs,
    output: './readme.md'
})
```

### <b>Directory mode</b>
This allows you to feed JSODoc a path, a file extension or "*" for all files and to whether or not to recursively search through all folders in the specified directory. It will then parse each file for JSDOC comments.

```
new JSODoc({
    dir: './src',
    recursive: true,
    ext: 'js',
    template: './docs/template.md',
    substitutions: subs,
    output: './tests/test.md'
})
```

<hr><br><br>



## <b>Generating a readme.md and using a template file</b>
You can supply JSODOC with a template.md file which can be used as a template and JSODOC will substitute it's documentation into specific markers within that template.md file.

Template example
```
# <b>Project v[[version]]</b>

## <b>Available class's & Methods</b>
[[jsodoc-git-summary]]

# <b>Documentation</b>
[[jsodoc-git-docs]]
```

JSODOC will substitute the class & method summary into [[jsodoc-git-summary]]
JSODOC will substitute the main documentation into [[jsodoc-git-docs]]

You will notice that [[version]] is in the template, this is for user substitutions, all you have to do is supply an object key value pair with your own substitutions.
<hr><br><br>



## <b>User substitutions</b>
You just supply an object with your own key value pairs to substitute. You must supply a template file for this to work, if no template file is supplied JSODOC will simply generate the file automatically with a class & method summary and the docs it generated.

```
// This will substituate the marker [[version]] with 1.4.2 in ./docs/template.md
let mySubs = {
    "[[version]]": "1.4.2"
}

new JSODoc({
    dir: './src',
    recursive: true,
    ext: 'js',
    template: './docs/template.md',
    substitutions: mySubs,
    output: './tests/test.md'
})
```
<hr><br><br>



## <b>Setting up your build script and how to build your docs</b>
- Create folder docs

- Create file in there called template.md and set it up to look something like
```
# <b>Project v[[version]]</b>

## <b>Available class's & Methods</b>
[[jsodoc-git-summary]]

# <b>Documentation</b>
[[jsodoc-git-docs]]
```

-  Setup you user Substitutions
```
// get version from package.json
const version = require("./package.json").version;

// Setup my subs
let mySubs = {
    "[[version]]",version
}
```

- Start JSODOC to process your src directory
```
new JSODoc({
    dir: './src',
    recursive: true,
    ext: 'js',
    template: './docs/template.md',
    substitutions: mySubs,
    output: './tests/test.md'
})
```

- And finally run your build script from terminal/cmd/cli using node
```
node build
```
<hr><br><br>









<hr><br><br><br><br>



# <b>JSODOC - Generated documentation</b>

## <b>Available Methods & Class's:</b>


 - <b>JSODoc({object})</b>

<hr><br><br>



## <b>JSODoc({object}))</b>
### <b>Information</b>
Comment generation from JSON comments.

### <b>Parameters</b>

- <b>Object:</b>

	- <b>files</b>
		- <b>Required:</b> false
		- <b>Default:</b> false
		- <b>Info:</b> For using JSODoc in files mode
	- <b>dir</b>
		- <b>Required:</b> false
		- <b>Default:</b> false
		- <b>Info:</b> For using JSODoc in directory mode
	- <b>recursive</b>
		- <b>Required:</b> false
		- <b>Default:</b> false
		- <b>Info:</b> Directory mode recursive scan on or off
	- <b>ext</b>
		- <b>Required:</b> false
		- <b>Default:</b> null
		- <b>Info:</b> Directory mode extensions of files to use
	- <b>template</b>
		- <b>Required:</b> false
		- <b>Default:</b> false
		- <b>Info:</b> If you want JSODOC to use a template and sustitute into it
	- <b>substitutions</b>
		- <b>Required:</b> false
		- <b>Default:</b> false
		- <b>Info:</b> User substitutions object (key value pairs)
	- <b>output</b>
		- <b>Required:</b> false
		- <b>Default:</b> ./readme.md
		- <b>Info:</b> The full path to the .md file to create/write to

### <b>Example</b>

```
// npm i -D aftc-node-tools
// npm i -D jsodoc

const { log, cls } = require('aftc-node-tools');
const { JSODoc } = require('./jsodoc');
const version = require('./package.json').version;

cls();
log('Building script starting!'.green)

let subs = {
    '[[version]]':version,
    '[[author]]':'darcey.lloyd@gmail.com'
}

new JSODoc({
    dir: './src',
    recursive: true,
    ext: 'js',
    template: './docs/template.md',
    substitutions: mySubs,
    output: './tests/test.md'
})

log('Building script completed!'.green)
```


<hr><br><br>

