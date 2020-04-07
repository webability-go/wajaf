package wajaf

type GridContainer NodeDef

func NewGridContainer(id string) GridContainer {

	c := NewNode("container", "gridcontainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"pagination", "maxperpage", "mode", "selectable", "insertable", "deletable", "change", "params"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset"})

	return c
}

type GridZone NodeDef

func NewGridZone(id string) GridZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title", "application", "size", "sizemin", "sizemax", "selectable", "sortable", "sizeable", "maskable", "editable", "type", "editor", "render", "format", "align"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

type GridTemplate NodeDef

func NewGridTemplate(name string) GridTemplate {

	t := NewNode("template", "")

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

type GridDataset NodeDef

func NewGridDataset(data string) GridDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
