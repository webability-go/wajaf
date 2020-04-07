package wajaf

type DBListContainer NodeDef

func NewDBListContainer(id string) DBListContainer {

	c := NewNode("container", "dblistcontainer")
	c.SetID(id)

	c.RegisterKnownAttributes([]string{"display", "style", "classname", "classnamezone", "left", "width", "right", "top", "height", "bottom", "haslistener"})
	c.RegisterKnownChildren([]string{"zone", "template", "dataset"})

	return c
}

type DBListZone NodeDef

func NewDBListZone(id string) DBListZone {

	z := NewNode("zone", "")
	z.SetID(id)

	z.RegisterKnownAttributes([]string{"style", "classname", "application", "params"})
	z.RegisterKnownChildren([]string{"container", "element"})

	return z
}

type DBListTemplate NodeDef

func NewDBListTemplate(name string) DBListTemplate {

	t := NewNode("template", "")

	t.RegisterKnownAttributes([]string{"name"})
	t.RegisterKnownChildren([]string{"container", "element"})

	t.SetAttribute("name", name)

	return t
}

type DBListDataset NodeDef

func NewDBListDataset(data string) DBListDataset {

	d := NewNode("dataset", "")
	d.SetData(data)

	return d
}
