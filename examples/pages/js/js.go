package main

import (
	"errors"
	"io/ioutil"
	"os"
	"regexp"
	"strings"

	"github.com/webability-go/wajaf"
	"github.com/webability-go/xcore/v2"

	"github.com/webability-go/xamboo/cms/context"
)

func Run(ctx *context.Context, template *xcore.XTemplate, language *xcore.XLanguage, e interface{}) interface{} {

	// Va a buscar los datos de la página
	// JS: core mandatory load for every page
	path, _ := ctx.Sysparams.GetString("jspath")

	js := ""
	if len(ctx.MainURLparams) > 0 {
		js = ctx.MainURLparams[0]
	}
	if js == "" {
		js = ctx.Request.Form.Get("js")
	}
	if js == "wajaf.js" {
		js = "core.js,coreext.js,corebrowser.js,coretemplate.js,eventManager.js,ddManager.js,soundManager.js,animManager.js,helpManager.js,ajaxManager.js,ondemandManager.js,messageManager.js,wa4glManager.js"
	}

	jss := strings.Split(js, ",")

	reader := NewWJS(path)
	jsdata, _ := reader.MultiLoad(jss)

	return jsdata
}

// WJS is the object created to interact with javascript source files
type WJS struct {
	Dir string
}

// NewWJS will create a container to interact with javascript source files
func NewWJS(dir string) *WJS {
	return &WJS{Dir: dir}
}

func (js *WJS) MultiLoad(files []string) (string, error) {

	jsdata := ""
	for _, file := range files {
		data, _ := js.Load(file)
		jsdata += string(data)
	}
	return jsdata, nil
}

// Load will Load a language from an XML file and replace the content of the XLanguage structure with the new data
//   Returns nil if there is an error
func (js *WJS) Load(filename string) ([]byte, error) {

	match, _ := regexp.MatchString("[a-zA-Z0-9_-]+\\.js", filename)
	if !match {
		return nil, errors.New("wajaf: file name to Load is not a javasript filename")
	}

	// Directories
	dirs := []string{
		"system/",
		"managers/",
		"containers/",
		"elements/",
	}

	for _, d := range dirs {
		// precedence for local files to replace system file
		if fileExists(js.Dir + d + filename) {
			data, _ := ioutil.ReadFile(js.Dir + d + filename)
			return data, nil
		}
		data := wajaf.GetJSFile(filename)
		if data != nil {
			return data, nil
		}
	}
	return nil, errors.New("wajaf: javasript file not found")
}

func fileExists(path string) bool {
	_, err := os.Stat(path) // exists AND readable, no perms problems, etc
	if err == nil {
		return true
	}
	return false
}
