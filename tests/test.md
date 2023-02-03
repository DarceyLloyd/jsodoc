# <b>Project v1.0.4</b>


## <b>Available class's & Methods</b>

 - <b>enableDebug1({object},arrayParam)</b>
 - <b>AFTCColor()</b>
 - <b>enableDebug1()</b>
 - <b>AFTCColor()</b>
 - <b>drawBox(width,height)</b>
 - <b>getDeviceType()</b>

<hr><br><br>



# <b>Documentation</b>
## <b>enableDebug1({object},arrayParam))</b>
### <b>Information</b>
Enables debugging.

### <b>Link</b>
<a href='jsonData.link' target='_blank'>https://aftc.io</a>

### <b>Parameters</b>

- <b>Object:</b>

	- <b>Obj1Param1</b>
		- <b>Required:</b> true
		- <b>Default:</b> null
		- <b>Info:</b> Info...
	- <b>Obj1Param2</b>
		- <b>Required:</b> true
		- <b>Default:</b> null
		- <b>Info:</b> Info...
	- <b>Obj1Param3</b>
		- <b>Required:</b> true
		- <b>Default:</b> null
		- <b>Info:</b> Info...

- <b>arrayParam</b>
	- <b>Type:</b> array
	- <b>Required:</b> true
	- <b>Default:</b> null
	- <b>Info:</b> Info...

### <b>Returns</b>

- <b>Object</b>
	- <b>ObjParam1Name</b>
		- <b>Type: </b>String
		- <b>Info: </b>Info...
	- <b>ObjParam2Name</b>
		- <b>Type: </b>String
		- <b>Info: </b>Info...
	- <b>ObjParam3Name</b>
		- <b>Type: </b>String
		- <b>Info: </b>Info...
### <b>Methods</b>

- <b>updateConfig(Obj1Param1,Obj1Param2,Obj1Param3) : Boolean</b>
	- <b>Obj1Param1</b>
		- <b>Type: </b>String
		- <b>Rrequired: </b>true
		- <b>Default: </b>null
		- <b>Info: </b>Info...
	- <b>Obj1Param2</b>
		- <b>Type: </b>Boolean
		- <b>Rrequired: </b>true
		- <b>Default: </b>null
		- <b>Info: </b>Info...
	- <b>Obj1Param3</b>
		- <b>Type: </b>Number
		- <b>Rrequired: </b>true
		- <b>Default: </b>null
		- <b>Info: </b>Info...
- <b>start()</b>
- <b>stop()</b>
- <b>getMessage() : String</b>
### <b>Example</b>

```
// Code comment test 1
/* Code comment test 2*/
enableDebug1();
```


<hr><br><br>

## <b>AFTCColor())</b>
### <b>Information</b>
Color handing utility.

### <b>Link</b>
<a href='jsonData.link' target='_blank'>https://aftc.io</a>

### <b>Methods</b>

- <b>hexToRgb(hex) : Object {r,g,b}</b>
	- <b>hex</b>
		- <b>Type: </b>String
		- <b>Rrequired: </b>true
		- <b>Default: </b>null
- <b>rgbToHex(r,g,b) : String</b>
	- <b>r</b>
		- <b>Type: </b>Number
		- <b>Rrequired: </b>true
		- <b>Default: </b>null
	- <b>g</b>
		- <b>Type: </b>Number
		- <b>Rrequired: </b>true
		- <b>Default: </b>null
	- <b>b</b>
		- <b>Type: </b>Number
		- <b>Rrequired: </b>true
		- <b>Default: </b>null
### <b>Example</b>

```
// AFTCColor
let color = new AFTCColor();
```


<hr><br><br>

## <b>enableDebug1())</b>
### <b>Information</b>
Enables debugging.

### <b>Link</b>
<a href='jsonData.link' target='_blank'>https://aftc.io</a>

### <b>Returns</b>

- <b>Object</b>
### <b>Example</b>

```
// Code comment test 1
/* Code comment test 2*/
enableDebug1();
```


<hr><br><br>

## <b>AFTCColor())</b>
### <b>Information</b>
Color handing utility.

### <b>Link</b>
<a href='jsonData.link' target='_blank'>https://aftc.io</a>

### <b>Returns</b>

- <b>Type: </b>Array
- <b>Info: </b>Array of colors.

### <b>Example</b>

```
/* Use this comment style */
enableDebug1();
```


<hr><br><br>

## <b>drawBox(width,height))</b>
### <b>Information</b>
Draws a box.

### <b>Parameters</b>

- <b>width</b>
	- <b>Type:</b> number
	- <b>Required:</b> true
	- <b>Default:</b> null
	- <b>Info:</b> The width of your box in pixels

- <b>height</b>
	- <b>Type:</b> number
	- <b>Required:</b> true
	- <b>Default:</b> null
	- <b>Info:</b> The height of your box in pixels

### <b>Returns</b>

- <b>Type: </b>Element
- <b>Info: </b>Canvas with box drawn on it.

### <b>Methods</b>

- <b>clear()</b>
- <b>dispose()</b>
### <b>Example</b>

```
// Code comment test 1
/* Code comment test 2*/
let canvas = drawBox(100);
```


<hr><br><br>

## <b>getDeviceType())</b>
### <b>Information</b>
Returns the device type mobile || tablet || desktop

### <b>Parameters</b>

### <b>Returns</b>

- <b>Type: </b>String
### <b>Example</b>

```
let deviceType = getDeviceType()
```


<hr><br><br>

