package wajaf

type HiddenElement NodeDef

func NewHiddenElement(id string) HiddenElement {

	e := NewNode("element", "hiddenElement")
	e.SetID(id)

	return e
}
