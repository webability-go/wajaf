@UTF-8

[![Go Report Card](https://goreportcard.com/badge/github.com/webability-go/wajaf)](https://goreportcard.com/report/github.com/webability-go/wajaf)
[![GoDoc](https://godoc.org/github.com/webability-go/wajaf?status.png)](https://godoc.org/github.com/webability-go/wajaf)
[![GolangCI](https://golangci.com/badges/github.com/webability-go/wajaf.svg)](https://golangci.com)

WAJAF for GO v1
=============================

WAJAF is the WebAbility Javascript Application Framework. It is a synchronized GO-Server <=> JS-Client framework to developp organized web applications.

Manuals are available on godoc.org [![GoDoc](https://godoc.org/github.com/webability-go/wajaf?status.png)](https://godoc.org/github.com/webability-go/wajaf)


TO DO:
======
- Adds local specific functions to all the Containers, Elements, Zones, etc to improve tree programmation.
- Tests

Version Changes Control
=======================

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
