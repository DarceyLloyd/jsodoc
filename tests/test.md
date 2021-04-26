# <b>TEST-README.md v0.9.0</b>

## <b>Summary</b>

 - jsoGetDocs(filePathsArrayOrString)
 - testOldReturns(a,b)
 - test1(a,b)
 - test2(a,b)
 - test3(a,b)
 - test4()
 - test5()
 - test6()
 - test7(a,b)


<hr><br><br>

# <b>Documentation</b>

## <b>jsoGetDocs(filePathsArrayOrString)</b>
<b>Information:</b><br>
Generates documentation from JavaScript Object based code comments (JSON) .<br>
#### <b>Parameters:</b>
- <b>Name:</b> filePathsArrayOrString<br>
<b>Type: </b>Array||String<br>
<b>Required: </b>true<br>
<b>Info: </b>Either an array of file paths or a string which contains the documentation to process.<br>

<b>Returns:</b> Object 

- <b>Name: </b>gitSummary<br>
<b>Type: </b>String<br>

- <b>Name: </b>gitDocs<br>
<b>Type: </b>String<br>

- <b>Name: </b>comments<br>
<b>Type: </b>Array<br>

```
/* Generate docs from an array of files */
let docs = jsoGetDocs(srcFilesArray)

or

/* Generate docs from a string which contains the JavaScript Object based code comments (JSON) */
let docs = jsoGetDocs(sourceString)
```


<hr><br><br>

## <b>testOldReturns(a,b)</b>
<b>Information:</b><br>
Test for old returns 3<br>
#### <b>Parameters:</b>
- <b>Name:</b> a<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want to add to b.<br>

- <b>Name:</b> b<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want add to a.<br>

<b>Returns:</b>
String<br>
```
/* Comment */
let a = 1;
let b = 2;
```


<hr><br><br>

## <b>test1(a,b)</b>
<b>Information:</b><br>
A test function that adds two variables of type number together.<br>
#### <b>Parameters:</b>
- <b>Name:</b> a<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want to add to b.<br>

- <b>Name:</b> b<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want add to a.<br>

<b>Returns:</b> Object 

- <b>Name: </b>x<br>
<b>Type: </b>Number<br>

- <b>Name: </b>y<br>
<b>Type: </b>Number<br>

```
let a = 1;
let b = 2;
```


<hr><br><br>

## <b>test2(a,b)</b>
<b>Information:</b><br>
Test 2<br>
#### <b>Parameters:</b>
- <b>Name:</b> a<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want to add to b.<br>

- <b>Name:</b> b<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want add to a.<br>

```
/* Comment */
let a = 1;
let b = 2;
```


<hr><br><br>

## <b>test3(a,b)</b>
<b>Information:</b><br>
Test 3<br>
#### <b>Parameters:</b>
- <b>Name:</b> a<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want to add to b.<br>

- <b>Name:</b> b<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want add to a.<br>

```
/* Comment */
let a = 1;
let b = 2;
```


<hr><br><br>

## <b>test4()</b>
<b>Information:</b><br>
Test 4<br>
```
/* Comment */
test4();
```


<hr><br><br>

## <b>test5()</b>
<b>Information:</b><br>
Test 5<br>


<hr><br><br>

## <b>test6()</b>


<hr><br><br>

## <b>test7(a,b)</b>
<b>Information:</b><br>
A test function that adds two variables of type number together.<br>
#### <b>Parameters:</b>
- <b>Name:</b> a<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want to add to b.<br>

- <b>Name:</b> b<br>
<b>Type: </b>Number<br>
<b>Required: </b>true<br>
<b>Info: </b>A number you want add to a.<br>

<b>Returns:</b>
Object<br>
```
let a = 1;
let b = 2;
```


<hr><br><br>

