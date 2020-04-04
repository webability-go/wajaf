package wajaf

import (
	"fmt"
	"io/ioutil"
	"testing"
)

func readfile(name string, t *testing.T) string {
	str, err := ioutil.ReadFile(name)
	if err != nil {
		t.Errorf("Error loading XML File errors into string %s", err)
		return ""
	}
	return string(str)
}

func TestWajaf(t *testing.T) {

	data := readfile("testunit/app.code", t)

	w := NewAppFromXMLString(data)

	fmt.Printf("%#v\n", w)

}
