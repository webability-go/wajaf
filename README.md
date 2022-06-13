
[![Go Report Card](https://goreportcard.com/badge/github.com/webability-go/wajaf)](https://goreportcard.com/report/github.com/webability-go/wajaf)
[![GoDoc](https://godoc.org/github.com/webability-go/wajaf?status.png)](https://godoc.org/github.com/webability-go/wajaf)
[![GolangCI](https://golangci.com/badges/github.com/webability-go/wajaf.svg)](https://golangci.com)

WAJAF for GO v0.1
=============================

WAJAF is the WebAbility Javascript Application Framework. It is a synchronized GO-Server <=> JS-Client framework to develop organized web applications.

GO manuals are available on godoc.org [![GoDoc](https://godoc.org/github.com/webability-go/wajaf?status.png)](https://godoc.org/github.com/webability-go/wajaf)

JAVASCRIPT manual:
=============================

The examples and tests show the working functions and the manual of them.

[![Go to Examples]](https://devwajaf.webability.info)

1. The main core.

The main core contains:

- 2 attributes:

Examples & manuals: [![Go to attributes examples]](https://devwajaf.webability.info/examples/core.attributes.html)


- zIndex method, used to set an unused zIndex to a node,

Examples & manuals: [![Go to core examples]](https://devwajaf.webability.info/examples/core.zindex.html)


- Verification methods is*, used to know the type of JS objects. All the functions return true/false. True means the variable match the specified type by the is* method.
-- isDefined: returns true if the variable is not undefined.
-- isEmpty: returns true if the variable is empty: empty means undefined, null, empty array or empty string.
-- isBool: returns true if the variable is a boolean.
-- isNumber: returns true if the variable is number, integer or float.
-- isString: returns true if the variable is a string or a String object.
-- isArray: returns true if the variable is an array.
-- isObject: returns true if the variable is an object. It includes String(), Date(), {}. etc. Note than Javasript consider null as an object too.
-- isFunction: returns true if the variable is a function.
-- isDate: return true if the variable is a Date object.
-- isDOM: return true if the variable is a DOM node object.

Examples & manuals: [![Go to examples]](https://devwajaf.webability.info/examples/core.is.html)


- Objects and nodes methods.

For objects:
- WA.extend: Will extends an object from another (inheritance).
- WA.clone: Will clone an object and all its children.
-- If you dont care the type of object but only its attributes, you can use WA.clone(object, true)
-- If you use the normal method WA.clone(object), it will close the whole object with attributes and methods.
- WA.sizeof: Will calculates the size (number of attributes) of an object.

For DOM nodes:
- WA.createDomNode: Will create a DOM Node of specified type, and apply classname if defined.
- WA.getDomNode: Will get the DOM node of the specified Id.
- WA.toDOM: Will get the DOM node from a string ID or a node itself.

Examples & manuals: [![Go to examples]](https://devwajaf.webability.info/examples/core.other.html)


- Node get() functions.

The get function lets you find a node or a set of nodes by rules, then apply some changes on the node.

The get() method works as followed:

1. The code will search all the nodes corresponding to the filter you give it.

There are 3 posibilities:

a - No nodes were found. The subsequent operations will do nothing.
b - There was only one node found. The subsequent operations will work directly on this node.
c - There was more than 1 node found (from 2 to the whole DOM). The subsequent operations will work for each one of the found nodes.

2. The operation is applied to all the node(s).

3. The operations can be chained.


The parameter of get() method is a string used to search the nodes:

"#id": If you want to find a single node by its unique id, using the CSS syntax.
".class": If you want to find a list of nodes by their class, using the CSS syntax.
"!name": If you want to find a list of nodes by their name (in a form).
"tag": If you want to find a list of nodes by their tag type (example: 'div', 'a').

Examples & manuals: [![Go to examples]](https://devwajaf.webability.info/examples/core.get.html)


2. The browser core:








TO DO:
======
- Adds local specific functions to all the Containers, Elements, Zones, etc to improve tree programmation.
- Tests

Version Changes Control
=======================

v0.1.3 - 2022-06-12
------------------------
- Added CodeNode.go to create a node of code.
- Added colorfieldelement.go to create a field to pick a color.
- Added config/wajaf.conf in examples to run the examples on a xamboo server if needed.
- The css for prettify is now absolute in the html code.
- Some correction in the example code.
- The go libraries now includes the new structures compatible with Xamboo 1.6
- The jsfile.go added to manage all the JS files on an embed filesystem.
- The js.go library now uses the GetJSFile into the wajaf library.
- go.mod modified to go 1.17 for embed filesystem needed.
- Some errors corrected into groupContainer.js and tabContainer.js to work better.
- The buttonElement now as a listener to send data to the server when clicked.
- lovFieldElement is now working correctly.
- textFieldElement now knows integer, float, text, masked types of fields, and correctly convert values to send to server.
- ajaxManager can now handle ajax promises.
- canvasManager create for test purpose.
- wa4glmanager modified to work on promises, capture errors and needed login requests.
- options.go added to manager lovfield list of options.
- resources directory removed, replaced by embed filesystem


v0.1.2 - 2021-10-04
------------------------
- Correction of isEmpty function of the core, to give true is the Date is empty or the String() is empty.
- The simple javascript examples are now working on a Xamboo Go Server (Presentation, js.go corrected, all libraries working)


v0.1.1 - 2021-02-26
------------------------
- gridContainer.js has been modified to support large list of daat and put correct information metada data.
- node.go enhanced to detect wrong XML formats and return an error
- Added xml.Comment into node XML unmarshall to consider it


v0.1.0 - 2020-12-22
------------------------
- First build on GO, with all the necesary code to devel, test, publish and show live examples.
- Adds titleview parameter to buttonelement.js (missing)
- Separates coreext.js and coretemplate.js from core.js


v0.0.15 - 2020-04-26
------------------------
- JS code is now embedded into GO code in resources directory. embed.go is added to generate embedded code, but is not compilable with the libraries.

v0.0.14 - 2020-04-13
------------------------
- Correction on node: HELP as messages, not help children

v0.0.13 - 2020-04-13
------------------------
- Correction on node: JSON Marshal, wrong ',' calculations (again)

v0.0.12 - 2020-04-13
------------------------
- Correction on node: JSON Marshal, wrong ',' calculations

v0.0.11 - 2020-04-13
------------------------
- Added parameters to creation of containers, zones, dataset and elements

v0.0.10 - 2020-04-08
------------------------
- Added know child "code" to event

v0.0.9 - 2020-04-08
------------------------
- Correction of event node so code is into code node.

v0.0.8 - 2020-04-08
------------------------
- Correction of all the Types of containers and elements to put correct js library name (nameContainer and nameElement syntax)

v0.0.7 - 2020-04-08
------------------------
- Added MarshalXML on Node to build XML code from nodes

v0.0.6 - 2020-04-08
------------------------
- Correction on assigning the node data (concatened, only if some info into it: will ignore spaces and line formatting characters)

v0.0.5 - 2020-04-07
-----------------------
- Added UnmarshalXML
- Added MarshalJSON
- Added basic functions AddMessage, AddHelp, AddEvent to a Node, with auto creation of children nodes
- Removed messages, events, help attributes of Node
- Added AddZone() to SeparatorContainer as a new struct extended from DomDef interface to build upon specific functions for specific nodes (it works)

v0.0.4 - 2020-04-06
-----------------------
- All structures and Application tree implemented in GO
- Full wajaf JS available in js directory
