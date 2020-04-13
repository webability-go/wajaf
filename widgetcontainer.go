package wajaf

type WidgetContainer struct {
	NodeDef
}

func NewWidgetContainer(id string) *WidgetContainer {

	c := &WidgetContainer{
		NodeDef: NewNode("container", "widgetContainer"),
	}
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"id", "type", "id", "display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"columns", "classnamezone"})
	c.RegisterKnownChildren([]string{"zone", "event", "template", "dataset", "event", "help"})

	return c
}

func (c *WidgetContainer) NewZone(ztype string, id string) NodeDef {
	z := NewWidgetZone(ztype, id)
	c.AddChild(z)
	return z
}

type WidgetZone NodeDef

func NewWidgetZone(ztype string, id string) WidgetZone {

	z := NewNode("zone", ztype)
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title", "size", "column", "closeable", "sizeable", "maskable", "editable", "editor"})
	z.RegisterKnownChildren([]string{"container", "element", "event", "help"})

	return z
}

func (c *WidgetContainer) NewTemplate(ttype string, name string) NodeDef {
	z := NewWidgetTemplate(ttype, name)
	c.AddChild(z)
	return z
}

type WidgetTemplate NodeDef

func NewWidgetTemplate(ttype string, name string) WidgetTemplate {

	t := NewNode("template", ttype)

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

func (c *WidgetContainer) NewDataset(dtype string, data string) NodeDef {
	z := NewWidgetDataset(dtype, data)
	c.AddChild(z)
	return z
}

type WidgetDataset NodeDef

func NewWidgetDataset(dtype string, data string) WidgetDataset {

	d := NewNode("dataset", dtype)
	d.SetData(data)

	return d
}
