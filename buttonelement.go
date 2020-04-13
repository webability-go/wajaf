package wajaf

type ButtonElement NodeDef

func NewButtonElement(id string, action string) ButtonElement {

	e := NewNode("element", "buttonElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"visible", "action", "status", "extra"})
	//	e.RegisterKnownMessages([]string{"titleinsert", "titleupdate", "titledelete", "titleview"})

	e.SetAttribute("action", action)

	return e
}
