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

v0.0.7 - 2020-03-08
------------------------
- Added MarshalXML on Node to build XML code from nodes

v0.0.6 - 2020-03-08
------------------------
- Correction on assigning the node data (concatened, only if some info into it: will ignore spaces and line formatting characters)

v0.0.5 - 2020-03-07
-----------------------
- Added UnmarshalXML
- Added MarshalJSON
- Added basic functions AddMessage, AddHelp, AddEvent to a Node, with auto creation of children nodes
- Removed messages, events, help attributes of Node
- Added AddZone() to SeparatorContainer as a new struct extended from DomDef interface to build upon specific functions for specific nodes (it works)

v0.0.4 - 2020-03-06
-----------------------
- All structures and Application tree implemented in GO
- Full wajaf JS available in js directory
