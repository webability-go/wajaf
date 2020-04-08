package wajaf

type HTMLElement NodeDef

func NewHTMLElement(id string, data string) HTMLElement {

	e := NewNode("element", "htmlelement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
