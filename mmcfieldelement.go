package wajaf

type MMCFieldElement NodeDef

func NewMMCFieldElement(id string) MMCFieldElement {

	e := NewNode("element", "mmcfieldelement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
