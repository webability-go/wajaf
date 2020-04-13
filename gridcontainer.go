package wajaf

type GridContainer struct {
	NodeDef
}

func NewGridContainer(id string) *GridContainer {

	c := &GridContainer{
		NodeDef: NewNode("container", "gridContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"pagination", "maxperpage", "mode", "selectable", "insertable", "deletable", "change", "params"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset"})

	return c
}

func (c *GridContainer) NewZone(ztype string, id string) NodeDef {
	z := NewGridZone(ztype, id)
	c.AddChild(z)
	return z
}

type GridZone NodeDef

func NewGridZone(ztype string, id string) GridZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title", "application", "size", "sizemin", "sizemax", "selectable", "sortable", "sizeable", "maskable", "editable", "type", "editor", "render", "format", "align"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

func (c *GridContainer) NewTemplate(ttype string, name string) NodeDef {
	z := NewGridTemplate(ttype, name)
	c.AddChild(z)
	return z
}

type GridTemplate NodeDef

func NewGridTemplate(ttype string, name string) GridTemplate {

	t := NewNode("template", ttype)

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

func (c *GridContainer) NewDataset(dtype string, data string) NodeDef {
	z := NewGridDataset(dtype, data)
	c.AddChild(z)
	return z
}

type GridDataset NodeDef

func NewGridDataset(dtype string, data string) GridDataset {

	d := NewNode("dataset", dtype)
	d.SetData(data)

	return d
}
