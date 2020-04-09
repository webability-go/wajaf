package wajaf

type PaginationElement NodeDef

func NewPaginationElement(id string, data string) PaginationElement {

	e := NewNode("element", "paginationElement")
	e.SetID(id)
	e.SetData(data)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
