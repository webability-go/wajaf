package wajaf

type HiddenFieldElement NodeDef

func NewHiddenFieldElement(id string, data string) HiddenFieldElement {

	e := NewNode("element", "hiddenfieldElement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
