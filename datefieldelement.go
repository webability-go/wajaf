package wajaf

type DateFieldElement NodeDef

func NewDateFieldElement(id string) DateFieldElement {

	e := NewNode("element", "datefieldElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
