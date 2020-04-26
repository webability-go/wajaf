//+build ignore

package main

import (
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

// Will read all .js files in ../js repository and add them to resources.go in this directory
func main() {
	wd, _ := os.Getwd()

	xpath := strings.Split(wd, "/")
	lpath := len(xpath)

	postdir := ""
	if xpath[lpath-1] == "resources" {
		postdir = "/../js"
	} else {
		postdir = "/js"
	}

	newpath := wd + postdir
	newpath = filepath.Clean(newpath)
	lnewpath := len(newpath)

	fmt.Println("New path:", newpath)

	dataresource := "package resources\n\nfunc init() {\n"

	filepath.Walk(newpath, func(path string, info os.FileInfo, err error) error {
		ext := filepath.Ext(path)
		if ext != ".js" {
			return nil
		}
		oficialpath := path[lnewpath+1:]
		data, err := ioutil.ReadFile(path)
		if err != nil {
			return err
		}
		sdata := fmt.Sprint(data)
		if len(sdata) <= 2 {
			return nil
		}
		xdata := strings.Split(sdata[1:len(sdata)-1], " ")
		dataresource += "  ResourcesContainer.Set(\"" + oficialpath + "\", []byte{" + strings.Join(xdata, ",") + "})\n"
		fmt.Println(oficialpath)
		return nil
	})

	dataresource += "}\n"

	ioutil.WriteFile("resources.go", []byte(dataresource), 0644)
}
