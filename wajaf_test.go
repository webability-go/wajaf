package wajaf

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"testing"
)

func readfile(name string, t *testing.T) []byte {
	data, err := ioutil.ReadFile(name)
	if err != nil {
		t.Errorf("Error loading XML File errors into string %s", err)
		return nil
	}
	return data
}

func TestWajaf(t *testing.T) {

	app := NewApplication("manual_application")
	c1 := NewSeparatorContainer("")
	c1.SetAttributes(Attributes{"width": "max", "height": "max", "mode": "vertical", "auto": "yes"})
	app.AddChild(c1)

	z0 := c1.NewZone("z0")
	z0.AddChild(NewHTMLElement("", "HTML <h1>ELEMENT</h1> CONTENT"))

	z1 := NewSeparatorZone("z1")
	z1.AddHelp("tooltip on z1", "z1 help", "You can use z1 clicking on it")
	z1.AddMessage("messageid", "The message is any string with specific tag name")

	c1.AddChild(z1)

	z2 := NewSeparatorZone("z2")
	c1.AddChild(z2)

	e1 := NewCodeElement("code1")
	app.AddChild(e1)

	app.AddEvent("start", "function() { alert('Wajaf working'); }")

	data, err := json.Marshal(app)
	fmt.Printf("JSON = %s, %v\n", string(data), err)

	return
}

func TestWajafLoad(t *testing.T) {

	app := NewApplication("loaded_application")

	data := readfile("testunit/app.code", t)
	xml.Unmarshal(data, app)

	//	fmt.Printf("XML TO APP: %#v\n", app)

	x, err := xml.Marshal(app)

	fmt.Println("XML = ", string(x), err)

	//	s, err := json.Marshal(app)

	//	fmt.Println("JSON = ", string(s), err)

	return
}
