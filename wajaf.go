// Copyright Philippe Thomassigny 2004-2020.
// Use of this source code is governed by a MIT licence.
// license that can be found in the LICENSE file.

// Package wajaf is a go <=> javascript synchronized framework
//
package wajaf

import (
	"encoding/xml"
)

// VERSION is the used version nombre of the XCore library.
const VERSION = "0.0.2"

// LOG is the flag to activate logging on the library.
// if LOG is set to TRUE, LOG indicates to the XCore libraries to log a trace of functions called, with most important parameters.
// LOG can be set to true or false dynamically to trace only parts of code on demand.
var LOG = false

type engine struct {
	Containers map[string]string
	Elements   map[string]string
}

var Engine = engine{}

func init() {

	// Register all known containers and elements into engine

}

func NewAppFromXMLString(data string) *App {

	app := &App{}
	xml.Unmarshal([]byte(data), app)
	return app
}
