package wajaf

type DateSelectorElement NodeDef

func NewDateSelectorElement(id string) DateSelectorElement {

	e := NewNode("element", "dateselectorelement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom",
		"link"})

	return e
}
