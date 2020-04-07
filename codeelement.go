package wajaf

type CodeElement NodeDef

func NewCodeElement(id string) CodeElement {

	e := NewNode("element", "codeelement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
