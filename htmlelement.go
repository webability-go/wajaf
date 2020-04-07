package wajaf

type HTMLFieldElement NodeDef

func NewHTMLFieldElement(id string, data string) HTMLFieldElement {

	e := NewNode("element", "htlmelement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
