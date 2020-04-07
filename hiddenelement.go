package wajaf

type HiddenElement NodeDef

func NewHiddenElement(id string) HiddenElement {

	e := NewNode("element", "hiddenelement")
	e.SetID(id)

	return e
}
