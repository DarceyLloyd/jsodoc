// JSODOC = {
//     "method": "testFunction1",
//     "params": [
//         {
//             "label": "a",
//             "type": "Number",
//             "required": true,
//             "info": "A number you want to add to b.",
//         },
//         {
//             "label": "b",
//             "type": "Number",
//             "required": true,
//             "info": "A number you want add to a.",
//         }
//     ],
//     "returns": [
//     ],
//     "info": "A test function that adds two variables of type number together.",
//     "example": [
//         "line",
//         "by line"
//     ]
// } JSODOC

const testFunction1 = function (a, b) {
    return a + b;
}