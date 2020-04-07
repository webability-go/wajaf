package wajaf

import (
	"errors"
	"fmt"
	"strings"
)

type NodeDef interface {
	fmt.Stringer
	fmt.GoStringer

	RegisterKnownAttributes([]string) error
	RegisterKnownMessages([]string) error
	RegisterKnownChildren([]string) error
	SetID(id string)
	SetData(data string)
	GetSuperType() string
	SetAttribute(string, string) error
	SetAttributes(Attributes) error
	GetAttribute(string) (string, error)
	GetAttributes() Attributes
	SetMessage(string, string) error
	SetMessages(Messages) error
	GetMessage(string) (string, error)
	GetMessages() Messages
	SetEvent(string, string)
	SetEvents(Events)
	GetEvent(string) string
	GetEvents() Events
	AddChild(NodeDef) error
	GetChildren() []NodeDef
	SetHelp(string, string, string)
	GetHelp() (string, string, string)

	//	DecodeAttributes(xml.StartElement)
	//	UnmarshalXML(*xml.Decoder, xml.StartElement) error
	//	MarshalXML(*xml.Encoder) error
	//	UnmarshalJSON([]byte) error
	//	MarshalJSON() ([]byte, error)
}

type Attributes map[string]string
type Messages map[string]string
type Events map[string]string

type Node struct {
	knownAttributes map[string]bool
	knownChildren   map[string]bool
	knownMessages   map[string]bool
	ID              string
	SuperType       string
	Type            string
	Data            string
	attributes      Attributes
	messages        Messages
	events          Events
	children        []NodeDef
	helptooltip     string
	helptitle       string
	helpdescription string
}

func NewNode(supertype string, subtype string) NodeDef {
	n := &Node{
		knownAttributes: map[string]bool{},
		knownChildren:   map[string]bool{},
		ID:              "",
		SuperType:       supertype,
		Type:            subtype,
		children:        []NodeDef{},
		attributes:      Attributes{},
	}
	return n
}

func (n *Node) RegisterKnownAttributes(attributes []string) error {
	for _, v := range attributes {
		n.knownAttributes[v] = true
	}
	return nil
}

func (n *Node) RegisterKnownMessages(messages []string) error {
	for _, v := range messages {
		n.knownMessages[v] = true
	}
	return nil
}

func (n *Node) RegisterKnownChildren(children []string) error {
	for _, v := range children {
		n.knownChildren[v] = true
	}
	return nil
}

func (n *Node) SetID(id string) {
	n.ID = id
}

func (n *Node) SetData(data string) {
	n.Data = data
}

func (n *Node) GetSuperType() string {
	return n.SuperType
}

var errUnknownAttribute = errors.New("Node: unknown attribute for this type of node")

func (n *Node) SetAttribute(name string, value string) error {
	if !n.knownAttributes[name] {
		return errUnknownAttribute
	}
	n.attributes[name] = value
	return nil
}

func (n *Node) SetAttributes(attr Attributes) error {
	for name, value := range attr {
		if !n.knownAttributes[name] {
			return errUnknownAttribute
		}
		n.attributes[name] = value
	}
	return nil
}

func (n *Node) GetAttribute(name string) (string, error) {
	if !n.knownAttributes[name] {
		return "", errUnknownAttribute
	}
	return n.attributes[name], nil
}

func (n *Node) GetAttributes() Attributes {
	return n.attributes
}

var errUnknownMessage = errors.New("Node: unknown message for this type of node")

func (n *Node) SetMessage(name string, value string) error {
	if !n.knownMessages[name] {
		return errUnknownMessage
	}
	n.messages[name] = value
	return nil
}

func (n *Node) SetMessages(mesg Messages) error {
	for name, value := range mesg {
		if !n.knownMessages[name] {
			return errUnknownMessage
		}
		n.messages[name] = value
	}
	return nil
}

func (n *Node) GetMessage(name string) (string, error) {
	if !n.knownMessages[name] {
		return "", errUnknownMessage
	}
	return n.messages[name], nil
}

func (n *Node) GetMessages() Messages {
	return n.messages
}

func (n *Node) SetEvent(name string, value string) {
	n.events[name] = value
}

func (n *Node) SetEvents(evts Events) {
	for name, value := range evts {
		n.events[name] = value
	}
}

func (n *Node) GetEvent(name string) string {
	return n.events[name]
}

func (n *Node) GetEvents() Events {
	return n.events
}

var errUnknownChildren = errors.New("Node: unknown children for this type of node")

func (n *Node) AddChild(node NodeDef) error {

	st := node.GetSuperType()
	if !n.knownChildren[st] {
		return errUnknownChildren
	}
	n.children = append(n.children, node)
	return nil
}

func (n *Node) GetChildren() []NodeDef {
	return n.children
}

func (n *Node) String() string {
	sdata := []string{n.SuperType + ":" + n.Type}
	for key, val := range n.attributes {
		sdata = append(sdata, key+":"+val)
	}
	for _, val := range n.children {
		sdata = append(sdata, fmt.Sprintf("%v", val))
	}
	return "{" + strings.Join(sdata, " ") + "}"
}

func (n *Node) GoString() string {
	sdata := []string{n.SuperType + ":" + n.Type}
	for key, val := range n.attributes {
		sdata = append(sdata, key+":"+val)
	}
	for _, val := range n.children {
		sdata = append(sdata, fmt.Sprintf("%#v", val))
	}
	return "#{" + strings.Join(sdata, " ") + "}"
}

func (n *Node) SetHelp(tooltip string, title string, description string) {
	n.helptooltip = tooltip
	n.helptitle = title
	n.helpdescription = description
}

func (n *Node) GetHelp() (string, string, string) {
	return n.helptooltip, n.helptitle, n.helpdescription
}

/*
type Container struct {
	Node
	Zones  []*Zone  `xml:"zone"`
	Events []*Event `xml:"event"`
}

func (c *Container) DecodeAttributes(s xml.StartElement) {
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

func (z *Zone) DecodeAttributes(s xml.StartElement) {
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

func (e *Element) DecodeAttributes(s xml.StartElement) {
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

func (e *Event) DecodeAttributes(s xml.StartElement) {
	for _, v := range s.Attr {
		if v.Name.Local == "type" {
			e.Type = v.Value
		}
	}
}

func (a *App) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {

	a.DecodeAttributes(start)

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

	c.DecodeAttributes(start)

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

	e.DecodeAttributes(start)

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

	z.DecodeAttributes(start)

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

	e.DecodeAttributes(start)

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
*/
