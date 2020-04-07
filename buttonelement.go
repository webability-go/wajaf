package wajaf

type ButtonElement NodeDef

func NewButtonElement(id string) ButtonElement {

	e := NewNode("element", "buttonelement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"visible", "action", "status", "extra"})
	e.RegisterKnownMessages([]string{"titleinsert", "titleupdate", "titledelete", "titleview"})

	return e
}
