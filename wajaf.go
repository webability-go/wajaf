// Copyright Philippe Thomassigny 2004-2020.
// Use of this source code is governed by a MIT licence.
// license that can be found in the LICENSE file.

// Package wajaf is a go <=> javascript synchronized framework
//
package wajaf

import (
	"encoding/xml"
	"fmt"
)

// VERSION is the used version nombre of the XCore library.
const VERSION = "0.0.0"

// LOG is the flag to activate logging on the library.
// if LOG is set to TRUE, LOG indicates to the XCore libraries to log a trace of functions called, with most important parameters.
// LOG can be set to true or false dynamically to trace only parts of code on demand.
var LOG = false

type App struct {
	ID string `xml:"id,attr"`
	//	Entry string `xml:",chardata"`
	Containers []Container `xml:"container"`
	Elements   []Element   `xml:"element"`
	Events     []Event     `xml:"event"`
}

type Container struct {
	ID     string  `xml:"id,attr"`
	Type   string  `xml:"type,attr"`
	Zones  []Zone  `xml:"zone"`
	Events []Event `xml:"event"`
}

type Zone struct {
	ID         string      `xml:"id,attr"`
	Type       string      `xml:"type,attr"`
	Containers []Container `xml:"container"`
	Elements   []Element   `xml:"element"`
	Events     []Event     `xml:"event"`
}

type Element struct {
	ID   string `xml:"id,attr"`
	Type string `xml:"type,attr"`
}

type Event struct {
	Type string `xml:"type,attr"`
}

func NewFromXMLString(data string) *App {

	app := &App{}
	// Unmarshal
	xml.Unmarshal([]byte(data), app)

	fmt.Printf("%#v\n", app)

	return app
}

func (a *App) GetJSON() string {

	return "{\"status\":\"OK\"}"
}
