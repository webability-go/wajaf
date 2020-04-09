package wajaf

type ImageElement NodeDef

func NewImageElement(id string, src string, data string) ImageElement {

	e := NewNode("element", "imageElement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"src"})
	e.SetAttribute("src", src)

	return e
}
