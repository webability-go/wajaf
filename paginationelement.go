package wajaf

type PaginationElement NodeDef

func NewPaginationElement(id string) PaginationElement {

	e := NewNode("element", "paginationElement")
	e.SetID(id)

	e.RegisterKnownAttributes([]string{"display", "style", "classname", "left", "width", "right", "top", "height", "bottom"})

	return e
}
