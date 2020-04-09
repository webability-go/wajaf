package wajaf

type TextElement NodeDef

func NewTextElement(id string, data string) TextElement {

	e := NewNode("element", "textElement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
