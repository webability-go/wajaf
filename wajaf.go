// Copyright Philippe Thomassigny 2004-2020.
// Use of this source code is governed by a MIT licence.
// license that can be found in the LICENSE file.

// Package wajaf is a go <=> javascript synchronized framework
//
package wajaf

// VERSION is the used version nombre of the XCore library.
const VERSION = "0.0.4"

// LOG is the flag to activate logging on the library.
// if LOG is set to TRUE, LOG indicates to the XCore libraries to log a trace of functions called, with most important parameters.
// LOG can be set to true or false dynamically to trace only parts of code on demand.
var LOG = false

type Application NodeDef

func NewApplication(id string) Application {

	app := NewNode("application", "")
	app.SetID(id)

	app.RegisterKnownAttributes([]string{"id", "enforce", "style"})
	app.RegisterKnownChildren([]string{"container", "element", "event"})

	return app
}

/*
func (a *Application) DecodeAttributes(s xml.StartElement) {
	for _, v := range s.Attr {
		if v.Name.Local == "id" {
			a.ID = v.Value
		}
	}
}

func (a *App) String() string {
	sdata := []string{"id:" + a.ID}
	for _, val := range a.Containers {
		sdata = append(sdata, "+"+fmt.Sprintf("%v", val))
	}
	for _, val := range a.Elements {
		sdata = append(sdata, "."+fmt.Sprintf("%v", val))
	}
	for _, val := range a.Events {
		sdata = append(sdata, "@"+fmt.Sprintf("%v", val))
	}
	return "APP{" + strings.Join(sdata, "\n") + "}"
}

// GoString will transform the XDataset into a readable string for humans
func (a *App) GoString() string {
	return a.String()
}

func (a *App) MarshalJSON() ([]byte, error) {

	return []byte("{\"status\":\"OK\"}"), nil
}
*/
