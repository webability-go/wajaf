package wajaf

type ColorFieldElement NodeDef

func NewColorFieldElement(id string) ColorFieldElement {

	e := NewNode("element", "colorfieldElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
