// JSODOC = {
//     "method": "enableDebug1",
//     "info": "Enables debugging.",
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





// JSODOC = {
//     "class": "AFTCColor",
//     "info": "Color handing utility.",
//     "link": "https://aftc.io",
//     "methods": [
//         {
//             "name": "hexToRgb",
//             "params": [
//                 { "name": "hex", "type": "String", "required": true, "default": null }
//             ],
//             "returns": "Object {r,g,b}"
//         },
//         {
//             "name": "rgbToHex",
//             "params": [
//                 { "name": "r", "type": "number", "required": true, "default": null },
//                 { "name": "g", "type": "number", "required": true, "default": null },
//                 { "name": "b", "type": "number", "required": true, "default": null }
//             ],
//             "returns": "string"
//         }
//     ],
//     "example": [
//         "// AFTCColor",
//         "let color = new AFTCColor();"
//     ]
// } JSODOC





// JSODOC = {
//     "method": "enableDebug1",
//     "info": "Enables debugging.",
//     "link": "https://aftc.io",
//     "returns": {
//         "type": "object"
//     },
//     "example": [
//         "// Code comment test 1",
//         "/* Code comment test 2*/",
//         "enableDebug1();"
//     ]
// } JSODOC






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
