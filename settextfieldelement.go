package wajaf

type SetTextFieldElement NodeDef

func NewSetTextFieldElement(id string) SetTextFieldElement {

	e := NewNode("element", "settextfieldelement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
