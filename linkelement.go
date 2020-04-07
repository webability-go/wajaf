package wajaf

type LinkElement NodeDef

func NewLinkElement(id string) LinkElement {

	e := NewNode("element", "linkelement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
