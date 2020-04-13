package wajaf

type HiddenElement NodeDef

func NewHiddenElement(id string, data string) HiddenElement {

	e := NewNode("element", "hiddenElement")
	e.SetID(id)
	e.SetData(data)

	return e
}
