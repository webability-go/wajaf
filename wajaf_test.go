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

	app := NewApplication("manual_application")
	c1 := NewSeparatorContainer("")
	c1.SetAttributes(Attributes{"width": "max", "height": "max", "mode": "vertical", "auto": "yes"})
	app.AddChild(c1)

	fmt.Printf("APP = %#v\n", app)

	return
	/*
		data := readfile("testunit/app.code", t)

		w := NewAppFromXMLString(data)

		fmt.Printf("%#v\n", w)

		s, err := json.Marshal(w)

		fmt.Println("JSON = ", string(s), err)
	*/
}
