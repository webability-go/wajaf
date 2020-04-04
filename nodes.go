package wajaf

import (
	"encoding/xml"
	"fmt"
	"strings"
)

type NodeDef interface{}

type Node struct {
	ID   string `xml:"id,attr"`
	Type string `xml:"type,attr"`
}

type App struct {
	Node
	Containers []*Container `xml:"container"`
	Elements   []*Element   `xml:"element"`
	Events     []*Event     `xml:"event"`
}

func (a *App) BuildAttributes(s xml.StartElement) {
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

func (a *App) GetJSON() string {

	return "{\"status\":\"OK\"}"
}

type Container struct {
	Node
	Zones  []*Zone  `xml:"zone"`
	Events []*Event `xml:"event"`
}

func (c *Container) BuildAttributes(s xml.StartElement) {
	for _, v := range s.Attr {
		if v.Name.Local == "id" {
			c.ID = v.Value
		}
		if v.Name.Local == "type" {
			c.Type = v.Value
		}
	}
}

func (c *Container) String() string {
	sdata := []string{"id:" + c.ID + " " + "Type:" + c.Type}
	for _, val := range c.Zones {
		sdata = append(sdata, "#"+fmt.Sprintf("%v", val))
	}
	for _, val := range c.Events {
		sdata = append(sdata, "@"+fmt.Sprintf("%v", val))
	}
	return "CNT{" + strings.Join(sdata, "\n") + "}"
}

// GoString will transform the XDataset into a readable string for humans
func (c *Container) GoString() string {
	return c.String()
}

type Zone struct {
	Node
	Containers []*Container `xml:"container"`
	Elements   []*Element   `xml:"element"`
	Events     []*Event     `xml:"event"`
}

func (z *Zone) BuildAttributes(s xml.StartElement) {
	for _, v := range s.Attr {
		if v.Name.Local == "id" {
			z.ID = v.Value
		}
		if v.Name.Local == "type" {
			z.Type = v.Value
		}
	}
}

func (z *Zone) String() string {
	sdata := []string{"id:" + z.ID}
	for _, val := range z.Containers {
		sdata = append(sdata, "+"+fmt.Sprintf("%v", val))
	}
	for _, val := range z.Elements {
		sdata = append(sdata, "."+fmt.Sprintf("%v", val))
	}
	for _, val := range z.Events {
		sdata = append(sdata, "@"+fmt.Sprintf("%v", val))
	}
	return "ZON{" + strings.Join(sdata, "\n") + "}"
}

// GoString will transform the XDataset into a readable string for humans
func (z *Zone) GoString() string {
	return z.String()
}

type Element struct {
	Node
	Events []*Event `xml:"event"`
}

func (e *Element) BuildAttributes(s xml.StartElement) {
	for _, v := range s.Attr {
		if v.Name.Local == "id" {
			e.ID = v.Value
		}
		if v.Name.Local == "type" {
			e.Type = v.Value
		}
	}
}

type Event struct {
	Node
}

func (e *Event) BuildAttributes(s xml.StartElement) {
	for _, v := range s.Attr {
		if v.Name.Local == "type" {
			e.Type = v.Value
		}
	}
}

func (a *App) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {

	a.BuildAttributes(start)

	for {
		t, _ := d.Token()
		switch tt := t.(type) {
		case xml.StartElement:
			etype := tt.Name.Local
			switch etype {
			case "container":
				c := &Container{}
				c.UnmarshalXML(d, tt)
				a.Containers = append(a.Containers, c)
			case "element":
				e := &Element{}
				e.UnmarshalXML(d, tt)
				a.Elements = append(a.Elements, e)
			case "event":
				e := &Event{}
				e.UnmarshalXML(d, tt)
				a.Events = append(a.Events, e)
			default:
			}

		case xml.EndElement:
			if tt.Name == start.Name {
				return nil
			}
		case xml.CharData:
			//			fmt.Println("APP*", string(tt))
		}
	}
}

func (c *Container) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {

	c.BuildAttributes(start)

	for {
		t, _ := d.Token()
		switch tt := t.(type) {
		case xml.StartElement:
			etype := tt.Name.Local
			switch etype {
			case "zone":
				z := &Zone{}
				z.UnmarshalXML(d, tt)
				c.Zones = append(c.Zones, z)
			case "event":
				e := &Event{}
				e.UnmarshalXML(d, tt)
				c.Events = append(c.Events, e)
			default:
			}

		case xml.EndElement:
			if tt.Name == start.Name {
				return nil
			}
		case xml.CharData:
			//			fmt.Println("CONTAINER*", string(tt))
		}
	}
}

func (e *Element) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {

	e.BuildAttributes(start)

	for {
		t, _ := d.Token()
		switch tt := t.(type) {
		case xml.StartElement:
			etype := tt.Name.Local
			switch etype {
			case "event":
				ne := &Event{}
				ne.UnmarshalXML(d, tt)
				e.Events = append(e.Events, ne)
			default:
				// Error, an element cannot have other elements into
			}

		case xml.EndElement:
			if tt.Name == start.Name {
				return nil
			}
		case xml.CharData:
			//			fmt.Println("ELEMENT*", string(tt))
		}
	}
}

func (z *Zone) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {

	z.BuildAttributes(start)

	for {
		t, _ := d.Token()
		switch tt := t.(type) {
		case xml.StartElement:
			etype := tt.Name.Local
			switch etype {
			case "container":
				c := &Container{}
				c.UnmarshalXML(d, tt)
				z.Containers = append(z.Containers, c)
			case "element":
				e := &Element{}
				e.UnmarshalXML(d, tt)
				z.Elements = append(z.Elements, e)
			case "event":
				e := &Event{}
				e.UnmarshalXML(d, tt)
				z.Events = append(z.Events, e)
			default:
			}

		case xml.EndElement:
			if tt.Name == start.Name {
				return nil
			}
		case xml.CharData:
			//			fmt.Println("ZONE*", string(tt))
		}
	}
}

func (e *Event) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {

	e.BuildAttributes(start)

	for {
		t, _ := d.Token()
		switch tt := t.(type) {
		case xml.EndElement:
			if tt.Name == start.Name {
				return nil
			}
		case xml.CharData:
			//			fmt.Println("EVENT*", string(tt))
		}
	}
}
