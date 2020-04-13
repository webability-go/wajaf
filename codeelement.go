package wajaf

type CodeElement NodeDef

func NewCodeElement(id string, code string) CodeElement {

	e := NewNode("element", "codeElement")
	e.SetID(id)
	e.SetData(code)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
