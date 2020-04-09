package wajaf

import (
	"bytes"
	"encoding/json"
	"encoding/xml"
	"errors"
	"fmt"
	"strings"
)

type NodeDef interface {
	fmt.Stringer
	fmt.GoStringer

	RegisterKnownAttributes([]string) error
	RegisterKnownChildren([]string) error

	SetID(id string)
	SetData(data string)
	GetID() string
	GetType() string
	GetSuperType() string
	GetData() string
	SetAttribute(string, string) error
	SetAttributes(Attributes) error
	GetAttribute(string) (string, error)
	GetAttributes() Attributes
	AddHelp(string, string, string)
	AddMessage(string, string)
	AddEvent(string, string)
	AddChild(NodeDef) error
	GetChildren() []NodeDef

	//	DecodeAttributes(xml.StartElement)
	UnmarshalXML(*xml.Decoder, xml.StartElement) error
	MarshalXML(*xml.Encoder, xml.StartElement) error
	UnmarshalJSON([]byte) error
	MarshalJSON() ([]byte, error)
}

type Attributes map[string]string

type Node struct {
	knownAttributes map[string]bool
	knownChildren   map[string]bool

	ID         string
	SuperType  string
	Type       string
	Data       string
	attributes Attributes
	children   []NodeDef
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

func (n *Node) GetID() string {
	return n.ID
}

func (n *Node) GetSuperType() string {
	return n.SuperType
}

func (n *Node) GetType() string {
	return n.Type
}

func (n *Node) GetData() string {
	return n.Data
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

func (n *Node) AddHelp(tooltip string, title string, description string) {
	h := NewHelp(tooltip, title, description)
	n.children = append(n.children, h)
}

func (n *Node) AddMessage(name string, value string) {
	m := NewMessage(name, value)
	n.children = append(n.children, m)
}

func (n *Node) AddEvent(name string, code string) {
	e := NewEvent(name, code)
	n.children = append(n.children, e)
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
	sdata := []string{n.SuperType + ":" + n.Type + ":" + n.ID + ":(" + fmt.Sprint(len(n.Data)) + ")"}
	for key, val := range n.attributes {
		sdata = append(sdata, key+":"+val)
	}
	for _, val := range n.children {
		sdata = append(sdata, fmt.Sprintf("%#v", val))
	}
	return "#{" + strings.Join(sdata, " ") + "}"
}

func (n *Node) DecodeAttributes(s xml.StartElement) {
	for _, v := range s.Attr {
		if v.Name.Local == "id" {
			n.ID = v.Value
			continue
		}
		if v.Name.Local == "type" {
			n.Type = v.Value
			continue
		}
		n.attributes[v.Name.Local] = v.Value
	}
}

func (n *Node) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {

	n.DecodeAttributes(start)

	for {
		t, _ := d.Token()
		switch tt := t.(type) {
		case xml.StartElement:
			etype := tt.Name.Local
			z := NewNode(etype, "")
			z.UnmarshalXML(d, tt)
			n.children = append(n.children, z)

		case xml.EndElement:
			if tt.Name == start.Name {
				return nil
			}
		case xml.CharData:
			s := strings.TrimSpace(string(tt))
			if s != "" {
				n.Data += string(tt)
			}
		}
	}
	return nil
}

func (n *Node) MarshalXML(e *xml.Encoder, start xml.StartElement) error {

	start.Name = xml.Name{"", n.SuperType}
	attr := []xml.Attr{}
	if n.Type != "" {
		attr = append(attr, xml.Attr{xml.Name{"", "type"}, n.Type})
	}
	if n.ID != "" {
		attr = append(attr, xml.Attr{xml.Name{"", "id"}, n.ID})
	}
	for akey, avalue := range n.attributes {
		attr = append(attr, xml.Attr{xml.Name{"", akey}, avalue})
	}
	start.Attr = attr
	e.EncodeToken(start)

	if n.Data != "" {
		e.EncodeToken(xml.CharData(n.Data))
	}

	for _, child := range n.children {
		if err := e.Encode(child); err != nil {
			return err
		}
	}
	e.EncodeToken(start.End())
	return nil
}

func (n *Node) UnmarshalJSON([]byte) error {
	return nil
}

func (n *Node) MarshalJSON() ([]byte, error) {

	buffer := bytes.NewBufferString("{\"tag\":\"" + n.SuperType + "\"")

	// Attributes:
	length := len(n.attributes)
	candidate := length != 0 || n.ID != "" || n.Type != ""
	if candidate {
		buffer.WriteString(",\"attributes\":{")
		if n.ID != "" {
			buffer.WriteString("\"id\":\"" + n.ID + "\"")
		}
		if n.Type != "" {
			if n.ID != "" {
				buffer.WriteString(",")
			}
			buffer.WriteString("\"type\":\"" + n.Type + "\"")
		}
		count := 0
		for akey, avalue := range n.attributes {
			if count > 0 || n.ID != "" || n.Type != "" {
				buffer.WriteString(",")
			}
			jsonValue, err := json.Marshal(avalue)
			if err != nil {
				return nil, err
			}
			buffer.WriteString(fmt.Sprintf("\"%s\":%s", akey, string(jsonValue)))
			count++
		}
		buffer.WriteString("}")
	}

	// children
	clength := len(n.children)
	if clength > 0 {
		buffer.WriteString(",\"children\":[")
		count := 0
		for _, cvalue := range n.children {
			if count > 0 {
				buffer.WriteString(",")
			}
			jsonValue, err := json.Marshal(cvalue)
			if err != nil {
				return nil, err
			}
			buffer.WriteString(fmt.Sprintf("%s", string(jsonValue)))
			count++
		}
		buffer.WriteString("]")
	}

	// data
	if n.Data != "" {
		jsonValue, err := json.Marshal(n.Data)
		if err != nil {
			return nil, err
		}
		buffer.WriteString(",\"data\":" + string(jsonValue))
	}

	buffer.WriteString("}")
	return buffer.Bytes(), nil
}
