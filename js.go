package wajaf

import (
	"io/ioutil"
	"os"
)

// WJS is the object created to interact with javascript source files
type WJS struct {
	Dir string
}

// NewWJS will create a container to interact with javascript source files
func NewWJS(dir string) *WJS {
	return &WJS{Dir: dir}
}

// Load will Load a language from an XML file and replace the content of the XLanguage structure with the new data
//   Returns nil if there is an error
func (js *WJS) Load(name string) ([]byte, error) {

	// put protection and known files

	jsFile, err := os.Open(js.Dir + name)
	if err != nil {
		return nil, err
	}
	data, err := ioutil.ReadAll(jsFile)
	if err != nil {
		return nil, err
	}
	err = jsFile.Close()
	if err != nil {
		return nil, err
	}
	return data, nil
}
