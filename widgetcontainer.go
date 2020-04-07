package wajaf

type WidgetContainer NodeDef

func NewWidgetContainer(id string) WidgetContainer {

	c := NewNode("container", "widgetcontainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"id", "type", "id", "display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener",
		"columns", "classnamezone"})
	c.RegisterKnownChildren([]string{"zone", "event", "template", "dataset"})

	return c
}

type WidgetZone NodeDef

func NewWidgetZone(id string) WidgetZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params",
		"title", "size", "column", "closeable", "sizeable", "maskable", "editable", "editor"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

type WidgetTemplate NodeDef

func NewWidgetTemplate(name string) WidgetTemplate {

	t := NewNode("template", "")

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

type WidgetDataset NodeDef

func NewWidgetDataset(data string) WidgetDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
